import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Input, Select} from 'components/Shared';
import onboarding4 from '../../../images/onboarding_update3.svg';

const Styled = {
  Color: styled(Button)`
    margin: 1rem;
    padding: 2rem;
    background: ${props => props.color}
  `,
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: space-around;
  `,
  HorizontalContainer: styled.div`
    display: flex;
    flex: 0 1;
    flex-direction: row;
    margin: 3rem;
  `,
  ImgContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem;
  `,
  TxtContainer: styled.div`
    display: flex;
    align-content: center;
  `,
  Button: styled(Button)`
    background: gray;
  `,
  BackButton: styled(Button)`
    border: none;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `
};

const Onboarding4 = () => {
  const [loading] = useState(true);

  let colors = ['#FFD528', '#F68C4A', '#847BD7', '#CE1E4D', '#F1625E'];

  return (
    <Styled.Container>
      <Styled.HorizontalContainer style={{ margin: '1rem' }}>
        <Link to="/onboarding3"> 
          <Button type='reset'>  
            〈 Back 
          </Button>
        </Link>
      </Styled.HorizontalContainer>
      <Styled.TxtContainer style={{ textAlign: 'center' }}>
        <legend> How do you want this app to look? </legend>
      </Styled.TxtContainer>
      <Styled.ImgContainer>
        <img style={{ width: '900px', height: '87px' }} alt="onboard" src={onboarding4} />
      </Styled.ImgContainer>
      <Styled.HorizontalContainer style={{ justifyContent: 'space-around' }}>
        <FormGroup className='col-md-4'>
          <h4>Type of Mode</h4>
          <Select type="select" name="selectMulti" id="exampleSelectMulti">
            <option>Dark</option>
            <option>Light</option>
          </Select>
        </FormGroup>
        <div className='col-md-4'>
          <h4>Color Theme</h4>
          {colors.map(color => (
            <Styled.Color color={color} />
          ))}
        </div>
      </Styled.HorizontalContainer>
      <Styled.HorizontalContainer
        style={{
          flexDirection: 'row',
          marginTop: '5rem',
          marginBottom: '1rem',
          justifyContent: 'flex-end'
        }}
      >
        <Link to="/">
          <Button type='submit'>
            Finish
          </Button>
        </Link>
      </Styled.HorizontalContainer>
    </Styled.Container>
  );
};

export default Onboarding4;
