/**
 * Renders a factory node.
 * @since 4/10/18
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Tag,
  EditableText,
} from '@blueprintjs/core';

import FactoryForm from './form';
import websockets from '../../../../websockets';
import { FormPopover } from '../utils';

import {
  NODE_TYPES,
  SOCKET_EVENTS,
} from '../../../../constants';

const generateRandomNodes = (parent, { min, max, count }) => (
  _.times(count, () => ({ type: NODE_TYPES.LEAF, value: _.random(min, max), parent }))
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
    hovering: false,
  }

  handleTextChange = (value) => {
    if (value === this.props.value) return;

    const { id } = this.props;
    websockets.emit(SOCKET_EVENTS.UPSERT_NODES, [{ id, value }]);
  }

  handleNodeHover = () => {
    this.setState(state => ({ ...state, hovering: !state.hovering }));
  }

  handleFormSubmit = (formValues) => {
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

  handleRemoval = () => {
    websockets.emit(SOCKET_EVENTS.DELETE_NODES, [{ id: this.props.id }]);
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof Node
   */
  render() {
    const { value, children } = this.props;
    const { hovering } = this.state;

    return (
      <div>
        <div
          className="node-value"
          onMouseEnter={this.handleNodeHover}
          onMouseLeave={this.handleNodeHover}
        >
          <div className="display-inline-block">
            <EditableText className="pt-intent-primary" defaultValue={value} onConfirm={this.handleTextChange} />
          </div>
          {
            hovering && (
              <div className="cursor-pointer display-inline-block margin-left-10">
                <FormPopover Form={FactoryForm} {...this.props} onSubmit={this.handleFormSubmit} />
                <Tag className="pt-round">
                  <span className="pt-icon-remove" onClick={this.handleRemoval} />
                </Tag>
              </div>
            )
          }
        </div>
        <div className="node-children">
          {children}
        </div>
      </div>
    );
  }
}
