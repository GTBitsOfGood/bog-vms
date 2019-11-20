import React from 'react';
import { Button } from 'reactstrap';
import { Icon } from '../../Shared';
import styled from 'styled-components';
import CSVModal from './CSVModal';

const Styled = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
  `,
  Button: styled(Button)`
    background: white;
    border: none;

    ${props => props.disabled && 'background: white !important'}
  `
};

class Settings extends React.Component {
  render() {
    return (
      <Styled.Container>
        <CSVModal buttonLabel="Upload CSV" />
      </Styled.Container>
    );
  }
}

export default Settings;
