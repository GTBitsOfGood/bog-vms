import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, FormText } from 'reactstrap';
import { Button, Input } from 'components/Shared';
import onboarding3 from '../../../images/onboarding_update3.svg';

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
    align-items: center;
    flex-direction: row;
  `,
  FormField: styled(FormGroup)`
    border: none;
    justfiy-content: stretch;
    flex: 1;
  `
};

const Onboarding3 = () => {
  const [loading] = useState(true);
  return (
    <Styled.Container>
      <Styled.HorizontalContainer style={{ margin: '1rem' }}>
        <Link to="/onboarding2"> 
          <Button type='reset'>  
            〈 Back 
          </Button>
        </Link>
      </Styled.HorizontalContainer>
      <Styled.HorizontalContainer style={{ textAlign: 'center' }}>
        <legend> Let's add some volunteers.</legend>
      </Styled.HorizontalContainer>
      <Styled.ImgContainer>
        <img style={{ width: '900px', height: '87px' }} alt="onboard" src={onboarding3} />
      </Styled.ImgContainer>
      <Styled.HorizontalContainer style={{ marginLeft: '5rem', marginRight: '5rem' }}>
        <Styled.Container style={{ flex: '1', marginTop: '50px' }}>
          <legend>Setting up your volunteer database. </legend>
          <Styled.HorizontalContainer style={{ marginLeft: 'none', marginRight: 'none' }}>
            <FormText style={{ color: 'muted', textAlign: 'center' }}>
              (1) Download this template
            </FormText>
          </Styled.HorizontalContainer>
          <Styled.HorizontalContainer style={{ marginLeft: 'none', marginRight: 'none' }}>
            <FormText style={{ color: 'muted', textAlign: 'center' }}>
              (2) Transfer volunteer data over
            </FormText>
          </Styled.HorizontalContainer>
          <Styled.HorizontalContainer style={{ marginLeft: 'none', marginRight: 'none' }}>
            <FormText style={{ color: 'muted', textAlign: 'center' }}>
              (3) Upload new spreadsheet
            </FormText>
          </Styled.HorizontalContainer>
        </Styled.Container>
        <Styled.FormField style={{ border: 'dotted', borderRadius: '25px', padding: '50px' }}>
          <Styled.HorizontalContainer style={{ marginBottom: '1rem' }}>
            <Label for="exampleFile">Upload CSV or Spreadsheet</Label>
          </Styled.HorizontalContainer>
          <Styled.HorizontalContainer style={{ marginBottom: '1rem' }}>
            <input type="file" name="file" id="exampleFile" />
          </Styled.HorizontalContainer>
          <Styled.HorizontalContainer
            style={{ justifyContent: 'center', marginLeft: 'none', marginRight: 'none' }}
          >
            <FormText style={{ color: 'muted', textAlign: 'center' }}>
              Drag a file here or browse for a file to upload
            </FormText>
          </Styled.HorizontalContainer>
        </Styled.FormField>
      </Styled.HorizontalContainer>
      <Styled.HorizontalContainer style={{ marginTop: '5rem', marginBottom: '1rem', justifyContent: 'flex-end' }}>
        <Link to="/onboarding4">
          <Button type='submit'>
            Next
          </Button>
        </Link>
      </Styled.HorizontalContainer>
    </Styled.Container>
  );
};

export default Onboarding3;
