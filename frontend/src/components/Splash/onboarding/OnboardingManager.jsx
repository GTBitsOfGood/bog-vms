import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Icon, ClearButton, Container, Button } from 'components/Shared';
import image from '../../../images/onboardingArt.png';
// import logo from '../../../images/bog_logo.png';
import Footer from '../Footer';


const Styled = {
  FormTitle: styled.legend`
    font-size: 250%;
    color: ${props => props.theme.grey3};
  `,
  Input: styled.input`
    font-size: 120%;
    outline: 0;
    border-width: 0 0 2px;
    border-color: ${props => props.theme.grey5};
    width: 100%;
    margin: 1.5rem 0rem;
    padding: .5rem 0rem;
  `,
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: space-between;
  `,
  ContainerTest: styled.div`
    display: flex;
    align-items: space-between;
    flex-direction: column;
    margin-left: 5rem;
  `,
  ImgContainer: styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
  `,
  HeaderContainer: styled.div`
    width: 95%;
    max-width: 80rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,
  LoginButton: styled(Button)`
    padding: .70rem 5.75rem;
    border: none;
  `,
  ForgotButton: styled(Button)`
    border: none;
    flex: 1;
    margin-left: 2rem;
    color: #CECECE;
    background: hsl(0, 0%, 100%);
    font-size: 120%;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 2rem;
  `,
  FormText: styled(FormText)`
    margin-top: 2rem;
    font-size: 120%;
  `
};

const OnboardingManager = () => {
  const [loading] = useState(true);

  function googleResponse(response) {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], {
      type: 'application/json'
    });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('/auth/google', options).then(r => {
      r.json().then(user => this.props.onAuth(user));
    });
  }

  function loginFailed() {
    alert('Something went wrong. Please try again');
  }
  return (
    <Styled.Container>
      <Styled.ContainerTest style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
        <Styled.FormTitle>Login</Styled.FormTitle>
        <Form style={{ width: '100%' }}>
          <FormGroup>
            <Styled.Input type="email" name="email" id="exampleEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Styled.Input type="password" name="password" id="examplePassword" placeholder="Password" />
          </FormGroup>
          <Styled.ButtonContainer>
            <Styled.LoginButton type='submit'>
              <a href="/" style={{color: '#FFFFFF', fontSize: '120%'}}>Login </a>
              {/*Loggin*/}
            </Styled.LoginButton>
            <Styled.ForgotButton>
              Forgot Password?
            </Styled.ForgotButton>
          </Styled.ButtonContainer>
          <Footer />
          <Styled.FormText>
            Are you an organizer? <Link to='/onboarding1'>Sign your non-profit up here</Link> <br />
            Are you a volunteer? <Link to='#'>Sign up here</Link>
          </Styled.FormText>
        </Form>
      </Styled.ContainerTest>
      <Styled.ContainerTest>
        <Styled.ImgContainer>
          <img style={{ width: '720px', height: '783px' }} alt="onboardingImage" src={image} />
        </Styled.ImgContainer>
      </Styled.ContainerTest>
    </Styled.Container>
  );
};
export default OnboardingManager;
