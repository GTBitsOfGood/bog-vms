import React from 'react';
import UserTable from './UserTable';
import styled from 'styled-components';
import { fetchUserData } from '../queries';
import { Button } from 'reactstrap';
import { Set, OrderedMap } from 'immutable';
import deepEquals from 'fast-deep-equal';
import FilterSidebar from './FilterSidebar';
import FilterInfo from './FilterInfo';
import InfiniteScroll from 'components/Shared/InfiniteScroll';
import MailingListCollapsed from './MailingListCollapsed';
import MailingListExpanded from './MailingListExpanded';
import { LeftCaretIcon } from 'components/Shared/Icon';
import { initialValues, labels, searchTerms } from './userFilters';
import { UserFilterContext } from './context';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  ListContainer: styled.div`
    height: 100%;
    width: 100%;
  `,
  MailingListContainer: styled.div`
    position: relative;
    height: 100%;
    width: ${props => (props.isCollapsed ? '25rem' : '100%')};
    ${props => !props.isCollapsed && 'margin-left: 2rem;'}
  `,
  // Remove isCollapsed to prevent it from being passed to the DOM
  ToggleButton: styled(({ isCollapsed, ...rest }) => <Button {...rest} />)`
    position: absolute;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    top: 50%;
    left: -20px;
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    border-radius: 50%;
    color: #969696;
    ${props => !props.isCollapsed && 'transform: rotate(180deg);'}

    :focus {
      box-shadow: none;
    }

    ${props => props.disabled && 'background: white !important'}
  `,
  ToBeginningButton: styled(Button)`
    background: white;
    border: none;
    margin-left: auto;
    margin-right: 1rem;
  `,
  Term: styled.span`
    opacity: 0.7;
  `
};

const MANUAL_FILTER_KEY = '__manual';
const SEARCH_KEY_PREFIX = '__search@';
const FILTER_KEY_PREFIX = '__filter@';
const GLOBAL_FILTER_KEY = '__filter=global';

const makeSearchKey = (term, value) => `${SEARCH_KEY_PREFIX}${term}>>>${value}`;
const makeSearchLabel = (term, label) => (
  <React.Fragment>
    <Styled.Term>{term}:</Styled.Term> &ldquo;{label}&rdquo;
  </React.Fragment>
);

const makeFilterKey = (groupKey, entryKey, value) =>
  `${FILTER_KEY_PREFIX}${groupKey}>>>${entryKey}=${value}`;
const globalFilterLabel = 'All Volunteers';

// Use Immutable's withMutations method to batch mutations
const removeReason = (stagingUsers, reason, ids) =>
  stagingUsers.withMutations(map =>
    ids.forEach(id => {
      const entry = map.get(id);
      const oldReasons = entry.reasons;
      const newReasons = oldReasons.filter(r => r !== reason);
      if (newReasons.length === 0) {
        // Evict
        map.remove(id);
      } else {
        // Remove reason
        map.set(id, { ...entry, reasons: newReasons });
      }
    })
  );

// Converts filter shape from:
//   { group1: { valueA: false, valueB: true }, group2: { valueA: false } }
// to: (valueA gets removed,, and group2 isn't included)
//   [ { key: "group1", values: { valueB: true } } ]
// This makes it easier to determine if any filters have been applied and
// to convert the current filter set to a JSON-serializable API query param
const convertFilterShape = filters =>
  Object.entries(filters).reduce((filterEntries, [groupKey, { values }]) => {
    let reducedFilterOptions = null;
    Object.entries(values).forEach(([optionKey, optionValue]) => {
      if (optionValue) {
        // Truthy filter value: add to reduced options
        if (reducedFilterOptions == null) reducedFilterOptions = {};
        reducedFilterOptions[optionKey] = optionValue;
      }
    });

    if (reducedFilterOptions == null) {
      // Skip empty filter groups
      return filterEntries;
    } else {
      return [...filterEntries, { key: groupKey, values: reducedFilterOptions }];
    }
  }, []);

