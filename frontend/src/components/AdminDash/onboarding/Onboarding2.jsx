import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Shared';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import onboarding2 from '../../../images/onboarding_2.svg'
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


const Onboarding2 = () => {
    const [loading] = useState(true);
        return (
            <Styled.Container>
                <Styled.HorizontalContainer style={{margin: '1rem'}}>
                    <Styled.BackButton>
                        <a href ='/onboarding1'> Back </a>
                    </Styled.BackButton>
                </Styled.HorizontalContainer>
                <Styled.TxtContainer style={{textAlign: 'center'}}>
                    <legend> Let's set up your organization.</legend>
                </Styled.TxtContainer>
                <Styled.ImgContainer>
                    <img style={{width: '900px', height: '87px'}} alt="onboard" src={onboarding2}/>
                </Styled.ImgContainer>
                <Form style={{width: '100%'}}>
                    <Styled.HorizontalContainer style={{justifyContent: "space-evenly"}}>
                        <FormGroup style={{border: 'none'}}>
                            <legend> Organization Information</legend>
                            <Input type="text" name="compName" id="companyName" placeholder="Company Name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">Upload your company logo</Label>
                            <Input type="file" name="file" id="exampleFile"/>
                            <FormText color="muted">
                                Drag an image here or browse for an image to upload
                            </FormText>
                        </FormGroup>
                    </Styled.HorizontalContainer>
                    <Styled.HorizontalContainer>
                        <Styled.Button>
                            <a href ='/onboarding3'> Next </a>
                        </Styled.Button>
                    </Styled.HorizontalContainer>
                </Form>
            </Styled.Container>
        );
};

export default Onboarding2;
