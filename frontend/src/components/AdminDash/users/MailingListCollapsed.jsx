import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  `,
  Text: styled.p`
    margin: 0.5rem 0;
  `,
  UserCountBlock: styled.div`
    padding: 0.5rem 1rem;
    background: #e5e5e5;
    border-radius: 2px;
    font-weight: bold;
    text-align: center;
  `
};

const MailingListCollapsed = ({ userCount }) => {
  return (
    <Styled.Container>
      <Styled.Title>Mailing List</Styled.Title>
      <Styled.Text>Currently you have</Styled.Text>
      <Styled.UserCountBlock>{userCount} volunteers</Styled.UserCountBlock>
      <Styled.Text>in your mailing list</Styled.Text>
    </Styled.Container>
  );
};

MailingListCollapsed.propTypes = {
  userCount: PropTypes.number.isRequired
};

export default MailingListCollapsed;
