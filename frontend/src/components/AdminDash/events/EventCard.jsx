import React from 'react';
import { Link } from 'react-router-dom';
import * as Card from '../shared/cardStyles';
import { Icon } from 'components/Shared';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const Styled = {
    Button: styled(Button)`
        position: absolute;
        align-self: flex-end;
        background: none;
        border: none;
        opacity: 1.0;
    `
};

function EventCard({event, imgUrl, onDeleteClicked, onDetailClicked}) {
    const eventDate = new Date(event.date);
    return <Card.Card>
        <Card.cardContainer>
            <Styled.Button onClick={() => onDeleteClicked(event)} close aria-label="Delete Event">
                <Icon name="delete" color="grey9" />
            </Styled.Button>
            <Link to={{
                pathname: `/events/${event._id}`,
                state: {
                    event: event
                }
            }}>
                <Card.imgPlaceholder src={imgUrl}/>
            </Link>
            <Card.cardText>
                <h4>{event.name}</h4>
                <p>{eventDate.toLocaleDateString()}</p>
            </Card.cardText>
        </Card.cardContainer>
    </Card.Card>
}


export default EventCard;
