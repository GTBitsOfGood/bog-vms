import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, CustomInput } from 'reactstrap';
import styled from 'styled-components';

const Styled = {
  ErrorMsg: styled(ErrorMessage)`
    color: red;
  `,
  CustomInput: styled(CustomInput)`
    .custom-control-label {
      &::before,
      &::after {
        top: ${props => (props.small ? '0.06rem' : '0.2rem')};
      }
    }
  `,
  Wrapper: styled.div`
    flexdirection: 'column';
    display: 'flex';
    margin: '5px';

    ${props => (props.small ? `font-size: 15px;` : '')}
  `
};

const Checkbox = props => (
  <Styled.Wrapper className={props.className} style={props.style} small={props.small}>
    <Field name={props.name}>
      {({ field, form }) => (
        <FormGroup check>
          <Styled.CustomInput
            small={props.small}
            type="checkbox"
            id={props.name}
            checked={field.value}
            label={props.value}
            onChange={() => form.setFieldValue(props.name, !field.value)}
          />
        </FormGroup>
      )}
    </Field>
    <Styled.ErrorMsg component="div" name={props.name} />
  </Styled.Wrapper>
);

export default Checkbox;
