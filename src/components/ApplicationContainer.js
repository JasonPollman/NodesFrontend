/**
 * Renders the entire application.
 * @since 4/10/18
 * @file
 */

import React from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';

import {
  Card,
  Elevation,
} from '@blueprintjs/core';

import {
  BACKEND_REPO,
  FRONTEND_REPO,
} from '../constants';

import NavBar from './NavBar';
import NodeTree from './NodeTree';

/**
 * A wrapper that generates an "information card" component.
 * @param {object} props React props.
 */
const InfoCard = ({ intent, title, children }) => (
  <Card className="panel-card flex-1 margin-5 min-width-250" elevation={Elevation.ONE}>
    <h5 className={`text-${intent}`}>{title}</h5>
    <div className="text-muted">
      {children}
    </div>
  </Card>
);

InfoCard.propTypes = {
  intent: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

InfoCard.defaultProps = {
  intent: 'primary',
};

const WelcomeCard = () => (
  <InfoCard title="What is this?" intent="warning">
    <p>
      This simple app let&apos;s you create <span className="text-bold text-primary">factory</span> nodes.
      Each factory node has a changable name and can have from 0 to 15 <span className="text-bold text-warning">number</span> nodes.
    </p>
    <p className="text-bold">
      The state of this app is persistent.
    </p>
    <p>
      As other users interact with the app, their changes will be reflected here.
      If you change something, it will also update on their end too.
    </p>
  </InfoCard>
);

const InstructionsCard = () => (
  <InfoCard title="Let&apos;s generate some numbers!">
    <p>
      Click the <span className="pt-icon-add" /> icon beside a
      <span className="text-bold text-primary"> factory</span> node
      to generate new random number nodes.
    </p>
    <p>
      <span className="text-bold text-primary">Factory</span> nodes
      can be removed by clicking the <span className="pt-icon-remove margin-right-5" />
      icon.
    </p>
    <p>
      If you want to create a new factory, click the <span className="pt-icon-add margin-right-5" />
      icon beside the <span className="text-bold text-success">Root</span> node.
    </p>
  </InfoCard>
);

const TechnologiesCard = () => (
  <InfoCard title="What technologies does this app use?" intent="success">
    <p>Here&apos;s the lineup of major frameworks and libraries used to create this app:</p>
    <h6 className="text-success">Backend</h6>
    <ul>
      <li>Node.js</li>
      <li>Express</li>
      <li>Socket.io</li>
      <li>MongoDB</li>
    </ul>
    <h6 className="text-success">Frontend</h6>
    <ul>
      <li>Webpack</li>
      <li>React</li>
      <li>Socket.io Client</li>
      <li>Blueprint</li>
      <li>FontAwesome</li>
    </ul>
  </InfoCard>
);

const AuthorCard = () => (
  <InfoCard title="Author" intent="primary">
    <div className="display-inline-block vertical-align-middle margin-right-10">
      <Gravatar
        email="jasonjpollman@gmail.com"
        size={60}
        className="border-radius-circle"
      />
    </div>
    <div className="display-inline-block">
      <h4 className="margin-bottom-0">Jason Pollman</h4>
      <a className="text-primary" href="mailto:jasonjpollman@gmail.com">jasonjpollman@gmail.com</a>
    </div>
  </InfoCard>
);

const HowItWorksCard = () => (
  <InfoCard title="How does this app work?" intent="danger">
    <p>
      Checkout the <span className="text-danger">readme.md</span> documentation
      for each repository below to read more about the concepts and architecture that power
      this application.
    </p>
    <p>
      <span className="text-bold">Repositories</span>
    </p>
    <ul>
      <li>
        <a href={BACKEND_REPO} className="text-danger" target="_blank">Backend Repository</a>
      </li>
      <li>
        <a href={FRONTEND_REPO} className="text-danger" target="_blank">Frontend Repository</a>
      </li>
    </ul>
  </InfoCard>
);

const InfoCards = () => (
  <div className="flex-1 padding-20">
    <div className="display-flex flex-wrap">
      <WelcomeCard />
      <InstructionsCard />
      <TechnologiesCard />
      <HowItWorksCard />
      <AuthorCard />
    </div>
  </div>
);

/**
 * This is the "base" layout for the entire application
 * that integrates all of the major components together.
 */
export default () => (
  <div className="application-container">
    <NavBar />
    <div className="display-flex flex-wrap">
      <NodeTree className="flex-1" />
      <InfoCards />
    </div>
  </div>
);
