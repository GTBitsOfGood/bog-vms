import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import { Collapse as BootstrapCollapse } from 'reactstrap';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
  Block: styled.button`
    padding: 0.5rem 0 0.25rem;
    color: ${props => props.theme.grey1};
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    outline: none;
    background-color: transparent;
    border: none;
    pointer: cursor;
    border-bottom: 1px solid ${props => props.theme.grey7};
  `,
  Title: styled.label`
    flex-grow: 1;
    margin: 0;
    text-align: left;
    cursor: unset;
  `,
  Indicator: styled.span`
    flex-grow: 0;
    padding: 0.25rem;
    transition: transform 0.15s ease;
    transform: ${props => (props.isOpen ? 'rotate(180deg) translateY(2px)' : 'none')};
  `
};

const Controlled = ({ children, title, isOpen, onClick, ...rest }) => (
  <Styled.Container>
    <Styled.Block onClick={onClick}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Indicator isOpen={isOpen}>
        <Icon name="dropdown-arrow" color="grey3" size="1.5rem" />
      </Styled.Indicator>
    </Styled.Block>
    <BootstrapCollapse isOpen={isOpen} onClick={onClick} {...rest}>
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
