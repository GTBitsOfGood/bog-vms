/**
 * A menu that allows users to select and submit times they're signing up for in
 * select intervals
 */

import React from 'react';

import { Button } from 'reactstrap';
import { Form, Checkbox } from '../Forms';
import moment from 'moment';
import styled from 'styled-components';
import { useState } from 'react';

// TODO: Replace colors w/ theme colors (i.e. not hardcoded values)
// TODO: Only show undo if there are changes made
// TODO: Implement tabs for multiple days
// TODO: Find better format ISO array for submitting selected times

const Styled = {
    TimeSlotMenuContainer: styled.div `
        display: flex;
        flex-direction: column;
        padding: 0.5em;
        background: white;
        color: black;
        border: solid 1px #c4c4c4;
        border-radius: 2px;
    `,

    TimeSlotsContainer: styled.div `
        display: flex;

        /*Add borders to separate timeslot groups after the 1st one*/
        & > div + div {
            border-left: 1px solid black;
        }

        /*TODO: Avoid hardcoding this? */
        /*Switch to single-column on small screens*/
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
        min-width: 13em;

        & label {
            margin: 0;
        }
    `,

    ButtonContainer: styled.div `
        padding: 0.5em 1em;
        display: flex;
    `,

    Button: styled(Button) `
        margin: 5px;
        padding: 0.5em 1em;
        width: 5em;
        color: white;
        background: #f68c4a;
        border-radius: 10px;

        &.btn.disabled {
            opacity: 1.0;
        }

        &.btn-secondary.disabled {
            color: #565656;
            background: #c4c4c4;
        }
    `,

    Checkbox: styled(Checkbox)`
        .form-check {
            padding-left: 0;
        }
    `

};

/**
 * Given a JS Date object, copies it and returns a Moment.js copy of it rounded
 * BACK to the nearest 30 minute interval (e.g. 4:17 becomes 4:00)
 */
function roundTimeBackToHalfHour(dateTime) {
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
    const roundedStartTime = roundTimeBackToHalfHour(startTime);
    const slotTimes = [];

    for (let currentTime = roundedStartTime; currentTime.isBefore(endTime); currentTime.add(30, 'minutes')) {
        slotTimes.push(currentTime.clone());
    }
    // Missing last interval, so add it manually
    // TODO: Avoid this extra step if possible?
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
        const startTime = timeSlotTimes[i];
        const endTime = timeSlotTimes[i+1];

        const isChecked = (startTime.toISOString() in selectedTimes
            && selectedTimes[startTime.toISOString()]);

        timeSlotElements.push (
            <TimeSlot
                startTime={startTime}
                endTime={endTime}
                isChecked={isChecked}
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

/**
 * Returns an array of ISO strings for the currently selected times (as given
 * in object-form)
 */
function getSelectedTimes(selectedTimes) {
    const timesArray = []
    Object.entries(selectedTimes).forEach(([time, isChecked]) => {
        if (isChecked) {
            timesArray.push(time);
        }
    });
    return timesArray;
}

// TODO: Consider making this its own component?
function TimeSlot({startTime, endTime, isChecked}) {
    // TODO: Use styled checkboxes
    startTime = moment(startTime);
    endTime = moment(endTime);
    const timeSlotText = `${startTime.format('LT')} - ${endTime.format('LT')}`;
    const timeSlotName = `${startTime.toISOString()}`;

    return (
        <Styled.TimeSlot>
            <Styled.Checkbox
                small
                key={timeSlotName}
                name={timeSlotName}
                value={isChecked}
            />
            <label htmlFor={timeSlotName}>{timeSlotText}</label>
        </Styled.TimeSlot>
    );
}


// TODO: Assumes selectedTimes should contain the STARTING time of each slot
// already signed up for, stored as an ISO string or JS date
// NOTE: onSubmit should be a callback function taking 1 argument: an array of
// ISO strings saying what times have been selected
function TimeSlotMenu({startDateTime, endDateTime, onSubmit, selectedTimes=[]}) {
    // Map each time and set it to be checked by default
    const selectedTimesObj = selectedTimes.reduce(
        (object, time) => object[moment(time).toISOString()] = true, {}
    );
    const oldSelectedTimes = {...selectedTimesObj};

    // Track if the user has made any changes
    const [hasSelectionChanged, setHasSelectionChanged] = useState(false);

    // Generate times for timeSlot intervals
    const timeSlotTimes = createTimeSlotTimes(startDateTime, endDateTime);
    const timeSlotElements = createTimeSlotElements(timeSlotTimes, selectedTimesObj);

    // Split the timeSlots into groups of 5
    const timeSlotGroupElements = groupTimeSlots(timeSlotElements, 5);

    return (
       <Form
            initialValues={oldSelectedTimes}

            // NOTE: Validate used only to update state, not for actual validation
            validate={() => setHasSelectionChanged(true)}
            validateOnChange={true}
            onReset={(values, {resetForm}) => {
                setHasSelectionChanged(false);
                resetForm();    // Formik's built-in reset method
            }}

            onSubmit={(values, {setSubmitting}) => {
                onSubmit(getSelectedTimes(values));
                // Tell Formik we're done submitting
                setSubmitting(false);
            }}>
            <Styled.TimeSlotMenuContainer>
                <Styled.TimeSlotsContainer>
                    {timeSlotGroupElements}
                </Styled.TimeSlotsContainer>

                <Styled.ButtonContainer>
                    <Styled.Button
                        disabled={!hasSelectionChanged}
                        type="submit">
                        Done
                    </Styled.Button>
                    <Styled.Button
                        disabled={!hasSelectionChanged}
                        type="reset">
                        Undo
                    </Styled.Button>
                </Styled.ButtonContainer>
            </Styled.TimeSlotMenuContainer>
        </Form>
    );
}

export default TimeSlotMenu;
