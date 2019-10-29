import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
  
  // submit(event) {
  //   const file = event.target.files[0];
  //   var reader = new FileReader();
  
  //   reader.onload = function(e) {

  //     this.setState({file: reader.result})
  //     const header_end = reader.result.indexOf('\n')
  //     const header = reader.result.substring(0, header_end)
  //     console.log(this.state.file);
    
  //   }.bind(this);

  //   reader.readAsText(file)   
  // }

  submit(event) {
      const bool = document.getElementById("input") == undefined
      if (bool) {
        alert("Please upload a file before submitting");
      } else {
      document.getElementById("formCSV").submit();
      }
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Upload CSV Files Here</ModalHeader>
          <ModalBody>
          <Form action="/api/csv/csvAddition" method="POST" enctype="multipart/form-data" id="formCSV">
            <FormGroup>
              <Label for="exampleFile">Upload CSV File with Volunteer Information</Label>
              <Input type="file" name="input" id="input" required/>
            </FormGroup>
            <FormText color="muted">Please upload your CSV File formatted like the excel spreadsheet below. Thank you!</FormText>
            <a href='https://docs.google.com/spreadsheets/d/1a2f5jOrtaTU9KYkuCtRQTsjCGe5_rCk7c24_F0f2BUw/export?format=xlsx' download>CSV Header Template</a>
             
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit}>Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CSVModal;