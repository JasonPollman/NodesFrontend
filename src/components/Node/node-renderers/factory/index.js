/**
 * Renders a factory node.
 * @since 4/10/18
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { EditableText } from '@blueprintjs/core';

import FactoryForm from './form';
import websockets from '../../../../websockets';
import { FormPopover } from '../utils';

import {
  NODE_TYPES,
  SOCKET_EVENTS,
  SOCKET_SUMMARIES,
} from '../../../../constants';

const generateRandomNodes = (parent, { min, max, count }) => (
  _.times(count, () => ({ type: NODE_TYPES.NUMBER.type, value: _.random(min, max), parent }))
);

/**
 * Renders a factory node type.
 * @extends {React.Component}
 * @class FactoryNode
 */
export default class FactoryNode extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    childNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    popoverShouldOpen: undefined,
  }

  /**
   * Handles when a user changes the factory node's name (value).
   * @memberof FactoryNode
   */
  handleFactoryNameChange = (value) => {
    if (_.toLower(value) === _.toLower(this.props.value)) return;
    const { id } = this.props;

    websockets.emit(
      SOCKET_EVENTS.UPSERT_NODES,
      [{ id, value }],
      SOCKET_SUMMARIES.factoryNameUpdated(this.props.value, value),
    );
  }

  /**
   * When the form to generate new number nodes is submitted,
   * this will emit a socket event to delete all of the existing
   * nodes and upsert the new ones.
   * @memberof FactoryNode
   */
  handleFactoryFormSubmit = (formValues) => {
    const { id, value, childNodes } = this.props;
    const generatedFactoryNodes = generateRandomNodes(id, formValues);
    this.setState({ popoverShouldOpen: false });

    websockets.emit(
      SOCKET_EVENTS.COMPOSITE_ACTION,
      [
        {
          event: SOCKET_EVENTS.DELETE_NODES,
          args: [childNodes],
        },
        {
          event: SOCKET_EVENTS.UPSERT_NODES,
          args: [generatedFactoryNodes],
        },
      ],
      SOCKET_SUMMARIES.factoryGeneratedNewNumbers(
        value,
        childNodes.length,
        generatedFactoryNodes.length,
      ),
    );
  }

  /**
   * Handles the removal of a factory node.
   * @memberof FactoryNode
   */
  handleFactoryRemoval = () => {
    websockets.emit(
      SOCKET_EVENTS.DELETE_NODES,
      [{ id: this.props.id }],
      SOCKET_SUMMARIES.factoryRemoved(this.props.value),
    );
  }

  /**
   * Tells this component that the popover is closed.
   * We use `popoverShouldOpen` to manually close the
   * popover once the form has been submitted.
   * @memberof FactoryNode
   */
  handlePopoverClose = () => this.setState({
    popoverShouldOpen: undefined,
  })

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof FactoryNode
   */
  render() {
    const { popoverShouldOpen } = this.state;
    const { type, value, children } = this.props;

    return (
      <div
        className={`node node-type-${type} font-size-16`}
        onMouseEnter={this.handleNodeHover}
        onMouseLeave={this.handleNodeHover}
      >
        <div className="display-inline-block">
          <div className="cursor-pointer display-inline-block margin-left-5">
            <FormPopover
              {...this.props}
              Form={FactoryForm}
              isOpen={popoverShouldOpen}
              onSubmit={this.handleFactoryFormSubmit}
              popoverWillClose={this.handlePopoverClose}
            />
            <span
              className="text-muted pt-icon-remove margin-right-5 font-size-11 top--2 position-relative"
              onClick={this.handleFactoryRemoval}
            />
          </div>
          <div className="display-inline-block">
            <EditableText
              minWidth={20}
              selectAllOnFocus
              defaultValue={value}
              placeholder="Unnamed Factory"
              className="pt-intent-primary text-bold text-capitalize"
              onConfirm={this.handleFactoryNameChange}
            />
          </div>
        </div>
        <div className="margin-15">
          {children}
        </div>
      </div>
    );
  }
}
