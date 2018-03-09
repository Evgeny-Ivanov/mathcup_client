import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

class CustomDatePicker extends Component {
  render() {
    const { date, onChange, ...restProps } = this.props;
    return (
      <DatePicker
        {...restProps}
        selected={date}
        onChange={newDate => onChange(newDate)}
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={15}
        dateFormat='LLL'
        locale='ru'
        timeCaption='время'
      />
    );
  }
}

CustomDatePicker.propTypes = {
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomDatePicker;
