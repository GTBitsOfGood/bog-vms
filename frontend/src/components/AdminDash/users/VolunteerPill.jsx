import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';

const Styled = {
  Count: styled.span`
    background-color: ${props => transparentize(0.4, props.theme.grey8)};
    border-radius: 4px;
    display: inline-block;
    padding: 0.5rem 0.85rem;
    font-weight: bold;
  `
};

const VolunteerPill = ({ count, className, style }) => (
  <Styled.Count className={className} style={style}>
    {count} {count !== 1 ? 'volunteers' : 'volunteer'}
  </Styled.Count>
);

export default VolunteerPill;

VolunteerPill.propTypes = {
  count: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};
