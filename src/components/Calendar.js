import React from 'react';
import Calendar from 'react-calendar';
import './Styles.scss';
import 'react-calendar/dist/Calendar.css';

class CalendarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }
    onChange = date => {
        this.setState({
            date
        });
    }
    render() {
        return (
            <div>
                <Calendar onChange={this.onChange} value={this.state.date} className='calendar' />
            </div>
        );
    }
}

export default CalendarComp;