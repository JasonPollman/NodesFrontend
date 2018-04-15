/**
 * Application wide constants.
 * @since 4/10/18
 * @file
 */

import _ from 'lodash';
import { Intent } from '@blueprintjs/core';

export default Object.assign(exports, Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'production',
  // The url to connect to for socket events
  SOCKET_HOST_URL: process.env.SOCKET_HOST_URL || 'http://localhost:3000',
  // The various socket events that are emitted
  // or listened to by the application
  SOCKET_EVENTS: {
    INIT: 'nodeInitialize',
    ERROR: 'nodeError',
    UPSERT_NODES: 'upsertNodes',
    DELETE_NODES: 'deleteNodes',
    COMPOSITE_ACTION: 'compositeAction',
    NODE_WAS_UPDATED: 'nodeWasUpdated',
  },
  // The various node types
  NODE_TYPES: {
    root: {
      type: 'root',
      listensForUpdates: true,
    },
    number: {
      type: 'number',
      listensForUpdates: false,
    },
    factory: {
      type: 'factory',
      listensForUpdates: true,
    },
  },
  // The maximum number of number nodes a factory can generate
  MAX_ALLOWED_FACTORY_CHILD_NODES: 15,
  BACKEND_REPO: 'https://github.com/JasonPollman/NodesBackend',
  FRONTEND_REPO: 'https://github.com/JasonPollman/NodesFrontend',
  // Maps socket events to their "pretty" name
  EVENT_NAME_TO_PRETTY_MAPPING: {
    nodeInitialize: 'initializing',
    upsertNodes: 'adding new',
    deleteNodes: 'deleting',
    compositeAction: 'adding new',
  },
  // The message to pipe to users when updates occur
  SOCKET_SUMMARIES: {
    factoryNameUpdated: (previousName, currentName) => ({
      message: `Factory "${_.upperFirst(previousName)}" was renamed to "${_.upperFirst(currentName)}"`,
      intent: Intent.PRIMARY,
    }),
    factoryGeneratedNewNumbers: (factoryName, deletedNodeCount, addedNodeCount) => ({
      message: `Factory "${_.upperFirst(factoryName)}" was updated! (-${deletedNodeCount}, +${addedNodeCount})`,
      intent: Intent.PRIMARY,
    }),
    factoryRemoved: factoryName => ({
      message: `Factory "${_.upperFirst(factoryName)}" removed.`,
      intent: Intent.WARNING,
    }),
    factoryNodeAdded: factoryName => ({
      message: `New factory "${_.upperFirst(factoryName)}" created.`,
      intent: Intent.SUCCESS,
    }),
  },
}));
