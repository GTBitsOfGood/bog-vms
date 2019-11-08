import React from 'react';
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    padding: 2rem 1rem;
    background-color: ${props => props.theme.greyBg};
  `,
  Title: styled.h1`
    font-size: 24px;
    color: #969696;
  `
};

const MailingListCollapsed = () => {
  return (
    <Styled.Container>
      <Styled.Title>Mailing List Expanded</Styled.Title>
    </Styled.Container>
  );
};

export default MailingListCollapsed;
