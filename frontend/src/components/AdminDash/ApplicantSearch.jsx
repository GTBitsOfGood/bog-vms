import React from 'react';
import styled from 'styled-components';
import Filters from './Filters';
import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Icon, ClearButton } from '../Shared';

const Styled = {
  FilterContainer: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  `,
  BackButton: styled(ClearButton)`
    padding: 0;
    transition: margin-right 0.2s, width 0.2s, opacity 0.2s;;
    width: ${props => (props.show ? '3.2rem' : '0')};
    margin-right: ${props => (props.show ? '0.2rem' : '0')};
    opacity: ${props => (props.show ? '1' : '0')};
    pointer-events: ${props => (props.show ? 'all' : 'none')};

    // Adjust inner padding
    & > span {
      overflow: hidden;
      display: inline;
      padding: 0.5rem 0rem;
      border-radius: 20rem;
    }

    svg {
      border-radius: 20rem;
      background-color: transparent;
      transition: background-color 0.15s ease;
    }
  `,
  SearchContainer: styled.form`
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

class ApplicantSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      placeholder: 'All',
      textInput: ''
    };
  }

  onSearchChange = event => {
    this.setState({ textInput: event.target.value });
    if (event.target.value === '') {
      this.onClearSearch();
    }
  };

  onSubmitSearch = event => {
    event.preventDefault();
    this.props.searchSubmitCallback(this.state.textInput, this.state.placeholder);
  };

  onClearSearch = () => {
    this.setState({ textInput: '' });
    this.props.searchSubmitCallback('', this.state.placeholder);
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  selectSearchOption = event => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      placeholder: event.target.innerText
    });
  };

  onClearFilters = () => {
    this.props.applyFiltersCallback(null);
  };

  render() {
    return (
      <Styled.FilterContainer onSubmit={this.onSubmitSearch}>
        <Styled.SearchContainer>
          <Styled.BackButton type="reset" show={this.state.textInput} onClick={this.onClearSearch}>
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
              <DropdownItem onClick={this.selectSearchOption}>All</DropdownItem>
              <DropdownItem onClick={this.selectSearchOption}>Bio</DropdownItem>
              <DropdownItem onClick={this.selectSearchOption}>Email</DropdownItem>
              <DropdownItem onClick={this.selectSearchOption}>Phone Number</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Styled.SearchContainer>
        <Filters onChange={this.props.applyFiltersCallback} onClear={this.onClearFilters} />
      </Styled.FilterContainer>
    );
  }
}
export default ApplicantSearch;
