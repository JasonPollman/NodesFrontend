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

  state = {
    isHovering: false,
    popoverIsOpen: undefined,
  }

  /**
   * Handles when a user hovers over the root node.
   * @memberof RootNode
   */
  handleNodeHover = () => {
    this.setState(state => ({ ...state, isHovering: !state.isHovering }));
  }

  /**
   * Handles the form submission of adding a new factory node.
   * This will close the form popover as well.
   * @memberof RootNode
   */
  handleFormSubmit= ({ name }) => {
    this.setState({ popoverShouldOpen: false });
    websockets.emit(SOCKET_EVENTS.UPSERT_NODES, [
      {
        value: name,
        parent: this.props.id,
        type: NODE_TYPES.FACTORY,
      },
    ]);
  }

  /**
   * Tells this component that the popover is open.
   * @memberof RootNode
   */
  handlePopoverOpen = () => this.setState({ popoverIsOpen: true })

  /**
   * Tells this component that the popover is closed.
   * @memberof RootNode
   */
  handlePopoverClose = () => this.setState({
    popoverIsOpen: false,
    popoverShouldOpen: undefined,
  })

  /**
   * Renders this component.
   * @returns {React.Element} The rendered React element.
   * @memberof Node
   */
  render() {
    const { type, value, children = [] } = this.props;
    const { popoverShouldOpen, popoverIsOpen, isHovering } = this.state;

    return (
      <div className={`node node-type-${type}`}>
        <div
          onMouseEnter={this.handleNodeHover}
          onMouseLeave={this.handleNodeHover}
        >
          <span className="text-light text-small pt-icon-layout-hierarchy margin-right-5" />
          <span className="text-success text-bold text-capitalize">{value}</span>
          {
            (isHovering || popoverIsOpen) && (
              <div className="cursor-pointer display-inline-block margin-left-10 pt-te">
                <FormPopover
                  {...this.props}
                  Form={RootForm}
                  isOpen={popoverShouldOpen}
                  onSubmit={this.handleFormSubmit}
                  popoverDidOpen={this.handlePopoverOpen}
                  popoverWillClose={this.handlePopoverClose}
                />
              </div>
            )
          }
        </div>
        {
          !children.length && (
            <NonIdealState
              visual="flag"
              title="Hmmm... what happened to all the factory nodes?"
              className="text-muted"
            >
              <div className="text-muted">
                Hover over the root node and click the <span className="pt-icon-add margin-right-5" />
                icon to create some!
              </div>
            </NonIdealState>
          )
        }
        {
          Boolean(children.length) && (
            <div>
              <div className="node-children">{children}</div>
              <span className="text-light text-small pt-icon-more margin-right-5 top--20 position-relative" />
            </div>
          )
        }
      </div>
    );
  }
}
