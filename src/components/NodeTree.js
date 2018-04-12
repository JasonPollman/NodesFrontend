/**
 * Exports the NodeTree component.
 * @since 4/10/18
 * @file
 */

import React from 'react';

import Node from './Node';
import websockets from '../websockets';
import { SOCKET_EVENTS } from '../constants';

/**
 * Creates the Node Number Factory tree.
 * @extends {React.Component}
 * @class NodeTree
 * @export
 */
export default class NodeTree extends React.Component {
  state = {
    root: null,
  };

  /**
   * Starts listening for node socket updates
   * when this component is mounted.
   * @returns {undefined}
   * @memberof Node
   */
  componentWillMount() {
    websockets.once(SOCKET_EVENTS.INIT, this.handleSocketUpdate);
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
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof NodeTree
   */
  render() {
    return this.state.root && <Node {...this.state.root} />;
  }
}
