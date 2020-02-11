import React from 'react';
import UserTable from './UserTable';
import styled from 'styled-components';
import { fetchUserManagementData } from '../queries';
import { Button } from 'reactstrap';
import FilterSidebar from './FilterSidebar';
import FilterInfo from './FilterInfo';
import InfiniteScroll from 'components/Shared/InfiniteScroll';
import MailingListCollapsed from './MailingListCollapsed';
import MailingListExpanded from './MailingListExpanded';
import { LeftCaretIcon } from 'components/Shared/Icon';
import update from 'immutability-helper';

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
    width: ${props => (props.collapsed ? '25rem' : '100%')};
    ${props => !props.collapsed && 'margin-left: 2rem;'}
  `,
  ToggleButton: styled(Button)`
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
    ${props => !props.collapsed && 'transform: rotate(180deg);'}

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
  `
};

class UserManager extends React.Component {
  state = {
    exploreUsers: [],
    exploreCount: 0,
    exploreFilters: [],
    exploreSearchValue: null,
    exploreSearchTerm: null,
    isLoading: false,
    collapsed: true,
    stagingFilters: [],
    stagingUsers: []
  };

  componentDidMount() {
    this.loadMoreUsers();
  }

  loadMoreUsers = () => {
    // TODO make function use current filters
    const { exploreUsers } = this.state;
    const lastPaginationId = exploreUsers.length ? exploreUsers[exploreUsers.length - 1]._id : 0;
    this.setState({
      isLoading: true
    });
    fetchUserManagementData(lastPaginationId).then(result => {
      if (result && result.data && result.data.users) {
        this.setState(({ exploreUsers }) => ({
          exploreUsers: exploreUsers.concat(result.data.users),
          isLoading: false
        }));
      }
    });
  };

  onEditUser = () => {
    // TODO implement?
    // ? what is this function for?
  };

  onToggleCollapse = () => {
    // TODO implement collapse view
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed
    }));
  };

  onToggleUserMailingList = idx => () => {
    // TODO implement
    const { exploreUsers } = this.state;
    const user = exploreUsers[idx];
    console.log(user);
  };

  clearMailingList = () => {
    this.setState({
      stagingFilters: [],
      stagingUsers: []
    });
  };

  onSearchSubmit = (searchValue, searchTerm) => {
    // TODO dispatch API call to update table and count
    const isEmpty = searchValue === '';
    this.setState({
      exploreSearchValue: isEmpty ? null : searchValue,
      exploreSearchTerm: isEmpty ? null : searchTerm
    });
  };

  // Converts filter shape from:
  //   { group1: { valueA: false, valueB: true }, group2: { valueA: false } }
  // to: (valueA gets removed,, and group2 isn't included)
  //   [ { key: "group1", values: { valueB: true } } ]
  // This makes it easier to determine if any filters have been applied and
  // to convert the current filter set to a JSON-serializable API query param
  onApplyFilters = filters => {
    // TODO dispatch API call to update table and count
    this.setState({
      exploreFilters: Object.entries(filters).reduce((filterEntries, [groupKey, { values }]) => {
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
      }, [])
    });
  };

  onAddAllClick = () => {
    // TODO implement
  };

  onClearFilter = key => {
    // TODO implement
  };

  hasFilters() {
    const { exploreFilters, exploreSearchTerm } = this.state;
    return exploreFilters.length > 0 || exploreSearchTerm != null;
  }

  render() {
    const {
      isLoading,
      exploreUsers,
      exploreCount,
      stagingUsers,
      stagingFilters,
      collapsed
    } = this.state;

    // Add the inMailingList prop to the currently displayed table users
    const stagingUserIds = new Set(stagingUsers.map(user => user._id));
    const mappedExploreUsers = exploreUsers.map(user => ({
      ...user,
      inMailingList: stagingUserIds.has(user._id)
    }));

    return (
      <Styled.Container>
        <FilterSidebar onSearchSubmit={this.onSearchSubmit} onApplyFilters={this.onApplyFilters} />
        {collapsed && (
          <Styled.ListContainer>
            <InfiniteScroll loadCallback={this.loadMoreUsers} isLoading={isLoading}>
              <FilterInfo
                filtersApplied={this.hasFilters()}
                onClickAddAll={this.onAddAllClick}
                matchedCount={exploreCount}
              />
              <UserTable
                users={mappedExploreUsers}
                editUserCallback={this.onEditUser}
                onUserToggle={this.onToggleUserMailingList}
              />
            </InfiniteScroll>
          </Styled.ListContainer>
        )}
        <Styled.MailingListContainer collapsed={collapsed}>
          <Styled.ToggleButton collapsed={collapsed} onClick={this.onToggleCollapse}>
            <LeftCaretIcon />
          </Styled.ToggleButton>
          {collapsed ? (
            <MailingListCollapsed
              users={stagingUsers}
              filters={stagingFilters}
              onClearClick={this.clearMailingList}
              onClearFilter={this.onClearFilter}
            />
          ) : (
            <MailingListExpanded />
          )}
        </Styled.MailingListContainer>
      </Styled.Container>
    );
  }
}

export default UserManager;
