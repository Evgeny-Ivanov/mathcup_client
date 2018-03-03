import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

const InputErrorLabel = ({ message }) => (
  message ? <Label basic color='red' pointing>{message}</Label> : null
);

InputErrorLabel.propTypes = {
  message: PropTypes.string.isRequired,
};

export default InputErrorLabel;
