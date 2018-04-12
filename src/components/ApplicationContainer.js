/**
 * Renders the entire application.
 * @since 4/10/18
 * @file
 */

import React from 'react';

import {
  Navbar,
  Button,
  Alignment,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from '@blueprintjs/core';

import NodeTree from './NodeTree';

export default () => (
  <div className="application-container">
    <Navbar className="pt-dark">
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Node Factory</NavbarHeading>
        <NavbarDivider />
        <Button className="pt-minimal" icon="home" text="Randomize" />
      </NavbarGroup>
    </Navbar>
    <NodeTree />
  </div>
);
