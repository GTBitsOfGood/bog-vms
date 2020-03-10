import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
    font-size: ${props => props.size || '10px'} !important;
  `,
  Bubble: styled.span`
    background-color: #555;
    border-radius: 50%;
    margin: 0.3em;
    height: 1em;
    width: 1em;
    animation: bubbly 0.5s ease-in-out infinite;
    animation-delay: ${props => props['anim-delay'] || '0s'};

    @keyframes bubbly {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  `
};

const LoadingIcon = ({ size, className }) => (
  <Styled.Container size={size} className={className}>
    <Styled.Bubble />
    <Styled.Bubble anim-delay="0.1s" />
    <Styled.Bubble anim-delay="0.2s" />
  </Styled.Container>
);

export default LoadingIcon;

LoadingIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string
};
