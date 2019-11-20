import React from 'react';
import { Button } from 'reactstrap';
import { Icon } from '../../Shared';
import styled from 'styled-components';
import CSVModal from './CSVModal';

const Styled = {
  ButtonContainer: styled.div`
    width: 95%;
    max-width: 80rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
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
      <div>
        <CSVModal buttonLabel="Upload CSV"/>
      </div>
    );
  }
}

export default Settings;
