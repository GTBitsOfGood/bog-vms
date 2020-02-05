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
            <Card.imgPlaceholder>

            </Card.imgPlaceholder>
            <Card.cardText>
            
            </Card.cardText>
        </Card.cardContainer>
    </Card.Card>
}


export default EventCard;
