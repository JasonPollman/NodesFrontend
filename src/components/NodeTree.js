/**
 * Exports the NodeTree component.
 * @since 4/10/18
 * @file
 */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Toast,
  Intent,
  Toaster,
  Position,
} from '@blueprintjs/core';

import Node from './Node';
import websockets from '../websockets';

import {
  SOCKET_EVENTS,
  EVENT_NAME_TO_PRETTY_MAPPING,
} from '../constants';


let toastIDs = 0;

/**
 * Creates the Node Number Factory tree—a recursive aggreation
 * of different node types that are rendered by node type specific
 * "node renderers".
 * @extends {React.Component}
 * @class NodeTree
 * @export
 */
export default class NodeTree extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    root: null,
    toasts: [],
  };

  /**
   * Starts listening for node socket updates
   * when this component is mounted.
   * @returns {undefined}
   * @memberof Node
   */
  componentWillMount() {
    websockets.on(SOCKET_EVENTS.ERROR, this.handleSocketNodeError);
    websockets.on(SOCKET_EVENTS.INIT, this.handleSocketUpdate);
    websockets.emit(SOCKET_EVENTS.INIT);
  }

  /**
   * Stops listening for node socket updates
   * when this component is unmounted.
   * @returns {undefined}
   * @memberof NodeTree
   */
  componentWillUnmount() {
    websockets.removeListener(SOCKET_EVENTS.INIT, this.handleSocketUpdate);
  }

  /**
   * Handles socket updates. There's a fairly simple theme here:
   * The data returned from the socket is mapped to the state of the component.
   * @memberof NodeTree
   */
  handleSocketUpdate = (root) => {
    this.setState({ root });
  }

  /**
   * Toasts an error message when a socket error occurs.
   * @param {object} errorMetadata The error metadata from the backend.
   * @param {object} errorMetadata.event The event the client emitted to the socket server.
   * @param {object} errorMetadata.error The error message from the error that occurred.
   * @returns {undefined}
   */
  handleSocketNodeError = ({ event, error }) => {
    const eventName = EVENT_NAME_TO_PRETTY_MAPPING[event] || event;

    this.toast({
      intent: Intent.DANGER,
      message: `An error occured while ${eventName} nodes: ${error}`,
    });
  }

  /**
   * Toasts a message.
   * @param {object} options Toast options.
   * @returns {undefined}
   */
  toast = (options) => {
    const id = toastIDs++;
    this.setState({
      toasts: {
        ...this.state.toasts,
        [id]: { ...options, id },
      },
    });
  }

  /**
   * Returns a function that removes the given toast message from the stored toast messages.
   * @param {object} toast The toast message to create the removal function for.
   * @returns {undefined}
   */
  deleteToast = toast => () => {
    const toastsWithoutRemoved = _.omit(this.state.toasts, [toast.id]);
    this.setState({ toasts: toastsWithoutRemoved });
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof NodeTree
   */
  render() {
    return (
      <div className={this.props.className}>
        <Toaster position={Position.TOP}>
          {
            _.map(this.state.toasts, toast => (
              <Toast key={toast.id} {...toast} icon="warning-sign" onDismiss={this.deleteToast(toast)} />
            ))
          }
        </Toaster>
        <div className="padding-20 min-width-300">
          {
            this.state.root && <Node toast={this.toast} {...this.state.root} />
          }
        </div>
      </div>
    );
  }
}
