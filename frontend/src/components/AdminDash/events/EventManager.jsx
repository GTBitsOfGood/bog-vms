import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Icon } from 'components/Shared';
import EventTable from './EventTable';
import { fetchEvents } from 'components/AdminDash/queries';
import EventCreateModal from './EventCreateModal';
import EventEditModal from './EventEditModal';
import EventDeleteModal from './EventDeleteModal';
import EventDetails from './EventDetails';
import * as Table from '../shared/tableStyles';
import EventCardGrid from './EventCardGrid';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.grey9};
    padding: 1rem 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
  `,
  HeaderContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,
  Button: styled(Button)`
    background: white;
    border: none;
  `
};

// TODO: Possibly move this into a separate file?
const EventPageManager = () => {
  return(
    <Switch>
      <Route exact path='/events' component={EventManager} />
      <Route path='/events/:eventid' component={EventDetails} />
    </Switch>
  );
}

const EventManager = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    fetchEvents()
      .then(result => {
        if (result && result.data && result.data.events) {
          setEvents(result.data.events);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCreateClicked = () => {
    setShowCreateModal(true);
  };

  const toggleCreateModal = () => {
    setShowCreateModal(prev => !prev);
    onRefresh();
  };
  useEffect(() => {
    onRefresh();
  }, []);

  const [showDetailModal, setshowDetailModal] = useState(false);
  const [currEvent, setCurrEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDetailClicked = event => {
    setshowDetailModal(true);
    setCurrEvent(event);
  };
  const toggleDetailModal = () => {
    setshowDetailModal(prev => !prev);
    onRefresh();
  };
  const onDeleteClicked = event => {
    setShowDeleteModal(true);
    setCurrEvent(event);
  };
  const toggleDeleteModal = () => {
    setShowDeleteModal(prev => !prev);
    onRefresh();
  };

  const compareDates = (event1, event2) => {
    const date1 = new Date(event1.date);
    const date2 = new Date(event2.date);

    if(date1 == date2) {
      return 0;
    }

    if(date1 > date2){
      return 1;
    }

    return -1;
    
  }

  const pastDate = (event) => {
    const todayDate = Date.now()
    const dateCompare = new Date(event.date)

    return dateCompare < todayDate
  }

  const currentDate = (event) => {
    const todayDate = Date.now()
    const dateCompare = new Date(event.date)

    return dateCompare >= todayDate
  }


 
  return (
    <Styled.Container>
      <Styled.HeaderContainer>
        <Styled.Button onClick={onCreateClicked}>
          <Icon color="grey3" name="add" />
          <span>Create</span>
        </Styled.Button>
        <Styled.Button onClick={onRefresh}>
          <Icon color="grey3" name="refresh" />
          <span> Refresh</span>
        </Styled.Button>
      </Styled.HeaderContainer>

      <EventCardGrid
        title="Past Events"
        events = {events.filter(pastDate)}
        loading={loading}
        onDetailClicked={onDetailClicked}
        onDeleteClicked = {onDeleteClicked}
      />

      <EventCardGrid
        title="Current Events"
        events={events.filter(currentDate)}
        loading={loading}
        onDeleteClicked={onDeleteClicked}
        onDetailClicked={onDetailClicked}
      />

      <EventCardGrid
        title="All Events"
        events={events.sort(compareDates)}
        loading={loading}
        onDeleteClicked={onDeleteClicked}
        onDetailClicked={onDetailClicked}
      />

  
      <EventCreateModal open={showCreateModal} toggle={toggleCreateModal} />
      <EventDeleteModal open={showDeleteModal} toggle={toggleDeleteModal} event={currEvent} />
    </Styled.Container>
  );
};

export {EventManager, EventPageManager};
