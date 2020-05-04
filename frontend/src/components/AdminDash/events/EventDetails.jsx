import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import * as SForm from '../shared/formStyles';
import PropTypes from 'prop-types';
import { eventValidator } from './eventHelpers';
import { createEvent } from '../queries';
import { Icon } from 'components/Shared';
import image from '../../../images/volunteering.jpg';
import moment from 'moment';

const Styled = {
    SaveButton: styled(Button)`
        border-style: solid;
        border-color: #969696;
        border-width: 1.5px 0 1.5px 1.5px;
        border-radius: 0px;
        padding: 0.5em 2em 0.5em 2em;
    `,

    SignUpButton: styled(Button)`
        background: #f79a0d;
        border: 1.5px solid #969696;
        border-radius: 0px;
        color: white;
        padding: 0.5em 2em 0.5em 2em;
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
        flex-direction: column;
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
        margin-right: 3em;
    `,

    FlexRow: styled.div`
        display: flex;
        margin-bottom: 1.5em;
    `,

    h5: styled.h5`
        color: #969696;
    `,

    h6: styled.h6`
        color: #969696;
    `,

    imgContainer: styled.div`
        max-width: 350px;
        max-height: 300px;
        border-radius: 10px;
        overflow: hidden;
    `,

    details: styled.div`
        text-align: left;
    `
};

function IconHeading({ iconName, headerText, subHeaderText }) {
    return (
        <Styled.FlexRow>
            {iconName &&
                <FontAwesomeIcon icon={iconName} size="lg" color="#969696" />
            }
            <div style={{ marginLeft: "1.5em" }}>
                <h5>{headerText}</h5>
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
                <Styled.FlexRow>
                    <Styled.FlexColumn>
                        <Link to='/events' style={{marginBottom:"1em"}}>
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
                                    iconName={faMapMarkerAlt}
                                    headerText={eventDate.toLocaleTimeString(undefined, timeDisplayOptions) + ' to ???'}
                                    // subHeaderText={returnTimeFromNowString(eventDate)}/>
                                    subHeaderText={moment(eventDate, "YYYYMMDD").fromNow()} />
                                <IconHeading
                                    iconName={faClock}
                                    headerText={event.location}
                                    subHeaderText="??? Street" />
                                <Styled.FlexRow>
                                    <Styled.SaveButton>Save</Styled.SaveButton>
                                    <Styled.SignUpButton>Sign Up</Styled.SignUpButton>
                                </Styled.FlexRow>
                            </Styled.FlexColumn>
                            <Styled.imgContainer><img src={image} style={{ height: "310px" }}></img></Styled.imgContainer>
                        </Styled.FlexRow>
                    </Styled.FlexColumn>
                </Styled.FlexRow>
                <hr />
                <Styled.details>
                    <h3>Details</h3>
                    <p>{event.description}</p>
                </Styled.details>
            </Styled.EventContainer>
        </Styled.Container>
    );

}


export default EventDetails;
