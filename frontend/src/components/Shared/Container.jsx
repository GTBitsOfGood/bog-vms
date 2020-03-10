import React from 'react';
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    padding: 2rem;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: auto;
  `
};

const Container = ({ children, ...props }) => (
  <Styled.Container
    {...props}
  >
    {children}
  </Styled.Container>
);

export default Container;
