import React from 'react';
import * as Card from '../shared/cardStyles';
import styled from 'styled-components';
import EventCard from './EventCard';

const Styled = {
    CardGridContainer: styled.div`
        width: 100%;
    `,
    CardGridHeader: styled.h2 `
     color: ${props => props.theme.primaryGrey};
    `
};


function EventCardGrid(props) {
    // Check if any events exist and were loaded
    let emptyEventsText;
    if (!props.loading && props.events.length === 0) {
        emptyEventsText = <h2>No events were found!</h2>
    }

    // Display a list of events
    return <Styled.CardGridContainer>
        <Styled.CardGridHeader>{props.title}</Styled.CardGridHeader>
        <Card.cardGrid>
            {emptyEventsText}
            {!props.loading &&
                props.events.map((event, idx) => (
                    <EventCard
                        key = {event._id}
                        event = {event}
                        imgUrl = {"https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg"}
                        onDeleteClicked = {props.onDeleteClicked}
                        onDetailClicked = {props.onDetailClicked}
                    />
                ))}
        </Card.cardGrid>
    </Styled.CardGridContainer>
}

export default EventCardGrid;
