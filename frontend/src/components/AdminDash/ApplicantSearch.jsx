import React from 'react';
import styled from 'styled-components';
import Filters from './Filters';
import { Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from '../Shared/Icon';

const Styled = {
  FilterContainer: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  `,
  BackButton: styled.button`
    width: ${props => (props.show ? '3.2rem' : '0')};
    border: none;
    background: none;
    transition: width 0.2s;
    overflow: hidden;
    padding: 0;
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
  `,
  SearchBox: styled(Input)`
    border: 1px solid ${props => props.theme.grey8};
    border-radius: 0.5rem 0 0 0.5rem;
  `
};

class ApplicantSearch extends React.Component {
  // Use ref to control filters component to imperatively clear form upon "Clear Filters" press
  filtersRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      placeholder: 'All',
      textInput: '',
      appliedFilters: null
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

  onApplyFilters = filters => {
    this.setState({
      appliedFilters: filters
    });
    this.props.applyFiltersCallback(filters);
  };

  onClearFilters = () => {
    this.onApplyFilters(null);
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
        <Filters onChange={this.onApplyFilters} onClear={this.onClearFilters} />
      </Styled.FilterContainer>
    );
  }
}
export default ApplicantSearch;
