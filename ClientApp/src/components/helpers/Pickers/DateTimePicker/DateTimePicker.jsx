import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import './DateTimePicker.css'
import InputItem from '../../../genericComponents/formItems/InputItem';
import convertDate from '../../functions/dateConverter';

export const CustomDateTimePicker = ({ chosenDate, setDate, disabled, name }) => {
    if (disabled) {
        return (
            <InputItem classname="col" name={name} read_only={true} attribute={chosenDate ? convertDate(chosenDate) : null} />
        )
    }

    return (
        <>
            <label>
                {name}
            </label>
            <DateTimePicker
                className="col-4 w-100 form-control rounded skyfarer-date-picker"
                style={{ "height": "30px" }}
                onChange={setDate}
                value={chosenDate ? chosenDate : null}
                minDate={new Date()}
                format="dd.MM.yyyy HH:mm"
                name={name}
                disableClock={true}
                yearPlaceholder="yyyy"
                monthPlaceholder="mm"
                dayPlaceholder="dd"
                minutePlaceholder="mm"
                hourPlaceholder="hh"
                showLeadingZeros={true}
            />
        </>
    )
}
