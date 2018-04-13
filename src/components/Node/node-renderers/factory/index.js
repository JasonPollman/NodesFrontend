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
} from '../../../../constants';

const generateRandomNodes = (parent, { min, max, count }) => (
  _.times(count, () => ({ type: NODE_TYPES.NUMBER, value: _.random(min, max), parent }))
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
    isHovering: false,
    popoverIsOpen: false,
    popoverShouldOpen: undefined,
  }

  /**
   * Handles when a user changes the factory node's name (value).
   * @memberof FactoryNode
   */
  handleFactoryNameChange = (value) => {
    if (value === this.props.value) return;
    const { id } = this.props;
    websockets.emit(SOCKET_EVENTS.UPSERT_NODES, [{ id, value }]);
  }

  /**
   * Handles when a user hovers over the factory node.
   * @memberof FactoryNode
   */
  handleNodeHover = () => {
    this.setState(state => ({ ...state, isHovering: !state.isHovering }));
  }

  /**
   * When the form to generate new number nodes is submitted,
   * this will delete all of the existing nodes and upsert the new ones.
   * @memberof FactoryNode
   */
  handleFactoryFormSubmit = (formValues) => {
    this.setState({ popoverShouldOpen: false });
    websockets.emit(SOCKET_EVENTS.COMPOSITE_ACTION, [
      {
        event: SOCKET_EVENTS.DELETE_NODES,
        args: [this.props.childNodes],
      },
      {
        event: SOCKET_EVENTS.UPSERT_NODES,
        args: [generateRandomNodes(this.props.id, formValues)],
      },
    ]);
  }

  /**
   * Handles the removal of a factory node.
   * @memberof FactoryNode
   */
  handleFactoryRemoval = () => {
    websockets.emit(SOCKET_EVENTS.DELETE_NODES, [{ id: this.props.id }]);
  }

  /**
   * Tells this component that the popover is open.
   * @memberof FactoryNode
   */
  handlePopoverOpen = () => this.setState({ popoverIsOpen: true })

  /**
   * Tells this component that the popover is closed.
   * @memberof FactoryNode
   */
  handlePopoverClose = () => this.setState({
    popoverIsOpen: false,
    popoverShouldOpen: undefined,
  })

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof FactoryNode
   */
  render() {
    const { isHovering, popoverShouldOpen, popoverIsOpen } = this.state;
    const { type, value, children } = this.props;

    return (
      <div
        className={`node node-type-${type}`}
        onMouseEnter={this.handleNodeHover}
        onMouseLeave={this.handleNodeHover}
      >
        <div className="display-inline-block">
          <div className="display-inline-block">
            <EditableText
              minWidth={20}
              selectAllOnFocus
              defaultValue={value}
              placeholder="Anonymous Factory Node"
              className="pt-intent-primary text-bold text-capitalize"
              onConfirm={this.handleFactoryNameChange}
            />
          </div>
        </div>
        {
          (isHovering || popoverIsOpen) && (
            <div className="cursor-pointer display-inline-block margin-left-10">
              <FormPopover
                {...this.props}
                Form={FactoryForm}
                isOpen={popoverShouldOpen}
                onSubmit={this.handleFactoryFormSubmit}
                popoverDidOpen={this.handlePopoverOpen}
                popoverWillClose={this.handlePopoverClose}
              />
              <span className="text-muted pt-icon-remove" onClick={this.handleFactoryRemoval} />
            </div>
          )
        }
        <div className="node-children">
          {children}
        </div>
      </div>
    );
  }
}
