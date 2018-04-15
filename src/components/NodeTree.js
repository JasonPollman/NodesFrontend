/**
 * Exports the NodeTree component.
 * @since 4/10/18
 * @file
 */

import _ from 'lodash';
import React from 'react';
import debug from 'debug';
import PropTypes from 'prop-types';

import {
  Toast,
  Intent,
  Toaster,
  Spinner,
  Position,
  NonIdealState,
} from '@blueprintjs/core';

import Node from './Node';
import websockets from '../websockets';

import {
  SOCKET_EVENTS,
  EVENT_NAME_TO_PRETTY_MAPPING,
} from '../constants';

const log = debug('NodeNumberFactory:NodeTree');
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
    isConnected: true,
    toasts: [],
  };

  /**
   * Starts listening for node socket updates
   * when this component is mounted.
   * @returns {undefined}
   * @memberof Node
   */
  componentWillMount() {
    websockets.on(SOCKET_EVENTS.INIT, this.handleSocketUpdate);
    websockets.on(SOCKET_EVENTS.ERROR, this.handleSocketNodeError);

    // Handle socket connection issues
    // These are built in socket.io events.
    websockets.on('reconnect', this.setSocketConnected);
    websockets.on('disconnected', this.setSocketDisconnected);
    websockets.on('connect_error', this.setSocketDisconnected);

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
    websockets.removeListener(SOCKET_EVENTS.ERROR, this.handleSocketNodeError);

    websockets.removeListener('reconnect', this.setSocketConnected);
    websockets.removeListener('disconnected', this.setSocketDisconnected);
    websockets.removeListener('connect_error', this.setSocketDisconnected);
  }

  /**
   * Sets the connection state to `true`.
   * @memberof NodeTree
   */
  setSocketConnected = () => {
    log('Socket state changed to "connected"');

    // Re-emit the init event to get any tree updates
    // the occurred while the connection was lost.
    websockets.emit(SOCKET_EVENTS.INIT);
    this.setState({ isConnected: true });
  }

  /**
   * Sets the connection state to `false`.
   * @memberof NodeTree
   */
  setSocketDisconnected = () => {
    log('Socket state changed to "disconnected"');
    this.setState({ isConnected: false });
  }

  /**
   * Handles socket updates. There's a fairly simple theme here:
   * The data returned from the socket is mapped to the state of the component.
   * @memberof NodeTree
   */
  handleSocketUpdate = (root) => {
    log('Root node fetched...', root);
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
            this.state.isConnected
              && this.state.root
              && <Node toast={this.toast} {...this.state.root} />
          }
          {
            !this.state.isConnected && (
              <NonIdealState className="margin-top-30" title="Connecting...">
                <Spinner />
              </NonIdealState>
            )
          }
        </div>
      </div>
    );
  }
}
