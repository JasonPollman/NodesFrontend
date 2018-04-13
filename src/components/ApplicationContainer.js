/**
 * Renders the entire application.
 * @since 4/10/18
 * @file
 */

import React from 'react';

import {
  Card,
  Elevation,
} from '@blueprintjs/core';

import NavBar from './NavBar';
import NodeTree from './NodeTree';

const WelcomeCard = () => (
  <Card className="panel-card flex-1 margin-5 min-width-250" elevation={Elevation.ONE}>
    <h5 className="text-primary">Let&apos;s generate some numbers!</h5>
    <div className="text-muted">
      Hover over a factory node and click the&nbsp;
      <span className="pt-icon-add margin-right-5" />
      icon to create new nodes.
    </div>
  </Card>
);


export default () => (
  <div className="application-container">
    <NavBar />
    <div className="display-flex flex-wrap">
      <NodeTree className="flex-1" />
      <div className="flex-1 padding-20">
        <div className="display-flex flex-wrap">
          <WelcomeCard />
          <WelcomeCard />
          <WelcomeCard />
          <WelcomeCard />
          <WelcomeCard />
          <WelcomeCard />
        </div>
      </div>
    </div>
  </div>
);
