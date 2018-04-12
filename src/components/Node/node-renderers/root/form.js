import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

/**
 * The form for root nodes.
 * Allows the user to create factory nodes.
 * @class RootForm
 * @extends {React.Component}
 */
export default class RootForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    value: '',
    error: null,
  }

  /**
   * Handles when the root form input to add new factory nodes is updated.
   * @memberof RootForm
   */
  handleTextChange = (e) => {
    this.setState({ name: e.target.value });
  }

  /**
   * Handles form submission.
   * @memberof RootForm
   */
  handleSubmit = () => {
    this.props.onSubmit(this.state);
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof Node
   */
  render() {
    return (
      <div>
        <input
          className="pt-input"
          placeholder="Factory Node Name"
          onChange={this.handleTextChange}
        />
        <Button
          text="Create Factory Node"
          disabled={Boolean(this.state.error)}
          onClick={this.state.error ? _.noop : this.handleSubmit}
        />
        {
          this.state.error && <div className="form-error-text">{this.state.error}</div>
        }
      </div>
    );
  }
}
