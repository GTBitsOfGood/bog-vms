import React from 'react';
import styled from 'styled-components';
import Filters from './Filters';
import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Icon, ClearButton } from '../Shared';
import { UserFilterContext } from './users/context';

const Styled = {
  FilterContainer: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  `,
  BackButton: styled(ClearButton)`
    padding: 0;
    transition: margin-right 0.2s, width 0.2s, opacity 0.2s;
    width: ${props => (props.show ? '3.2rem' : '0')};
    margin-right: ${props => (props.show ? '0.2rem' : '0')};
    opacity: ${props => (props.show ? '1' : '0')};
    pointer-events: ${props => (props.show ? 'all' : 'none')};

    // Adjust inner padding
    & > span {
      overflow: hidden;
      display: inline;
      padding: 0;
      border-radius: 20rem;
    }

    svg {
      border-radius: 20rem;
      background-color: transparent;
      transition: background-color 0.15s ease;
    }
  `,
  SearchContainer: styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
  `,
  DropdownToggle: styled(DropdownToggle)`
    background: white;
    border: 1px solid ${props => props.theme.grey8};
    border-left: none;
    border-radius: 0 0.5rem 0.5rem 0;

    // Fix button size/placement
    &::after {
      transform: scale(1.2);
      vertical-align: 0.1em;
      margin-left: 0;
      margin-right: 0.1rem;
      color: ${props => props.theme.grey3};
    }
  `,
  SearchBox: styled(Input)`
    border: 1px solid ${props => props.theme.grey8};
    border-radius: 0.5rem 0 0 0.5rem;
    padding: 0.475rem 0.75rem 0.275rem;
    min-width: 0;
  `
};

const SEARCH_DEBOUNCE_TIMEOUT = 500;
const FILTERS_DEBOUNCE_TIMEOUT = 500;

function debounce(func, delay) {
  let timer = null;
  const debounced = (...args) => {
    if (timer != null) window.clearTimeout(timer);
    timer = window.setTimeout(() => func(...args), delay);
  };
  debounced.reset = () => {
    if (timer != null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
}

class ApplicantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      placeholder: 'All',
      textInput: '',
      filters: {}
    };
  }

  onSearchChange = event => {
    this.setState({ textInput: event.target.value });
    if (event.target.value === '') {
      this.onClearSearch();
    } else {
      this.updateSearchValue(event.target.value);
    }
  };

  onFiltersChange = filters => {
    this.setState({ filters });
    this.updateFilters(filters);
  };

  selectSearchOption = event => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      placeholder: event.target.innerText
    });
    const { textInput, filters } = this.state;
    const { onSubmit } = this.props;
    onSubmit(filters, textInput, event.target.innerText);
  };

  updateSearchValue = debounce(value => {
    const { filters, placeholder } = this.state;
    const { onSubmit } = this.props;
    onSubmit(filters, value, placeholder);
  }, SEARCH_DEBOUNCE_TIMEOUT);

  updateFilters = debounce(filters => {
    const { textInput, placeholder } = this.state;
    const { onSubmit } = this.props;
    onSubmit(filters, textInput, placeholder);
  }, FILTERS_DEBOUNCE_TIMEOUT);

  onClearSearch = () => {
    const { placeholder, filters } = this.state;
    const { onSubmit } = this.props;
    onSubmit(filters, '', placeholder);
    // Reset debounce state
    this.updateSearchValue.reset();
  };

  onClearFilters = () => {
    const { placeholder } = this.state;
    const { onSubmit } = this.props;
    this.setState({ textInput: '' });
    onSubmit(null, '', placeholder);
    // Reset debounce state
    this.updateSearchValue.reset();
    this.updateFilters.reset();
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <UserFilterContext.Consumer>
        {({ searchTerms }) => (
          <Styled.FilterContainer>
            <Styled.SearchContainer>
              <Styled.BackButton
                type="reset"
                show={this.state.textInput}
                onClick={this.onClearSearch}
              >
                <Icon name="back-arrow" />
              </Styled.BackButton>
              <Styled.SearchBox
                type="text"
                placeholder={'Search By ' + this.state.placeholder}
                onChange={this.onSearchChange}
              />

              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <Styled.DropdownToggle caret />
                <DropdownMenu>
                  <DropdownItem header>Search by...</DropdownItem>
                  {searchTerms.map((term, i) => (
                    <DropdownItem key={i} onClick={this.selectSearchOption}>
                      {term}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>
            </Styled.SearchContainer>
            <Filters onChange={this.onFiltersChange} onClear={this.onClearFilters} />
          </Styled.FilterContainer>
        )}
      </UserFilterContext.Consumer>
    );
  }
}

export default ApplicantSearch;
