/**
 * Form input for a factory node.
 * @since 4/10/18
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Callout,
  NumericInput,
  Intent,
} from '@blueprintjs/core';

import { MAX_ALLOWED_FACTORY_CHILD_NODES } from '../../../../constants';

/**
 * The input form for a factory Node.
 * @extends {React.Component}
 * @class FactoryForm
 */
export default class FactoryForm extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
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
   * on the number node generation form.
   * @memberof FactoryForm
   */
  handleNumericChangeForStateKey = (key, value) => {
    const { min, max, count } = { ...this.state, [key]: value };
    this.setState(state => ({ ...state, [key]: value }));

    const minIsNumeric = _.isNumber(min);
    const maxIsNumeric = _.isNumber(max);
    const countIsNumeric = _.isNumber(count);

    // Validate all of the relevant input cases.
    if (min < 0) return this.setState({ error: 'The mimumum number value must be at least zero.' });
    if (max < 0) return this.setState({ error: 'The maximum number value must be at least zero.' });

    if (minIsNumeric && maxIsNumeric && min > max) {
      return this.setState({ error: 'The mimimum value cannot exceed the max.' });
    }

    if (countIsNumeric && (count < 1 || count > MAX_ALLOWED_FACTORY_CHILD_NODES)) {
      return this.setState({
        error: `The number of nodes to generate must be between 1 and ${MAX_ALLOWED_FACTORY_CHILD_NODES}`,
      });
    }

    return this.setState(state => ({
      ...state,
      [key]: _.clamp(value, 0, Number.MAX_SAFE_INTEGER),
      error: !(minIsNumeric && maxIsNumeric && countIsNumeric),
    }));
  }

  /**
   * Handles the form submission of new number nodes.
   * @memberof FactoryForm
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof FactoryForm
   */
  render() {
    return (
      <form onSubmit={this.state.error ? _.noop : this.handleSubmit}>
        <h5>
          Generate some random numbers for factory&nbsp;
          <span className="text-primary text-capitalize">{this.props.value}</span>
        </h5>
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
          icon="add"
          type="submit"
          text="Generate Numbers"
          intent={Intent.PRIMARY}
          disabled={Boolean(this.state.error)}
        />
        {
          _.isString(this.state.error) && (
            <Callout
              intent={Intent.DANGER}
              title="Oops..."
              icon="warning-sign"
              className="margin-top-5"
            >
              {this.state.error}
            </Callout>
          )
        }
      </form>
    );
  }
}
