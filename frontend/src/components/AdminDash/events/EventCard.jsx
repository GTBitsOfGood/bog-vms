import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Card from '../shared/cardStyles';
import Loading from 'components/Shared/Loading';
import { Icon } from 'components/Shared';
import styled from 'styled-components';
import { Button } from 'reactstrap';

function EventCard(props) {
    return <Card.Card>
        <Card.cardContainer>
            <Card.imgPlaceholder src = {props.imgUrl} />
            <Card.cardText>
                <h4>{props.eventTitle}</h4>
                <p>{props.eventDate}</p>            
            </Card.cardText>
        </Card.cardContainer>
    </Card.Card>
}


export default EventCard;
