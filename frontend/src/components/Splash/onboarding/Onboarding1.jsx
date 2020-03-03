import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Input, Select } from 'components/Shared';

import onboarding1 from '../../../images/onboarding_update1.svg';
// import OnboardingManager from './OnboardingManager';
// import {Route} from "react-router-dom";
const Styled = {
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
    flex-direction: row;
    margin-left: 8rem;
    margin-right: 8rem;
    justify-content: stretch;
  `,
  ImgContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 3rem;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center
    flex-direction: row
  `,
  FormField: styled(FormGroup)`
    border: none;
    justfiy-content: stretch;
    flex: 1;
  `
};

const Onboarding1 = () => {

  const [loading] = useState(true);
  return (
    <Styled.Container>
      <Styled.HorizontalContainer style={{ margin: '1rem' }}>
        <Link to="/">
          <Button type='reset' style={{ marginLeft: '3rem', flex: '0'}}>
            〈 Back 
          </Button>
        </Link>
      </Styled.HorizontalContainer>
      <Styled.HorizontalContainer style={{ textAlign: 'center' }}>
        <legend> Hi, let's get your account set up.</legend>
      </Styled.HorizontalContainer>
      <Styled.ImgContainer>
        <img style={{ width: '900px', height: '87px' }} alt="onboard" src={onboarding1} />
      </Styled.ImgContainer>
      <Styled.HorizontalContainer style={{ marginTop: '3rem' }}>
        <legend>Account Information</legend>
      </Styled.HorizontalContainer>
      <Form>
        <Styled.HorizontalContainer style={{ justifyContent: 'stretch', marginTop: '2rem' }}>
          <Styled.FormField style={{ marginRight: '50px' }}>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
          </Styled.FormField>
          <Styled.FormField>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
          </Styled.FormField>
        </Styled.HorizontalContainer>
        <Styled.HorizontalContainer style={{ justifyContent: 'stretch', marginTop: '1rem' }}>
          <Styled.FormField style={{ marginRight: '50px' }}>
            <Input type="text" name="fname" id="firstName" placeholder="First Name" />
          </Styled.FormField>
          <Styled.FormField style={{ marginRight: '50px' }}>
            <Input type="text" name="lname" id="lastName" placeholder="Last Name" />
          </Styled.FormField>
          <Styled.FormField>
            <Select name="select" id="roleSelect">
              <option>Role1</option>
              <option>Role2</option>
              <option>Role3</option>
            </Select>
          </Styled.FormField>
        </Styled.HorizontalContainer>
        <Styled.HorizontalContainer
          style={{ marginTop: '2rem', marginBottom: '1rem', justifyContent: 'flex-end' }}
        >
          <Link to="/onboarding2">
            <Button type='submit'>
              Next
            </Button>
          </Link>
        </Styled.HorizontalContainer>
      </Form>
    </Styled.Container>
  );
};

export default Onboarding1;
