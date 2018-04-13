/**
 * Renders the application navigation bar.
 * @since 4/10/18
 * @file
 */

import React from 'react';

import {
  Navbar,
  AnchorButton,
  Alignment,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from '@blueprintjs/core';

export default () => (
  <Navbar>
    <NavbarGroup align={Alignment.LEFT}>
      <NavbarHeading>Node Number Factory</NavbarHeading>
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <NavbarDivider />
      <div className="navbar-middle">
        <AnchorButton
          icon={<span className="fa fa-lg fa-github" />}
          className="pt-minimal"
          text="Backend Source Code"
          target="_blank"
          href="https://github.com/JasonPollman/NodesBackend"
        />
        <AnchorButton
          icon={<span className="fa fa-lg fa-github" />}
          className="pt-minimal"
          text="Frontend Source Code"
          target="_blank"
          href="https://github.com/JasonPollman/NodesFrontend"
        />
      </div>
      <NavbarDivider />
      <div className="navbar-right">
        <AnchorButton
          icon={<span className="fa fa-lg fa-linkedin" />}
          className="pt-minimal"
          target="_blank"
          href="https://www.linkedin.com/in/jpollman/"
        />
        <AnchorButton
          icon={<span className="fa fa-lg fa-github" />}
          className="pt-minimal"
          target="_blank"
          href="https://github.com/JasonPollman"
        />
        <AnchorButton
          icon={<span className="fa fa-lg fa-envelope" />}
          className="pt-minimal"
          href="mailto:jasonjpollman@gmail.com"
        />
      </div>
    </NavbarGroup>
  </Navbar>
);
