import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Icon } from '../../Shared';
import styled from 'styled-components';

const Styled = {
  ButtonContainer: styled.div`
    width: 95%;
    max-width: 80rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,
  Button: styled(Button)`
    background: white;
    border: none;

    ${props => props.disabled && 'background: white !important'}
  `
};

class CSVModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      file: ''
    };

    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  submit(event) {
    const bool = document.getElementById('input') == undefined;
    if (bool) {
      alert('Please upload a file before submitting');
    } else {
      document.getElementById('formCSV').submit();
    }
  }

  render() {
    return (
      <div>
        <Styled.Button onClick={this.toggle}>
          <Icon color="grey3" name="refresh" />
          <span>{this.props.buttonLabel}</span>
        </Styled.Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Upload CSV Files Here</ModalHeader>
          <ModalBody>
            <Form
              action="/api/csv/csvAddition"
              method="POST"
              enctype="multipart/form-data"
              id="formCSV"
            >
              <FormGroup>
                <Label for="exampleFile">Upload CSV File with Volunteer Information</Label>
                <Input type="file" name="input" id="input" required />
              </FormGroup>
              <FormText color="muted">
                Please upload your CSV File formatted like the excel spreadsheet below. Thank you!
              </FormText>
              <a
                href="https://docs.google.com/spreadsheets/d/1a2f5jOrtaTU9KYkuCtRQTsjCGe5_rCk7c24_F0f2BUw/export?format=xlsx"
                download
              >
                CSV Header Template
              </a>
                                        
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit}>
              Submit
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CSVModal;
