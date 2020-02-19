import React from 'react';
import { roles, statuses } from '../applicantInfoHelpers';
import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';
import Loading from '../../Shared/Loading';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Table from '../shared/tableStyles';
import * as Form from '../shared/formStyles';
import Icon from 'components/Shared/Icon';

const Styled = {
  Container: styled.div`
    width: 100%;
    padding: 1rem;
  `,
  Icon: styled(Icon)`
    user-select: none;

    // Correct visual size of icons
    transform: ${props => (props.isRemove ? 'scale(0.84)' : 'none')};

    // Hover style
    opacity: 0.7;
    transition: 0.25s opacity ease;

    &:hover {
      opacity: 1;
    }

    &:active {
      transform: ${props => (props.isRemove ? 'translateY(1px) scale(0.84)' : 'translateY(1px)')};
    }
  `
};

const keyToValue = key => {
  key = key.replace(/_/g, ' ');
  key = key
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  return key;
};

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectedForEdit: null
    };
  }

  onDisplayEditUserModal = userToEdit => {
    console.log(userToEdit);
    this.setState({
      userSelectedForEdit: userToEdit
    });
  };

  onModalClose = updatedUser => {
    if (updatedUser) {
      this.props.editUserCallback(updatedUser);
    }
    this.setState({
      userSelectedForEdit: null
    });
  };

  render() {
    const { users, loading, onUserToggle } = this.props;
    return (
      <Styled.Container>
        <Table.Table>
          <tbody>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {!loading &&
              users.map((user, index) => (
                <Table.Row key={index} evenIndex={index % 2 === 0}>
                  <td style={{ padding: '0.5rem' }}>
                    <Styled.Icon
                      isRemove={user.inMailingList}
                      name={user.inMailingList ? 'remove' : 'add'}
                      color="grey3"
                      size="2.5rem"
                      onClick={onUserToggle(index)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </Table.Row>
              ))}
          </tbody>
        </Table.Table>
        {loading && <Loading />}
        <Modal isOpen={this.state.userSelectedForEdit} onClose={null}>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <form>
              <Form.FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Input
                  defaultValue={
                    this.state.userSelectedForEdit ? this.state.userSelectedForEdit.name : ''
                  }
                  type="text"
                  name="Name"
                />
                <Form.Label>Email</Form.Label>
                <Form.Input
                  defaultValue={
                    this.state.userSelectedForEdit ? this.state.userSelectedForEdit.email : ''
                  }
                  type="text"
                  name="Email"
                />
                <Form.Label>Role</Form.Label>
                <Form.Dropdown
                  defaultValue={
                    this.state.userSelectedForEdit ? this.state.userSelectedForEdit.role : ''
                  }
                  type="select"
                  name="roleSelected"
                >
                  {Object.keys(roles).map((t, i) => (
                    <option key={t + i} value={t}>
                      {keyToValue(t)}
                    </option>
                  ))}
                </Form.Dropdown>
                <Form.Label>Status</Form.Label>
                <Form.Dropdown
                  defaultValue={
                    this.state.userSelectedForEdit ? this.state.userSelectedForEdit.status : ''
                  }
                  type="select"
                  name="statusSelected"
                >
                  {Object.keys(statuses).map((t, i) => (
                    <option key={t + i} value={t}>
                      {keyToValue(t)}
                    </option>
                  ))}
                </Form.Dropdown>
              </Form.FormGroup>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.onModalClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.onModalClose}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </Styled.Container>
    );
  }
}

export default UserTable;

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onUserToggle: PropTypes.func.isRequired
};
