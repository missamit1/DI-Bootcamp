import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDay } from '../plannerSlice.js';
export default function Calendar() {
  const day = useSelector(state => state.planner.selectedDay);
  const dispatch = useDispatch();
  return <div className="date-picker"><label htmlFor="day">Choose a day</label>
    <input id="day" type="date" value={day} onChange={event => dispatch(selectDay(event.target.value))} /></div>;
}
