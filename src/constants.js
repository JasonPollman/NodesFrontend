/**
 * Application wide constants.
 * @since 4/10/18
 * @file
 */

export default Object.assign(exports, Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'production',
  // The id of the root node. This is the "null" UUIDv4.
  // This value will never change, as it's simluated in the
  // backend and not actually stored in the database.
  ROOT_NODE_ID: '00000000-0000-0000-0000-000000000000',
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
    ROOT: 'root',
    LEAF: 'leaf',
    FACTORY: 'factory',
  },
}));
