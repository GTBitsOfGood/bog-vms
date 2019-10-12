import React from 'react';
import styled from 'styled-components';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Formik, Form as FForm, Field, ErrorMessage } from 'formik';
import * as SForm from '../shared/formStyles';
import PropTypes from 'prop-types';
import { string, object, number, date } from 'yup';

const Styled = {
  Form: styled(FForm)``,
  DayPickerWrapper: styled.div`
    .DayPickerInput input {
      border: 1px solid ${props => props.theme.grey8};
      border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
      margin-bottom: 1rem;
      margin-top: 0.1rem;
    }
  `,
  ErrorMessage: styled(ErrorMessage).attrs({
    component: 'span'
  })`
    ::before {
      content: '*';
    }
    color: red;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
  `
};

const EventValidator = object().shape({
  name: string()
    .trim()
    .required(),
  date: date().required(),
  location: string()
    .trim()
    .required(),
  description: string()
    .trim()
    .required(),
  contact_phone: string().trim(),
  contact_email: string()
    .email()
    .trim(),
  max_volunteers: number()
    .positive()
    .required()
});

const EventCreateModal = ({ open, toggle }) => {
  const handleSubmit = () => {};

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Event</ModalHeader>
      <Formik
        initialValues={{
          name: '',
          date: '',
          location: '',
          description: '',
          contact_phone: '',
          contact_email: '',
          max_volunteers: 0,
          external_links: []
        }}
        onSubmit={() => {
          console.log('submit');
        }}
        validationSchema={EventValidator}
        render={({ handleSubmit, isValid, errors, values, setFieldValue, handleBlur }) => (
          <React.Fragment>
            <ModalBody>
              <Styled.Form>
                <SForm.FormGroup>
                  <SForm.Label>Name</SForm.Label>
                  <Styled.ErrorMessage name="name" />
                  <Field name="name">{({ field }) => <SForm.Input {...field} type="text" />}</Field>
                  <SForm.Label>Date</SForm.Label>
                  <Styled.ErrorMessage name="date" />
                  <Field name="date">{({ field }) => <SForm.Input {...field} type="date" />}</Field>
                  <SForm.Label>Location</SForm.Label>
                  <Styled.ErrorMessage name="location" />
                  <Field name="location">
                    {({ field }) => <SForm.Input {...field} type="text" />}
                  </Field>
                  <SForm.Label>Description</SForm.Label>
                  <Styled.ErrorMessage name="description" />
                  <Field name="description">
                    {({ field }) => <SForm.Input {...field} type="textarea" />}
                  </Field>
                  <SForm.Label>Contact Phone</SForm.Label>
                  <Styled.ErrorMessage name="contact_phone" />
                  <Field name="contact_phone">
                    {({ field }) => <SForm.Input {...field} type="text" />}
                  </Field>
                  <SForm.Label>Contact Email</SForm.Label>
                  <Styled.ErrorMessage name="contact_email" />
                  <Field name="contact_email">
                    {({ field }) => <SForm.Input {...field} type="email" />}
                  </Field>
                  <SForm.Label>Max # of Volunteers</SForm.Label>
                  <Styled.ErrorMessage name="max_volunteers" />
                  <SForm.Input
                    type="number"
                    name="max_volunteers"
                    value={values.max_volunteers}
                    onBlur={handleBlur}
                    onChange={e => {
                      if (e.target.value && !isNaN(parseInt(e.target.value, 10))) {
                        setFieldValue('max_volunteers', parseInt(e.target.value, 10));
                      } else {
                        setFieldValue('max_volunteers', e.target.value);
                      }
                    }}
                  />
                </SForm.FormGroup>
              </Styled.Form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
              <Button color="primary" onClick={handleSubmit} disabled={!isValid}>
                Submit
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      />
    </Modal>
  );
};
EventCreateModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func
};

export default EventCreateModal;