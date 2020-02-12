import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import onboarding2 from '../../../images/onboarding_update2.svg';
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
  Button: styled(Button)`
    border: none;
    background: black;
  `,
  BackButton: styled(Button)`
    margin-left: 3rem;
    border: none;
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

class AdminOnboarding2 extends React.Component {

  render() {
    return (
      <Styled.Container>
        <Styled.HorizontalContainer style={{ margin: '1rem' }}>
          <Styled.BackButton onClick={() => {
            this.props.previousStep()
          }}>
            <span style={{ color: '#f79a0d' }}>Back</span>
          </Styled.BackButton>
        </Styled.HorizontalContainer>
        <Styled.HorizontalContainer style={{ textAlign: 'center' }}>
          <legend> Let's set up your organization.</legend>
        </Styled.HorizontalContainer>
        <Styled.ImgContainer>
          <img style={{ width: '900px', height: '87px' }} alt="onboard" src={onboarding2} />
        </Styled.ImgContainer>
        <Form style={{ marginTop: '3rem' }}>
          <Styled.HorizontalContainer style={{ marginLeft: '5rem', marginRight: '5rem' }}>
            <Styled.FormField style={{ marginRight: '50px', marginTop: '80px' }}>
              <legend> Organization Information</legend>
              <Input type="text" name="compName" id="companyName" placeholder="Company Name" />
            </Styled.FormField>
            <Styled.FormField style={{ border: 'dotted', borderRadius: '25px', padding: '50px' }}>
              <Styled.HorizontalContainer style={{ marginBottom: '1rem' }}>
                <Label for="exampleFile">Upload your company logo</Label>
              </Styled.HorizontalContainer>
              <Styled.HorizontalContainer style={{ marginBottom: '1rem' }}>
                <Input type="file" name="file" id="exampleFile" />
              </Styled.HorizontalContainer>
              <Styled.HorizontalContainer
                style={{ justifyContent: 'center', marginLeft: 'none', marginRight: 'none' }}
              >
                <FormText style={{ color: 'muted', textAlign: 'center' }}>
                  Drag an image here or browse for an image to upload
              </FormText>
              </Styled.HorizontalContainer>
            </Styled.FormField>
          </Styled.HorizontalContainer>
          <Styled.HorizontalContainer
            style={{ marginTop: '5rem', marginBottom: '1rem', justifyContent: 'flex-end' }}
          >
            <Styled.Button onClick={() => {
              this.props.nextStep()
            }}>
              <span style={{ color: '#f79a0d' }}>Next</span>
              {/* <Link to="/onboarding3"> Next </Link> */}
            </Styled.Button>
          </Styled.HorizontalContainer>
        </Form>
      </Styled.Container>
    );
  }
};

export default AdminOnboarding2;
