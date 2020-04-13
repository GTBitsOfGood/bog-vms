import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import * as SForm from '../shared/formStyles';
import PropTypes from 'prop-types';
import { eventValidator } from './eventHelpers';
import { createEvent } from '../queries';
import { Icon } from 'components/Shared';
import moment from 'moment';

const Styled = {
    Button: styled(Button)`
        position: absolute;
        align-self: flex-end;
        background: none;
        border: none;
        opacity: 1.0;
    `,

    Container: styled.div`
        background: #f6f6f6;
        margin-bottom: 2rem;
        padding: 2rem;
        width: 100%;
        height: 100%;
    `,

    EventContainer: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2em;
        padding: 2em;
        background: white;
        border-radius: 0.4rem;
    `,

    FlexColumn: styled.div`
        display: flex;
        flex-direction: column;
        margin-right: 1em;
    `,

    FlexRow: styled.div`
        display: flex;
        margin-bottom: 1em;
    `,

    h5: styled.h5`
        color: #969696
    `,

    h6: styled.h6`
        color: #969696
    `
};

function IconHeading({ iconName, headerText, subHeaderText }) {
    return (
        <Styled.FlexRow>
            {iconName &&
                <Icon color="grey3" name={iconName} />
            }
            <div>
                <h4>{headerText}</h4>
                <Styled.h6>{subHeaderText}</Styled.h6>
            </div>
        </Styled.FlexRow>
    );
}

function EventDetails(props) {
    const event = props.event || props.location.state.event;

    if (!event) {
        // If no event found, render nothing
        return (
            <div>
                <h1>No details found for this event</h1>
                <Link to='/events'>Back</Link>
            </div>
        );
    }

    const eventDate = new Date(event.date);
    const dateDisplayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeDisplayOptions = { timeStyle: 'short' }

    return (
        // TODO: Style ALL of this
        <Styled.Container>
            <Styled.EventContainer>
                <Styled.FlexColumn>
                    <Link to='/events'>
                        <Icon color="grey" name="left-chevron" /> Back
                    </Link>

                    <Styled.FlexRow>
                        <Styled.FlexColumn>
                            <Styled.FlexRow>
                                <Styled.FlexColumn>
                                    {/* <div>Date here</div> */}
                                    <h3>{event.name}</h3>
                                    <Styled.h5>{eventDate.toLocaleDateString(undefined, dateDisplayOptions)}</Styled.h5>
                                </Styled.FlexColumn>
                            </Styled.FlexRow>
                            <IconHeading
                                iconName="date"
                                headerText={eventDate.toLocaleTimeString(undefined, timeDisplayOptions) + ' to ???'}
                                // subHeaderText={returnTimeFromNowString(eventDate)}/>
                                subHeaderText={moment(eventDate, "YYYYMMDD").fromNow()} />
                            <IconHeading
                                iconName="location"
                                headerText={event.location}
                                subHeaderText="??? Street" />
                            <Styled.FlexRow>
                                <Button>Save</Button>
                                <Button>Sign Up</Button>
                            </Styled.FlexRow>
                        </Styled.FlexColumn>
                        <div>Image here</div>
                    </Styled.FlexRow>
                </Styled.FlexColumn>
            </Styled.EventContainer>
            <div>
                <h3>Details</h3>
                <p>{event.description}</p>
            </div>
        </Styled.Container>
    );

}


export default EventDetails;
