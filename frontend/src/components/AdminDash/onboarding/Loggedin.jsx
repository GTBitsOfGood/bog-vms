import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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

const loggedin  =  () => {

    return (
        <Styled.Container>
            <Styled.TxtContainer style={{textAlign: 'center'}}>
                <legend> Welcome! You are logged in!</legend>
            </Styled.TxtContainer>
        </Styled.Container>
    )
};

export default loggedin();
