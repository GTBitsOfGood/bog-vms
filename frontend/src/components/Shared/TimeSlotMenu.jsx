/**
 * A menu that allows users to select and submit times they're signing up for in
 * select intervals
 */

import React from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'components/Shared';
import moment from 'moment';
import styled from 'styled-components';
import { useState } from 'react';

// TODO: Replace colors w/ theme colors (i.e. not hardcoded values)
// TODO: Implement changes to signed-up times when they're selected
// TODO: Implement done (i.e. submission) functionality
// TODO: Implement undo functionality
// TODO: Only show undo if there are changes made
// TODO: Figure out format for submitting selected times

const Styled = {
    TimeSlotsContainer: styled.div `
        display: flex;
        padding: 0.5em;
        background: white;
        color: black;
        border: solid 1px #c4c4c4;
        border-radius: 2px;

        /*Add borders to separate timeslot groups after the 1st one*/
        & > div + div {
            border-left: 1px solid black;
        }

        /*TODO: Avoid hardcoding this? */
        @media (max-width: 768px) {
            flex-direction: column;

            & > div + div {
                border-left: none;
                border-top: 1px solid black;
            }
        }
    `,

    TimeSlotsGroup: styled.div `
        display: flex;
        flex-direction: column;
        margin 0.5em 0;
        padding: 0 1em;
    `,

    TimeSlot: styled.div `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5em;
        min-width: 12em;

        & label {
            margin: 0;
        }
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
function createTimeSlotElements(timeSlotTimes, selectedTimes, handleChange) {
    const timeSlotElements = [];
    for (let i = 0; i < timeSlotTimes.length - 1; i++) {
        const startTime = timeSlotTimes[i];
        const endTime = timeSlotTimes[i+1];

        const isChecked = (startTime.toISOString() in selectedTimes
            && selectedTimes[startTime.toISOString()]);

        timeSlotElements.push (
            <TimeSlot
                startTime={startTime}
                endTime={endTime}
                isChecked={isChecked}
                handleChange={handleChange}
            />
        );
    }

    return timeSlotElements;
}

/**
 * Puts the given time slot elements into groups of the given size
 */
function groupTimeSlots(timeSlotElements, groupSize) {
    const timeSlotGroupElements = [];
    for (let i = 0; i < timeSlotElements.length; i += groupSize) {
        const newTimeSlots = timeSlotElements.filter((element, index) => index >= i && index < i + groupSize);
        timeSlotGroupElements.push (
            <Styled.TimeSlotsGroup>
                {newTimeSlots}
            </Styled.TimeSlotsGroup>
        );
    }

    return timeSlotGroupElements;
}

// TODO: Consider making this its own component?
function TimeSlot({startTime, endTime, isChecked, handleChange}) {
    // TODO: Actually handle input to/from checkboxes
    // TODO: Use styled checkboxes
    // TODO: Pre-check selected times
    startTime = moment(startTime);
    endTime = moment(endTime);
    const timeSlotText = `${startTime.format('LT')} - ${endTime.format('LT')}`;
    const timeSlotName = `${startTime.toISOString()}`;

    return (
        <Styled.TimeSlot>
            <input type="checkbox" name={timeSlotName} checked={isChecked} onChange={handleChange}/>
            <label htmlFor={timeSlotName}>{timeSlotText}</label>
        </Styled.TimeSlot>
    );
}


// TODO: Assumes selectedTimes should contain the STARTING time of each slot
// already signed up for, stored as an ISO string or JS date
function TimeSlotMenu({startDateTime, endDateTime, selectedTimes=[]}) {
    // Map each time and set it to be checked by default
    selectedTimes = selectedTimes.reduce(
        (object, time) => object[moment(time).toISOString()] = true, {}
    );
    // Copy selected times in case we have to revert
    const oldSelectedTimes = {...selectedTimes};

    const [checkedTimes, setCheckedTimes] = useState(selectedTimes);
    const handleCheckbox = (event) => {
        const checkboxName = event.target.name;
        const isChecked = event.target.checked;
        setCheckedTimes({ ...checkedTimes, [checkboxName] : isChecked });
    };

    // Generate times for timeSlot intervals
    const timeSlotTimes = createTimeSlotTimes(startDateTime, endDateTime);
    const timeSlotElements = createTimeSlotElements(timeSlotTimes, checkedTimes, handleCheckbox);

    // Split the timeSlots into groups of 5
    const timeSlotGroupElements = groupTimeSlots(timeSlotElements, 5);

    return (
        <Styled.TimeSlotsContainer>
            {timeSlotGroupElements}
        </Styled.TimeSlotsContainer>
    );
}


export default TimeSlotMenu;
