/**
 * Exports the Node component, the class for each tree node.
 * @since 4/10/18
 * @file
 */

import _ from 'lodash';
import React from 'react';
import debug from 'debug';
import PropTypes from 'prop-types';

import websockets from '../../websockets';
import nodeRenderers from './node-renderers';

import { SOCKET_EVENTS } from '../../constants';

const log = debug('NodeFactory');
const iterateeKeyForNode = ({ id, value }) => id.concat(value);

/**
 * A component that is representative of a node within the node tree.
 * This will recursively create the node tree.
 * @extends {React.Component}
 * @class Node
 * @export
 */
export default class Node extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  /**
   * Creates an instance of Node.
   * @param {object} props React props.
   * @memberof Node
   */
  constructor(props) {
    super(props);
    this.state = { ...this.props };
    this.key = `${SOCKET_EVENTS.NODE_WAS_UPDATED}:${this.props.id}`;
  }

  /**
   * Starts listening for node socket updates
   * when this component is mounted.
   * @returns {undefined}
   * @memberof Node
   */
  componentDidMount() {
    websockets.on(this.key, this.handleSocketUpdate);
  }

  /**
   * Stops listening for node socket updates
   * when this component is unmounted.
   * @returns {undefined}
   * @memberof Node
   */
  componentWillUnmount() {
    websockets.removeListener(this.key, this.handleSocketUpdate);
  }

  /**
   * Handles socket updates. There's a fairly simple theme here:
   * The data returned from the socket is mapped to the state of the component.
   * @memberof Node
   */
  handleSocketUpdate = (data) => {
    log(`Socket event received "${this.key}"`, data);
    this.setState(data);
  }

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof Node
   */
  render() {
    const Renderer = nodeRenderers[this.state.type] || false;
    return Renderer && (
      <div className={`node node-type-${this.state.type}`}>
        <Renderer {...this.state} childNodes={this.state.children}>
          {
            _.map(
              _.sortBy(this.state.children, ['value']),
              child => <Node key={iterateeKeyForNode(child)} {...child} />,
            )
          }
        </Renderer>
      </div>
    );
  }
}
