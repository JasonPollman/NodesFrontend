/**
 * Form input for a root node.
 * @since 4/10/18
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Intent } from '@blueprintjs/core';

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
    disableSubmitButton: true,
  }

  /**
   * Handles when the root form input to add a new factory nodes is updated.
   * @memberof RootForm
   */
  handleFactoryNameInputChange = (e) => {
    this.setState({
      name: e.target.value,
      disableSubmitButton: e.target.value.length === 0,
    });
  }

  /**
   * Handles the factory node creation form submission.
   * @memberof RootForm
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof RootForm
   */
  render() {
    return (
      <form onSubmit={this.state.disableSubmitButton ? _.noop : this.handleSubmit}>
        <h5>Create a new number factory</h5>
        <input
          className="full-width pt-input pt-intent-success"
          placeholder="Enter a factory name"
          onChange={this.handleFactoryNameInputChange}
        />
        <br />
        <Button
          text="Create"
          type="submit"
          intent={Intent.SUCCESS}
          className="full-width"
          disabled={Boolean(this.state.disableSubmitButton)}
        />
      </form>
    );
  }
}
