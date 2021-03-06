/**
 * Exports the Node component, the class for each tree node.
 * @since 4/10/18
 * @file
 */

import _ from 'lodash';
import React from 'react';
import debug from 'debug';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';

import websockets from '../../websockets';
import nodeRenderers from './node-renderers';

import {
  NODE_TYPES,
  SOCKET_EVENTS,
} from '../../constants';

const log = debug('NodeNumberFactory:Node');
const iterateeKeyForNode = ({ id, type, value }) => `${id}-${type}-${value}`;

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
    initID: PropTypes.number.isRequired,
    toast: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
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
    if (_.get(NODE_TYPES, `${this.props.type}.listensForUpdates`, true)) {
      websockets.on(this.key, this.handleSocketUpdate);
    }
  }

  /**
   * Mapping state to props is an anti-pattern, but it's useful
   * here since we're taking the top level of the tree and rendering it down,
   * then only listening for updates to a single node. Handling this with
   * `initID` for re-connect scenarios so child updates re-render.
   * @param {object} nextProps The next props.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.initID !== this.props.initID) {
      this.setState({ ...nextProps });
    }
  }

  /**
   * Stops listening for node socket updates
   * when this component is unmounted.
   * @returns {undefined}
   * @memberof Node
   */
  componentWillUnmount() {
    if (_.get(NODE_TYPES, `${this.props.type}.listensForUpdates`, true)) {
      websockets.removeListener(this.key, this.handleSocketUpdate);
    }
  }

  /**
   * Handles socket updates. There's a fairly simple theme here:
   * The data returned from the socket is mapped to the state of the component.
   * @memberof Node
   */
  handleSocketUpdate = (data, toastSummary) => {
    log(`Socket event received "${this.key}"`, data);

    if (toastSummary && _.isString(toastSummary.message)) {
      this.props.toast({
        timeout: 3000,
        intent: Intent.PRIMARY,
        ...toastSummary,
      });
    }

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
      <Renderer {...this.state} childNodes={this.state.children}>
        {
          _.map(
            this.state.children,
            child => (
              <Node
                initID={this.props.initID}
                toast={this.props.toast}
                key={iterateeKeyForNode(child)}
                {...child}
              />
            ),
          )
        }
      </Renderer>
    );
  }
}
