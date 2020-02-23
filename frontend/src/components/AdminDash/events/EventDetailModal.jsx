import React from 'react';
import styled from 'styled-components';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import * as SForm from '../shared/formStyles';
import PropTypes from 'prop-types';
import { eventValidator } from './eventHelpers';
import { createEvent } from '../queries';
import { Icon } from 'components/Shared';

const Styled = {
    Button: styled(Button)`
        position: absolute;
        align-self: flex-end;
        background: none;
        border: none;
        opacity: 1.0;
    `,

    Modal: styled(Modal) `
        width: 100%;
    `,

    FlexHeader: styled.div`
        display: flex;
        width: 100%;
    `,

    EventInfoHeader: styled.div`
    `,

    h5: styled.h5`
        color: #969696
    `
};

function IconHeading({iconName, headerText, subHeaderText}) {
    return (
        <Styled.FlexHeader>
            {iconName &&
                <Icon color="grey3" name={iconName} />
            }
            <div>
                <h3>{headerText}</h3>
                <Styled.h5>{subHeaderText}</Styled.h5>
            </div>
        </Styled.FlexHeader>
    );
}

// TODO: Probably already exists elsewhere, so import this instead?
function returnTimeFromNowString(date) {
    // NOTE: Does NOT take leap years, seconds, variable month lengths, etc.
    // into account
    // Also, note that this rounds DOWN, so 1 month and 13 days from now
    // will be returned as "1 months from now"
    const timeDifference = new Date(date - Date.now());

    if (timeDifference.getTime() < 0) {
        return "This already started!";
    }
    const oneMinMs = 60 * 1000;
    const oneHourMs = 60 * oneMinMs;
    if (timeDifference.getTime() < oneHourMs) {
        return `${Math.floor(timeDifference.getTime() / oneMinMs)} minutes from now`;
    }
    const oneDayMs = oneHourMs * 24;
    if (timeDifference.getTime() < oneDayMs) {
        return `${Math.floor(timeDifference.getTime() / oneHourMs)} hours from now`;
    }
    const oneWeekMs = oneDayMs * 7;
    if (timeDifference.getTime() < oneWeekMs) {
        return `${Math.floor(timeDifference.getTime() / oneDayMs)} days from now`;
    }
    const oneMonthMs = oneWeekMs * 4;
    if (timeDifference.getTime() < oneMonthMs) {
        return `${Math.floor(timeDifference.getTime() / oneWeekMs)} weeks from now`;
    }
    const oneYearMs = oneMonthMs * 12;
    if (timeDifference.getTime() < oneYearMs) {
        return `${Math.floor(timeDifference.getTime() / oneMonthMs)} months from now`;
    }

    return `${Math.floor(timeDifference.getTime() / oneYearMs)} years from now`;
}

function EventDetailModal({open, toggle, event}) {
    if (!event) {
        // If no event found, render nothing
        return <span></span>
    }

    const eventDate = new Date(event.date);
    const dateDisplayOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const timeDisplayOptions = {timeStyle: 'short'}

    return (
        <Modal isOpen={open} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>
                <Styled.FlexHeader>
                    <Styled.EventInfoHeader>
                        <IconHeading
                            headerText={event.name}
                            subHeaderText={eventDate.toLocaleDateString(undefined, dateDisplayOptions)}/>
                        <IconHeading
                            iconName="refresh"
                            headerText={eventDate.toLocaleTimeString(undefined, timeDisplayOptions) + ' to ???'}
                            subHeaderText={returnTimeFromNowString(eventDate)}/>
                        <IconHeading
                            iconName="delete"
                            headerText={event.location}
                            subHeaderText="??? Street"/>
                    </Styled.EventInfoHeader>
                </Styled.FlexHeader>
            </ModalHeader>
            <ModalBody>
            <h3>Details</h3>
            <p>
            {event.description}
            </p>
            </ModalBody>
        </Modal>
    );

}


  export default EventDetailModal;
