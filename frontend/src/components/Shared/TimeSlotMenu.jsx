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

/**
 * Given a start/ending time, generates all the half-hour interval times between
 * them (and the 30 min interval before/after to contain the start/end times)
 */
function createTimeSlotTimes(startTime, endTime) {
    const roundedStartTime = roundTimeUpToHalfHour(startTime);
    const slotTimes = [];

    for (let currentTime = roundedStartTime; currentTime.isBefore(endTime); currentTime.add(30, 'minutes')) {
        slotTimes.push(currentTime.clone());
    }
    // Missing last interval, so add it manually
    // TODO: Avoid this if possible?
    slotTimes.push(slotTimes[slotTimes.length - 1].clone().add(30, 'minutes'));

    return slotTimes;
}

/**
 * Takes an array of available times and generates the HTML elements to select
 * each time slot interval
 */
function createTimeSlotElements(timeSlotTimes, selectedTimes) {
    const timeSlotElements = [];
    for (let i = 0; i < timeSlotTimes.length - 1; i++) {
        // TODO: Actually handle input to/from checkboxes
        // TODO: Use styled checkboxes
        const startTime = timeSlotTimes[i];
        const endTime = timeSlotTimes[i+1];
        // TODO: Pre-check selected times
        const timeSlotText = `${startTime.format('LT')} - ${endTime.format('LT')}`;
        const timeSlotName = `${startTime.format('LT')}-${endTime.format('LT')}`;
        timeSlotElements.push (
            <Styled.TimeSlot key={i}>
                <input type="checkbox" name={timeSlotName}/>
                <label htmlFor={timeSlotName}>{timeSlotText}</label>
            </Styled.TimeSlot>
        );
    }

    return timeSlotElements;
}

/**
 * Puts the given time slot elements into groups of the given size
 */
function groupTimeSlots(timeSlotElements, groupSize) {
    const timeSlotGroupElements = [];
    const slotGroupSize = 5;
    for (let i = 0; i < timeSlotElements.length; i += slotGroupSize) {
        const newTimeSlots = timeSlotElements.filter((element, index) => index >= i && index < i + slotGroupSize);
        timeSlotGroupElements.push (
            <Styled.TimeSlotsGroup>
                {newTimeSlots}
            </Styled.TimeSlotsGroup>
        );
    }

    return timeSlotGroupElements;
}


// NOTE: Signed up times should contain the STARTING time of each integer we're
// already signed up for
function TimeSlotMenu({startDateTime, endDateTime, selectedTimes}) {
    // Copy sign-up times so we can revert/undo changes to them if necessary
    const oldSelectedTimes = (selectedTimes) ? [...selectedTimes] : [];

    // Generate times for timeSlot intervals
    const timeSlotTimes = createTimeSlotTimes(startDateTime, endDateTime);
    const timeSlotElements = createTimeSlotElements(timeSlotTimes, selectedTimes);

    // Split the timeSlots into groups of 5
    const timeSlotGroupElements = groupTimeSlots(timeSlotElements);

    return (
        <Styled.TimeSlotsContainer>
            {timeSlotGroupElements}
        </Styled.TimeSlotsContainer>
    );
}


export default TimeSlotMenu;
