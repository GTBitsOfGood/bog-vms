import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Styled = {
    Button: styled(Button)`
    border: none;
    background: black;
  `,
    Container: styled.div`
    width: 75vw;
    background: white;
    padding: 1.5rem 0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        margin-right:auto;
    }
  `,
    HorizontalContainer: styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 6rem;
    margin-right: 6rem;
    justify-content: stretch;
  `,
    FormColumn: styled.div`
    display: flex;
    flex-direction: column;
    `,
    FormField: styled(FormGroup)`
    border: none;
    justfiy-content: stretch;
    flex: 1;
  `,
    Label: styled.label`
    font-weight: 600;
  `
}

const getProfileInfo = () => {
    // api call to get user info (email, etc.)

}

const EditProfile = () => {
    const [form] = useState({
        email: 'admin@gmail.com',
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        firstName: 'Admin',
        lastName: 'Admin',
        accountType: 'volunteer'
    });

    return (
        <Styled.Container>
            <Styled.HorizontalContainer style={{ "width": "100%", "paddingLeft": "6rem" }}>
                <legend>Edit Profile</legend>
            </Styled.HorizontalContainer>
            <Form style={{ "width": "100%" }}>
                <Styled.HorizontalContainer style={{ justifyContent: 'stretch', marginTop: '1rem' }}>
                    <Styled.FormColumn style={{ "width": "100%" }}>
                        <label for="exampleEmail">Email</label>
                        <Styled.FormField>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" defaultValue={form.email} onChange={(e) => form.email = e.target.value} />
                        </Styled.FormField>
                    </Styled.FormColumn>
                </Styled.HorizontalContainer>
                <Styled.HorizontalContainer style={{ justifyContent: 'stretch', marginTop: '1rem' }}>
                    <Styled.FormColumn style={{ "width": "100%" }}>
                        <label>First Name</label>
                        <Styled.FormField style={{ marginRight: '50px' }}>
                            <Input type="text" name="fname" id="firstName" placeholder="First Name" defaultValue={form.firstName} onChange={(e) => form.firstName = e.target.value} />
                        </Styled.FormField>
                    </Styled.FormColumn>
                    <Styled.FormColumn style={{ "width": "100%" }}>
                        <label>Last Name</label>
                        <Styled.FormField style={{ marginRight: '50px' }}>
                            <Input type="text" name="lname" id="lastName" placeholder="Last Name" defaultValue={form.lastName} onChange={(e) => form.lastName = e.target.value} />
                        </Styled.FormField>
                    </Styled.FormColumn>
                    <Styled.FormColumn style={{ "width": "100%" }}>
                        <label>Account Type</label>
                        <Styled.FormField>
                            <Input type="select" name="select" id="roleSelect" defaultValue={form.accountType} onChange={(e) => form.accountType = e.target.value}>
                                <option value="volunteer">Volunteer</option>
                                <option value="other">Other</option>
                            </Input>
                        </Styled.FormField>
                    </Styled.FormColumn>
                </Styled.HorizontalContainer>
                <Styled.HorizontalContainer style={{ justifyContent: 'stretch', marginTop: '2rem' }}>
                    <legend>Change Password</legend>
                </Styled.HorizontalContainer>
                <Styled.HorizontalContainer style={{ justifyContent: 'stretch', marginTop: '1rem' }}>
                    <Styled.FormColumn style={{ "width": "100%" }}>
                        <label>Old Password</label>
                        <Styled.FormField>
                            <Input type="password" name="old_password" id="oldPwd" placeholder="Old Password" onChange={(e) => form.oldPassword = e.target.value} />
                        </Styled.FormField>
                    </Styled.FormColumn>
                </Styled.HorizontalContainer>
                <Styled.HorizontalContainer style={{ justifyContent: 'stretch', marginTop: '1rem' }}>
                    <Styled.FormColumn style={{ "width": "100%" }}>
                        <label>New Password</label>
                        <Styled.FormField style={{ marginRight: '50px' }}>
                            <Input type="password" name="new_password" id="newPwd" placeholder="New Password" onChange={(e) => form.newPassword1 = e.target.value} />
                        </Styled.FormField>
                    </Styled.FormColumn>
                    <Styled.FormColumn style={{ "width": "100%" }}>
                        <label>Confirm New Password</label>
                        <Styled.FormField >
                            <Input type="password" name="new_password" id="newPwd2" placeholder="Confirm New Password" onChange={(e) => form.newPassword2 = e.target.value} />
                        </Styled.FormField>
                    </Styled.FormColumn>
                </Styled.HorizontalContainer>
                <Styled.HorizontalContainer
                    style={{ marginTop: '5rem', marginBottom: '1rem', justifyContent: 'flex-end' }}
                >
                    <Styled.Button type="button" onClick={() => {
                        if (form.oldPassword != '' || form.newPassword1 != '' || form.newPassword2 != '') {
                            if (form.newPassword1 != form.newPassword2) {
                                alert("The new passwords entered do not match");
                            } else {
                                alert("Profile information successfully updated");
                            }
                        } else {
                            alert("Profile information successfully updated");
                        }
                        // alert(JSON.stringify(form));
                    }}>
                        <span style={{ color: '#f79a0d' }}>Submit</span>
                        {/* <Link to="/"> Submit </Link> */}
                    </Styled.Button>
                </Styled.HorizontalContainer>
            </Form>
        </Styled.Container>
    )
}

export default EditProfile;