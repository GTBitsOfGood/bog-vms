import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Card from '../shared/cardStyles';
import Loading from 'components/Shared/Loading';
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

function TODO(){}

function EventCard(props) {
    return <Card.Card>
        <Card.cardContainer>
            <Styled.Button onClick={() => TODO} close aria-label="Delete Event">
                <Icon name="delete" color="grey9" />
            </Styled.Button>
            <Card.imgPlaceholder src = {props.imgUrl} />
            <Card.cardText>
                <h4>{props.eventTitle}</h4>
                <p>{props.eventDate}</p>
            </Card.cardText>
        </Card.cardContainer>
    </Card.Card>
}


export default EventCard;
