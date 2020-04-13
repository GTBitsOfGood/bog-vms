/**
 * A menu that allows users to select and submit times they're signing up for in
 * select intervals
 */

import React from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'components/Shared';
import moment from 'moment';
import styled from 'styled-components';

// TODO: Replace colors w/ theme colors (i.e. not hardcoded values)
const Styled = {
    TimeSlotsContainer: styled.div `
        display: flex;
        padding: 0.5em;
        background: white;
        color: black;
        border: solid 1px #c4c4c4;
        border-radius: 2px;

        & > div + div {
            border-left: 1px solid black;
        }
    `,

    TimeSlotsGroup: styled.div `
        display: flex;
        flex-direction: column;
        padding: 0.5em 0;
    `,

    TimeSlot: styled.div `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em;
        min-width: 12em;
    `

};

/**
 * Given a JS Date object, copies it and returns a Moment.js copy of it rounded
 * UP to the nearest 30 minute interval (e.g. 4:17 becomes 4:00)
 */
function roundTimeUpToHalfHour(dateTime) {
    const momentTime = moment(dateTime);
    const minutes = momentTime.minutes();
    // Assuming minutes < 60, rounds down to either 0 or 30
    const roundedMinutes = Math.floor(minutes / 30) * 30;

    const roundedTime = momentTime.startOf('hour').add(roundedMinutes, 'minutes');
    return roundedTime;
}

// TODO: Implement changes to signed-up times when they're selected
// TODO: Implement done (i.e. submission) functionality
// TODO: Implement undo functionality
// TODO: Only show undo if there are changes made


// NOTE: Signed up times should contain the STARTING time of each integer we're
// already signed up for
function TimeSlotMenu({startDateTime, endDateTime, selectedTimes}) {
    // Copy sign-up times so we can revert/undo changes to them if necessary
    const oldSelectedTimes = (selectedTimes) ? [...selectedTimes] : [];
    const roundedStartTime = roundTimeUpToHalfHour(startDateTime);

    console.log(roundedStartTime);
    console.log(endDateTime);

    // Generate times for timeslot intervals
    const slotTimes = [];
    for (let currentTime = roundedStartTime; currentTime.isBefore(endDateTime); currentTime.add(30, 'minutes')) {
        slotTimes.push(currentTime.clone());
    }
    // Missing last interval, so add it manually
    // TODO: Avoid this if possible?
    slotTimes.push(slotTimes[slotTimes.length - 1].clone().add(30, 'minutes'));

    const timeslotElements = [];
    for (let i = 0; i < slotTimes.length - 1; i++) {
        // TODO: Actually handle input to/from checkboxes
        // TODO: Use styled checkboxes
        const startTime = slotTimes[i];
        const endTime = slotTimes[i+1];
        // TODO: Pre-check selected times
        const timeslotText = `${startTime.format('LT')} - ${endTime.format('LT')}`;
        const timeslotName = `${startTime.format('LT')}-${endTime.format('LT')}`;
        timeslotElements.push (
            <Styled.TimeSlot key={i}>
                <input type="checkbox" name={timeslotName}/>
                <label for={timeslotName}>{timeslotText}</label>
            </Styled.TimeSlot>
        );
    }

    // Split the timeslots into groups of 5
    const timeslotGroupElements = [];
    const slotGroupSize = 5;
    for (let i = 0; i < timeslotElements.length; i += slotGroupSize) {
        const newTimeSlots = timeslotElements.filter((element, index) => index >= i && index < i + slotGroupSize);
        timeslotGroupElements.push (
            <Styled.TimeSlotsGroup>
                {newTimeSlots}
            </Styled.TimeSlotsGroup>
        );
    }

    return (
        <Styled.TimeSlotsContainer>
            {timeslotGroupElements}
        </Styled.TimeSlotsContainer>
    );
}


export default TimeSlotMenu;
