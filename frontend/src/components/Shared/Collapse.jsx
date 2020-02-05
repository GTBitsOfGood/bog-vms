import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { Collapse as BootstrapCollapse } from 'reactstrap';
import { transparentize } from "polished";

const indicatorRadius = "0.75rem";
const Indicator = styled.span`
  flex-grow: 0;
  position: relative;
  padding: 0.25rem;
  transition: transform 0.15s ease;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'none')};

  // Fix arrow position so it pivots around center
  svg {
    top: 2px;
    position: relative;
  }

  // Pseudo-element provides circle highlight on keyboard focus
  &::before {
    content: " ";
    position: absolute;
    top: calc(50% - ${indicatorRadius});
    left: calc(50% - ${indicatorRadius});
    width: calc(${indicatorRadius} * 2);
    height: calc(${indicatorRadius} * 2);
    border-radius: 20rem;
    background-color: transparent;
    transition: background-color 0.15s ease;
  }
`;

const ButtonInner = styled.span`
  position: relative;
  padding: 0.3rem 0 0.05rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.grey8};
  transition: border-bottom-color 0.15s linear;
`;

const Styled = {
  Indicator,
  ButtonInner,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
  Button: styled.button`
    color: ${props => props.theme.grey1};
    font-size: 1rem;
    background-color: transparent;
    border: none;

    &:hover > ${ButtonInner}, &:focus > ${ButtonInner} {
      border-bottom-color: ${props => props.theme.grey5};
    }
    
    &:active > ${ButtonInner} {
      border-bottom-color: ${props => props.theme.grey3};
    }

    // Select using inner button span to prevent focus style on mouse focus
    // See https://www.kizu.ru/keyboard-only-focus/
    &:focus > ${ButtonInner} {
      border-bottom-color: ${props => props.theme.grey5};

      & > ${Indicator}::before {
        background-color: ${props => transparentize(0.6, props.theme.grey8)};
      }
    }

    // Remove base focus style
    &:focus, ${ButtonInner}:focus {
      outline: none;
    }
  `,
  Title: styled.label`
    flex-grow: 1;
    margin: 0;
    text-align: left;
    cursor: unset;
    color: ${props => props.theme.grey5};
  `
};

const Controlled = ({ children, title, isOpen, onClick, ...rest }) => (
  <Styled.Container>
    <Styled.Button onClick={onClick} type="button" tabIndex="0">
      <Styled.ButtonInner tabIndex="-1">
        <Styled.Title>{title}</Styled.Title>
        <Styled.Indicator isOpen={isOpen}>
          <Icon name="dropdown-arrow" color="grey5" size="1.5rem" />
        </Styled.Indicator>
      </Styled.ButtonInner>
    </Styled.Button>
    <BootstrapCollapse isOpen={isOpen} {...rest}>
      {children}
    </BootstrapCollapse>
  </Styled.Container>
);

const Collapse = ({ children, title, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Controlled
      title={title}
      {...rest}
      onClick={useCallback(() => setIsOpen(current => !current), [setIsOpen])}
      isOpen={isOpen}
    >
      {children}
    </Controlled>
  );
};

export const ControlledCollapse = Controlled;
export default Collapse;

Controlled.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func
};

Collapse.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired
};
