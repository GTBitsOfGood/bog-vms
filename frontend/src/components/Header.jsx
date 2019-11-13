import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from './Shared';
// import { GoogleLogout } from 'react-google-login';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';

import logo from '../images/bog_logo.png';
import avatar from '../images/test.jpg';

const pageSwitchWidth = currPath => {
  switch (currPath) {
    case '/applicant-viewer':
      return '9.6rem';
    case '/user-manager':
      return '8.6rem';
    case '/events':
      return '4.8rem';
    case '/onboarding-manager':
      return '4.8rem';
    default:
      return '0';
  }
};

const pageSwitchLeft = currPath => {
  switch (currPath) {
    case '/applicant-viewer':
      return '-1rem';
    case '/user-manager':
      return '8.3rem';
    case '/events':
      return '16.9rem';
    case '/onboard-manager':
      return '16.9 rem';
    default:
      return '0';
  }
};

const Styled = {
  Navbar: styled(Navbar)`
    background-color: #ffffff;
    min-height: 6rem;
  `,
  NavItem: styled(NavItem)`
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    text-align: center;
    min-width: 7rem;
  `,
  Dropdown: styled(UncontrolledDropdown)`
    text-align: center;
    min-width: 7rem;
    width: fit-content;
  `,
  Toggle: styled(DropdownToggle)`
    text-align: left;
  `,
  NavLabel: styled.p`
    color: #969696;
    margin: auto;
    margin-left: 2rem;
    flex: 1;
    font-weight: 600;
    font-size: 1.3rem;
  `,
  PageSwitch: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    margin-left: 2rem;
    margin-right: auto;

    :before {
      content: '';
      width: ${props => pageSwitchWidth(props.currPathName)};
      height: 2.2rem;
      position: absolute;
      border-radius: 0.5rem;
      left: ${props => pageSwitchLeft(props.currPathName)};
      background: white;
      z-index: 0;
      transition: all 0.3s;
    }
  `,
  PageLink: styled(Link)`
    margin-left: 2rem;
    margin-right: 2rem;
    z-index: 1;

    :hover {
      color: #707070;
      text-decoration: none;
    }
    ${props =>
      props.selected
        ? `
      color: ${props.theme.primaryGrey};
      font-weight: 600;

      :hover {
        color: ${props.theme.primaryGrey};
      }
    `
        : `
      color: #969696;
    `}
  `,
  UserContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 200px;
  `,
  UserIcon: styled.img`
    border-radius: 50%;
    width: 34px;
    height: 34px;
  `,
  ImgContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 0px;
    padding-left: 10px;
  `,
  TxtContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    ${props =>
      `
      color: ${props.theme.primaryGrey};
      font-size: 16px;
      white-space: nowrap;
    `}
  `,
  FlexContainer: styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding-left: 80px;
  `
};

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = _ => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentDidMount = () => {
    console.log(window.location.pathname);
  };

  currPageMatches = page => this.props.location.pathname === page;

  render() {
    const { onLogout, loggedIn, location, role } = this.props;
    return (
      <div>
        <Styled.Navbar light expand="md">
          <Container style={{ marginLeft: '0px', marginRight: '0px', maxWidth: '100%' }}>
            <NavbarBrand tag={Link} to="/applicant-viewer">
              <img style={{ width: '175px' }} alt="bog logo" src={logo} />
            </NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {loggedIn ? (
                <Styled.FlexContainer className="navbar-nav">
                  <Styled.PageSwitch currPathName={location.pathname}>
                    <Styled.PageLink
                      to="/applicant-viewer"
                      selected={this.currPageMatches('/applicant-viewer')}
                    >
                      Applicant Viewer
                    </Styled.PageLink>
                    {role === 'admin' && (
                      <Styled.PageLink
                        to="/user-manager"
                        selected={this.currPageMatches('/user-manager')}
                      >
                        User Manager
                      </Styled.PageLink>
                    )}
                    <Styled.PageLink to="/events" selected={this.currPageMatches('/events')}>
                      Events
                    </Styled.PageLink>
                    <Styled.PageLink to="/settings" selected={this.currPageMatches('/settings')}>
                      Settings
                    </Styled.PageLink>
                    <Styled.PageLink to="/onboarding-manager" selected={this.currPageMatches('/onboarding-manager')}>
                      Settings
                    </Styled.PageLink>
                  </Styled.PageSwitch>
                  <Styled.Dropdown nav inNavbar className="navbar-nav">
                    <Styled.Toggle color="white">
                      <Styled.UserContainer>
                        <Styled.UserContainer>
                          <Styled.ImgContainer style={{ paddingLeft: '0px' }}>
                            <Styled.UserIcon src={avatar} alt="icon"></Styled.UserIcon>
                          </Styled.ImgContainer>
                          <Styled.TxtContainer>
                            <p style={{ margin: '0px' }}>James Wang</p>
                            <p style={{ margin: '0px' }}>Admin</p>
                          </Styled.TxtContainer>
                          <Styled.ImgContainer style={{ paddingRight: '0px' }}>
                            <Icon name="dropdown-arrow" size="1.5rem" />
                          </Styled.ImgContainer>
                        </Styled.UserContainer>
                      </Styled.UserContainer>
                    </Styled.Toggle>
                    <DropdownMenu style={{ width: '100%' }}>
                      <DropdownItem>My Profile</DropdownItem>
                      <DropdownItem>
                        {' '}
                        <a href="/onboarding-manager"> Logout{' '} </a>
                      </DropdownItem>
                    </DropdownMenu>
                  </Styled.Dropdown>
                </Styled.FlexContainer>
              ) : (
                <Nav navbar></Nav>
              )}
            </Collapse>
          </Container>
        </Styled.Navbar>
      </div>
    );
  }
}

export default withRouter(Header);

// onClick={onLogout} href="/"
