import React from 'react';
import { Button } from 'reactstrap';
import { Icon } from '../../Shared';
import styled from 'styled-components';
import CSVModal from '../users/CSVModal';
import EditProfile from './EditProfile';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.grey9};
    padding: 1rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  HeaderContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,
};

class Settings extends React.Component {
  render() {
    return (
      <Styled.Container>
        <EditProfile/>
      </Styled.Container>
    );
  }
}

export default Settings;
