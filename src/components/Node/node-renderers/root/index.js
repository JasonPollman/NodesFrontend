/**
 * Renders the root node.
 * @since 4/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { NonIdealState } from '@blueprintjs/core';

import RootForm from './form';
import websockets from '../../../../websockets';

import { FormPopover } from '../utils';

import {
  NODE_TYPES,
  SOCKET_EVENTS,
  SOCKET_SUMMARIES,
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

  state = {}

  /**
   * Handles the form submission of adding a new factory node.
   * This will close the form popover as well.
   * @memberof RootNode
   */
  handleFormSubmit= ({ name }) => {
    this.setState({ popoverShouldOpen: false });
    websockets.emit(
      SOCKET_EVENTS.UPSERT_NODES,
      [
        {
          value: name,
          parent: this.props.id,
          type: NODE_TYPES.FACTORY.type,
        },
      ],
      SOCKET_SUMMARIES.factoryNodeAdded(name),
    );
  }

  /**
   * Tells this component that the popover is closed.
   * @memberof RootNode
   */
  handlePopoverClose = () => this.setState({
    popoverShouldOpen: undefined,
  })

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof Node
   */
  render() {
    const { type, value, children = [] } = this.props;
    const { popoverShouldOpen } = this.state;

    return (
      <div className={`node node-type-${type}`}>
        <div>
          <span className="top--2 position-relative text-light font-size-11 pt-icon-layout-hierarchy margin-right-5" />
          <div className="cursor-pointer display-inline-block margin-left-5">
            <FormPopover
              {...this.props}
              Form={RootForm}
              isOpen={popoverShouldOpen}
              onSubmit={this.handleFormSubmit}
              plusIconAdditionalClasses="font-size-16"
              popoverWillClose={this.handlePopoverClose}
            />
          </div>
          <span className="text-success font-size-16 text-bold text-capitalize margin-left-2">{value}</span>
        </div>
        {
          !children.length && (
            <NonIdealState
              visual="info-sign"
              title="Looks like someone deleted all the factory nodes..."
              className="text-muted"
            >
              <div className="text-muted">
                Click the <span className="pt-icon-add margin-right-5" /> icon to create some!
              </div>
            </NonIdealState>
          )
        }
        {
          Boolean(children.length) && (
            <div>
              <div className="node-children">{children}</div>
            </div>
          )
        }
      </div>
    );
  }
}
