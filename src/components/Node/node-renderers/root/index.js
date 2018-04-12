/**
 * Renders the root node.
 * @since 4/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import RootForm from './form';
import websockets from '../../../../websockets';

import { FormPopover } from '../utils';

import {
  NODE_TYPES,
  SOCKET_EVENTS,
} from '../../../../constants';

/**
 * Renders root node types.
 * @extends {React.Component}
 * @class FactoryNode
 */
export default class RootNode extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  state = { hovering: false }

  /**
   * Handles when a user hovers over the root node.
   * @memberof RootNode
   */
  handleNodeHover = () => {
    this.setState(state => ({ ...state, hovering: !state.hovering }));
  }

  /**
   * Handles the form submission of adding a new factory node
   * @memberof RootNode
   */
  handleFormSubmit= ({ name }) => {
    websockets.emit(SOCKET_EVENTS.UPSERT_NODES, [
      {
        value: name,
        parent: this.props.id,
        type: NODE_TYPES.FACTORY,
      },
    ]);
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof Node
   */
  render() {
    const { value, children } = this.props;
    return (
      <div>
        <div
          className="node-value"
          onMouseEnter={this.handleNodeHover}
          onMouseLeave={this.handleNodeHover}
        >
          {value}
          {
            this.state.hovering && (
              <div className="cursor-pointer display-inline-block margin-left-10">
                <FormPopover Form={RootForm} {...this.props} onSubmit={this.handleFormSubmit} />
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
