import React from 'react';
import styled from 'styled-components';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import * as SForm from '../shared/formStyles';
import PropTypes from 'prop-types';
import { eventValidator } from './eventHelpers';
import { createEvent } from '../queries';

const Styled = {
    Button: styled(Button)`
        position: absolute;
        align-self: flex-end;
        background: none;
        border: none;
        opacity: 1.0;
    `,

    EventHeader: styled.div`
        display: flex;
    `,

    EventInfoHeader: styled.div`
    `,

    EventImage: styled.img`

    `,

    EventDate: styled.h3`

    `
};

function EventDetailModal({open, event}) {
    const eventDate = new Date(event.date);
    const dateDisplayOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return (
        <Modal isOpen={open} backdrop="static">
            <ModalBody>
                <Styled.EventHeader>
                    <Styled.EventInfoHeader>
                        <h2>{event.name}</h2>
                        <h4>{eventDate.toLocaleDateString(undefined, dateDisplayOptions)}</h4>
                    </Styled.EventInfoHeader>
                </Styled.EventHeader>
                
            </ModalBody>
            <Styled.Button></Styled.Button>
        </Modal>
    )

}


  export default EventDetailModal;