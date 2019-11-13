import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Shared';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Stats from './OnboardingCreate';
import Onboarding2 from './Onboarding2'
import { Route, Redirect } from 'react-router-dom';

import onboarding1 from '../../../images/onboarding_1.svg'
import OnboardingManager from "./OnboardingManager";
// import {Route} from "react-router-dom";
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
    border: none;
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


const Onboarding1 = () => {
    const [loading] = useState(true);


        return (
            <Styled.Container>
                <Styled.HorizontalContainer style={{margin: '1rem'}}>
                    <Styled.BackButton >
                        <a href ='/onboarding-manager'> Back </a>
                    </Styled.BackButton>
                </Styled.HorizontalContainer>
                <Styled.TxtContainer style={{textAlign: 'center'}}>
                    <legend> Hi, let's get your account set up.</legend>
                </Styled.TxtContainer>
                <Styled.ImgContainer>
                    <img style={{width: '900px', height: '87px'}} alt="onboard" src={onboarding1}/>
                </Styled.ImgContainer>
                <Styled.TxtContainer style={{marginLeft: '2rem'}}>
                    <legend>Account Information</legend>
                </Styled.TxtContainer>
                <Form style={{width: '100%'}}>
                    <Styled.HorizontalContainer style={{justifyContent: "space-evenly"}}>
                        <FormGroup style={{border: 'none'}}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                        </FormGroup>
                    </Styled.HorizontalContainer>
                    <Styled.HorizontalContainer style={{justifyContent: "space-evenly"}}>
                        <FormGroup style={{border: 'none'}}>
                            <Input type="text" name="fname" id="firstName" placeholder="First Name" />
                        </FormGroup>
                        <FormGroup style={{border: 'none'}}>
                            <Input type="text" name="lname" id="lastName" placeholder="Last Name" />
                        </FormGroup>
                        <FormGroup style={{border: 'none'}}>
                            <Input type="select" name="select" id="roleSelect" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Input>
                        </FormGroup>
                    </Styled.HorizontalContainer>
                    <Styled.HorizontalContainer>
                        <Styled.BackButton >
                            <a href ='/onboarding2'> Next </a>
                        </Styled.BackButton>
                    </Styled.HorizontalContainer>
                </Form>
            </Styled.Container>
        );

};

export default Onboarding1;
