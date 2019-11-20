import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Styled = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  `,
  Button: styled.button`
    margin-top: 0.5rem;
    border-radius: 10px;
    background-color: ${props => (props.dark ? '#565656' : 'white')};
    color: ${props => (props.dark ? 'white' : '#969696')};
    width: 150px;
    padding: 0.5rem 2rem;
    font-weight: bold;

    :focus {
      box-shadow: none;
      outline: none;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;
  `
};

const MailingListCollapsed = ({ users, onClearClick }) => {
  const onExportClick = () => {
    let url = users.reduce((prev, user) => prev + user.email + ',', 'mailto:');
    window.open(url, '_blank');
  };

  return (
    <Styled.Container>
      <div>
        <Styled.Title>Mailing List</Styled.Title>
        <Styled.Text>Currently you have</Styled.Text>
        <Styled.UserCountBlock>{users.length || 0} volunteers</Styled.UserCountBlock>
        <Styled.Text>in your mailing list</Styled.Text>
      </div>
      <Styled.ButtonContainer>
        <Styled.Button dark={true} onClick={onExportClick}>
          Export
        </Styled.Button>
        <Styled.Button onClick={onClearClick}>Clear List</Styled.Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
};

MailingListCollapsed.propTypes = {
  users: PropTypes.array.isRequired,
  onClearClick: PropTypes.func.isRequired
};

export default MailingListCollapsed;
