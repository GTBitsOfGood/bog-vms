import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Shared';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import onboarding3 from '../../../images/onboarding_3.svg'
const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.grey9};
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: space-around;
  `,
  HorizontalContainer: styled.div`
    width: 100%;
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
    align-items: center
    flex-direction: row
  `
};

const Onboarding3 = () => {
  const [loading] = useState(true);

  return (
    <Styled.Container>
      <Styled.HorizontalContainer style={{ margin: '1rem' }}>
        <Styled.BackButton>
            <a href ='/onboarding2'> Back </a>
        </Styled.BackButton>
      </Styled.HorizontalContainer>
      <Styled.TxtContainer style={{ textAlign: 'center'}}>
        <legend> How do you want this app to look? </legend>
      </Styled.TxtContainer>
      <Styled.ImgContainer>
        <img style={{ width: '900px', height: '87px'}} alt="onboard" src={onboarding3}/>
      </Styled.ImgContainer>
      <Form style={{ width: '100%' }}>
        <Styled.HorizontalContainer style={{ justifyContent: "space-around" }}>
          <FormGroup>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
              <option>Dark</option>
              <option>Light</option>
            </Input>
          </FormGroup>
          <Button>Red</Button>
          <Button>Orange</Button>
          <Button>Yellow</Button>
          <Button>Green</Button>
          <Button>Blue</Button>
          <Button>Purple</Button>
        </Styled.HorizontalContainer>
        <Styled.HorizontalContainer>
          <Styled.Button>
              <a href ='/onboarding4'> Next </a>
          </Styled.Button>
        </Styled.HorizontalContainer>
      </Form>
    </Styled.Container>
  );
};

export default Onboarding3;
