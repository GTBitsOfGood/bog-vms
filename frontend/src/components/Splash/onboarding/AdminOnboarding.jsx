import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Shared';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import StepWizard from 'react-step-wizard';

import AdminOnboarding1 from './AdminOnboarding1';
import AdminOnboarding2 from './AdminOnboarding2';
import AdminOnboarding3 from './AdminOnboarding3';
import AdminOnboarding4 from './AdminOnboarding4';

import image from '../../../images/onboardingArt.png';
import logo from '../../../images/bog_logo.png';

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

const AdminOnboarding = () => {
  const [loading] = useState(true);
  const [transitions] = useState({});
  const [formData] = useState({});

  // formProp is the name of the property to set
  // data is the value of the property to set
  // ex. { name: 'Bob' } <- name = formProp, data = Bob
  function setData (formProp, data) {
    formData[formProp] = data
  }

  console.log(formData);

  return (
    <Styled.Container>
      <Styled.HorizontalContainer style={{ margin: '1rem', width: '100%' }}>
        <div id="wrapper" style={{width: '100%'}}>
          <StepWizard transitions={transitions}>
            <AdminOnboarding1 data={formData} setData = {setData}/>
            <AdminOnboarding2 />
            {/* <AdminOnboarding3 /> */}
            <AdminOnboarding4 />
          </StepWizard>
        </div>
      </Styled.HorizontalContainer>
    </Styled.Container>
  );
};

export default AdminOnboarding;