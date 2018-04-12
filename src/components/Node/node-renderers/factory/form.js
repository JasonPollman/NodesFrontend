/**
 * Form input for a factory node.
 * @since 4/10/18
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  NumericInput,
} from '@blueprintjs/core';

/**
 * The input form for a factory Node.
 * @extends {React.Component}
 * @class FactoryForm
 */
export default class FactoryForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    min: null,
    max: null,
    count: null,
    error: true,
  }

  /**
   * Handles when a user changes one of the numeric inputs
   * on the leaf node generation form.
   * @memberof FactoryForm
   */
  handleNumericChangeForStateKey = (key, value) => {
    const { min, max, count } = { ...this.state, [key]: value };
    this.setState(state => ({ ...state, [key]: value }));

    if (min && min > max) {
      return this.setState({
        error: 'The mimimum value cannot exceed the maximum node value',
      });
    }

    if (min < 0) {
      return this.setState({
        error: 'The mimumum node value must be at least zero.',
      });
    }

    if (max < 0) {
      return this.setState({
        error: 'The mimumum node value must be at least zero.',
      });
    }

    if (count < 1 || count > 1000) {
      return this.setState({
        error: 'The number of nodes to generate must be between 1 and 100',
      });
    }

    return this.setState(state => ({
      ...state,
      [key]: _.clamp(value, 0, Number.MAX_SAFE_INTEGER),
      error: !(Boolean(min) && Boolean(max)),
    }));
  }

  /**
   * Handles the form submission of new lead nodes.
   * @memberof FactoryForm
   */
  handleSubmit = () => {
    this.props.onSubmit(this.state);
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof FactoryForm
   */
  render() {
    return (
      <div>
        <NumericInput
          min={0}
          max={1000000}
          value={this.state.min}
          placeholder="Minimum Value"
          onValueChange={_.partial(this.handleNumericChangeForStateKey, 'min')}
        />
        <NumericInput
          min={0}
          max={1000000}
          value={this.state.max}
          placeholder="Maximum Value"
          onValueChange={_.partial(this.handleNumericChangeForStateKey, 'max')}
        />
        <NumericInput
          min={1}
          max={100}
          value={this.state.count}
          placeholder="Nodes to Generate"
          onValueChange={_.partial(this.handleNumericChangeForStateKey, 'count')}
        />
        <Button
          text="Generate Numbers"
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