class UserManager extends React.Component {
  state = {
    exploreUsers: [],
    exploreCount: 0,
    exploreFilters: [],
    exploreSearchValue: null,
    exploreSearchTerm: null,
    isLoading: false,
    isLoadingAddAll: false,
    collapsed: true,
    stagingFilters: [],
    // User id => staging user object map { user: object, reasons: Array<string> }
    //  - Reasons is string array of filter keys associated with why user is there
    //  - The set of keys = all user ids in staging mailing list
    //  - Uses immutable maps/sets from immutable.js
    stagingUsers: OrderedMap(),
    stagingManualUserIds: Set(),
    // Can be eventually refactored to be dynamic
    filterContext: {
      initialValues,
      searchTerms,
      labels
    }
  };

  isUserStaged(id) {
    const { stagingUsers } = this.state;
    return stagingUsers.has(id);
  }

  componentDidMount() {
    const { exploreFilters, exploreSearchTerm, exploreSearchValue } = this.state;
    this.fetchUsers(exploreFilters, exploreSearchTerm, exploreSearchValue);
  }

  onToggleCollapse = () => {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed
    }));
  };

  onToggleUserMailingList = idx => () => {
    const { exploreUsers } = this.state;
    const user = exploreUsers[idx];
    if (this.isUserStaged(user._id)) {
      // Force unstage
      this.unstage(user._id);
    } else {
      // Stage as manual
      this.setState(({ stagingManualUserIds, stagingUsers }) => ({
        stagingManualUserIds: stagingManualUserIds.add(user._id),
        stagingUsers: stagingUsers.set(user._id, {
          user,
          reasons: [MANUAL_FILTER_KEY]
        })
      }));
    }
  };

  onUserUnstage = id => this.unstage(id);

  unstage(id) {
    this.setState(({ stagingManualUserIds, stagingUsers }) => ({
      stagingUsers: stagingUsers.delete(id),
      // Only remove from manual Ids if staged with it to prevent new collection being created
      // for stagingManualUserIds when it doesn't change
      stagingManualUserIds: stagingManualUserIds.has(id)
        ? stagingManualUserIds.delete(id)
        : stagingManualUserIds
    }));
  }

  clearMailingList = () => {
    this.setState({
      stagingFilters: [],
      stagingUsers: OrderedMap(),
      stagingManualUserIds: Set()
    });
  };

  // Track when a new batch of users is being fetched to take priority over fetchMoreUsers" call
  fetchingNewBatch = false;

  // Fetches new batch of users (both initially and when filters/search change), clearing
  // the current grid and taking priority over a "fetchMoreUsers" call
  fetchUsers(filters, searchTerm, searchValue) {
    this.fetchingNewBatch = true;
    this.setState({ isLoading: true, exploreUsers: [] });
    fetchUserData({ filters, searchTerm, searchValue, limit: 15 })
      .then(response => {
        const { users, count } = response.data;
        this.setState({ isLoading: false, exploreUsers: users, exploreCount: count });
        this.fetchingNewBatch = false;
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoading: false });
      });
  }

  // Fetches the next page of users from the API, using the current filters as the basis. Called
  // using infinite scroll. The fetch action can be effectively cancelled by changing the filters/search
  // during it, which will involve a call to "fetchUsers"
  fetchMoreUsers(filters, searchTerm, searchValue, paginationId = null) {
    if (this.fetchingNewBatch) return;
    this.setState({ isLoading: true });
    fetchUserData({ filters, searchTerm, searchValue, start: paginationId, limit: 10 })
      .then(response => {
        const { users } = response.data;
        if (this.fetchingNewBatch) return;
        this.setState(({ exploreUsers }) => ({
          isLoading: false,
          exploreUsers: exploreUsers.concat(users)
        }));
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoading: false });
      });
  }

  // Fetches ever user that matches the given search/filter, used when the admin clicks "Add
  // all to mailing list.sp"
  fetchAllUsers(filters, searchTerm, searchValue) {
    return fetchUserData({ filters, searchTerm, searchValue, limit: 0 }).then(
      response => response.data.users
    );
  }

  loadMoreUsers = () => {
    const {
      exploreUsers,
      exploreCount,
      exploreFilters,
      exploreSearchTerm,
      exploreSearchValue
    } = this.state;
    // Only fetch more users if there are more to fetch
    if (exploreUsers.length < exploreCount) {
      const lastPaginationId = exploreUsers.length
        ? exploreUsers[exploreUsers.length - 1]._id
        : null;
      this.fetchMoreUsers(exploreFilters, exploreSearchTerm, exploreSearchValue, lastPaginationId);
    }
  };

  onSubmit = (filters, searchValue, searchTerm) => {
    let exploreFilters = null;
    if (filters == null) {
      // Clear filters
      exploreFilters = [];
    } else {
      exploreFilters = convertFilterShape(filters);
    }

    const isEmpty = searchValue === '';
    const exploreSearchValue = isEmpty ? null : searchValue;
    const exploreSearchTerm = isEmpty ? null : searchTerm;

    const {
      exploreFilters: currentFilters,
      exploreSearchValue: currentValue,
      exploreSearchTerm: currentTerm
    } = this.state;

    // Only fetch a new user batch if the filter set is different
    if (
      exploreSearchValue !== currentValue ||
      exploreSearchTerm !== currentTerm ||
      !deepEquals(exploreFilters, currentFilters)
    ) {
      this.setState({
        exploreFilters,
        exploreSearchValue,
        exploreSearchTerm
      });
      this.fetchUsers(exploreFilters, exploreSearchTerm, exploreSearchValue);
    }
  };

  onAddAllClick = () => {
    // Grab current filters into closure
    const { exploreFilters, exploreSearchValue, exploreSearchTerm } = this.state;
    this.setState({ isLoadingAddAll: true });
    this.fetchAllUsers(exploreFilters, exploreSearchTerm, exploreSearchValue)
      .then(newUsers => {
        const {
          stagingUsers,
          filterContext: { labels }
        } = this.state;
        const newUserReasonMap = stagingUsers.asMutable(); // Create as mutable to batch mutations
        this.setState({ isLoadingAddAll: false });

        // Add all users to new user reason map
        newUsers.forEach(user => {
          if (!newUserReasonMap.has(user._id)) {
            newUserReasonMap.set(user._id, { user, reasons: [] });
          }
        });

        // Add filters to stagingFilters
        const newFilters = [];
        // Prepare global list of reasons to batch add at the end
        const globalReasons = [];

        if (exploreSearchValue != null) {
          const searchKey = makeSearchKey(exploreSearchTerm, exploreSearchValue);
          const searchLabel = makeSearchLabel(exploreSearchTerm, exploreSearchValue);
          newFilters.push({ key: searchKey, label: searchLabel });
          // Search values must apply to entire returned set, so add as global reason
          globalReasons.push(searchKey);
        }

        if (exploreFilters.length > 0) {
          exploreFilters.forEach(({ key: groupKey, values }) => {
            const valueEntries = Object.entries(values);
            const hasMultipleValues = valueEntries.length > 1;
            console.log(valueEntries);
            valueEntries.forEach(([entryKey, entryValue]) => {
              const filterKey = makeFilterKey(groupKey, entryKey, entryValue);
              const filterLabel = labels[groupKey][entryKey];
              newFilters.push({ key: filterKey, label: filterLabel });
              if (hasMultipleValues) {
                // TODO resolve non-disjoint filter reasons per user
              } else {
                // Single filter values must apply to entire returned set, so add as global reason
                globalReasons.push(filterKey);
              }
            });
          });
        }
        console.log(globalReasons);

        if (exploreSearchValue == null && exploreFilters.length === 0) {
          // All users were added at once
          newFilters.push({ key: GLOBAL_FILTER_KEY, label: globalFilterLabel });
          globalReasons.push(GLOBAL_FILTER_KEY);
        }

        // Add all reasons in global reasons to each new user
        newUsers.forEach(({ _id }) => {
          newUserReasonMap.update(_id, ({ user, reasons }) => ({
            user,
            reasons: [...reasons, ...globalReasons]
          }));
        });

        this.setState(({ stagingFilters }) => {
          const existingFilterKeys = new Set(stagingFilters.map(({ key }) => key));
          return {
            stagingUsers: newUserReasonMap.asImmutable(),
            stagingFilters: [
              ...stagingFilters,
              ...newFilters.filter(({ key }) => !existingFilterKeys.has(key))
            ]
          };
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoadingAddAll: false });
      });
  };

  onClearFilter = key => {
    if (key === MANUAL_FILTER_KEY) {
      // Remove manual from list of reasons
      this.setState(({ stagingManualUserIds, stagingUsers }) => ({
        stagingManualUserIds: Set(),
        stagingUsers: removeReason(stagingUsers, MANUAL_FILTER_KEY, stagingManualUserIds)
      }));
    } else {
      this.setState(({ stagingUsers, stagingFilters }) => ({
        stagingUsers: removeReason(stagingUsers, key, stagingUsers.keySeq()),
        stagingFilters: stagingFilters.filter(({ key: filterKey }) => filterKey !== key)
      }));
    }
  };

  exportMailingList = () => {
    const { stagingUsers } = this.state;
    let url = stagingUsers.reduce((prev, { user }) => prev + user.email + ',', 'mailto:');
    window.open(url, '_blank');
  };

  hasFilters() {
    const { exploreFilters, exploreSearchTerm, isLoading } = this.state;
    return !isLoading && (exploreFilters.length > 0 || exploreSearchTerm != null);
  }

  getStagingFilters() {
    const { stagingManualUserIds, stagingFilters } = this.state;
    const manualCount = stagingManualUserIds.size;
    const filters = [...stagingFilters];
    if (manualCount > 0) {
      filters.push({
        key: MANUAL_FILTER_KEY,
        label: `+ ${manualCount} other ${manualCount === 1 ? 'volunteer' : 'volunteers'}`
      });
    }
    return filters;
  }

  render() {
    const {
      isLoading,
      exploreUsers,
      exploreCount,
      stagingUsers,
      collapsed,
      isLoadingAddAll,
      filterContext
    } = this.state;

    const resolvedStagingFilters = this.getStagingFilters();
    const MailingList = collapsed ? MailingListCollapsed : MailingListExpanded;
    return (
      <UserFilterContext.Provider value={filterContext}>
        <Styled.Container>
          <FilterSidebar onSubmit={this.onSubmit} />
          {collapsed && (
            <Styled.ListContainer>
              <InfiniteScroll
                loadCallback={this.loadMoreUsers}
                isLoading={isLoading}
                hasMoreItems={exploreUsers.length < exploreCount}
              >
                <FilterInfo
                  filtersApplied={this.hasFilters()}
                  onClickAddAll={this.onAddAllClick}
                  matchedCount={exploreCount}
                  loading={isLoadingAddAll}
                />
                <StagableUserTable
                  users={exploreUsers}
                  stagingUsersMap={stagingUsers}
                  onUserToggle={this.onToggleUserMailingList}
                />
              </InfiniteScroll>
            </Styled.ListContainer>
          )}
          <Styled.MailingListContainer isCollapsed={collapsed}>
            <Styled.ToggleButton isCollapsed={collapsed} onClick={this.onToggleCollapse}>
              <LeftCaretIcon />
            </Styled.ToggleButton>
            <MailingList
              listSize={stagingUsers.size}
              filters={resolvedStagingFilters}
              onClearClick={this.clearMailingList}
              onExportClick={this.exportMailingList}
              onClearFilter={this.onClearFilter}
              onUserRemove={this.onUserUnstage}
              isEmpty={stagingUsers.size === 0 && resolvedStagingFilters.length === 0}
              usersMap={stagingUsers}
            />
          </Styled.MailingListContainer>
        </Styled.Container>
      </UserFilterContext.Provider>
    );
  }
}

export default UserManager;

// Memoize user list to prevent re-renders on actions such as add all to list API dispatch
const StagableUserTable = React.memo(({ onUserToggle, users, stagingUsersMap }) => (
  <UserTable
    users={users.map(user => ({
      ...user,
      inMailingList: stagingUsersMap.has(user._id)
    }))}
    onUserToggle={onUserToggle}
  />
));
