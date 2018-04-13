# Node Number Factory Frontend
> Programming Challenge

## Project Structure

```js
.
|-- src/
    |-- components      // Houses all of the React Components that make up this applcation.
    |-- constants.js    // Constant values used throughout the app.
    |-- index.js        // Main entry point into the React application.
    |-- style.scss      // Application styles
    |-- template.hbs    // Used by the HTML Webpack Plugin to render a static index.html file
    |-- websockets.js   // Exports a singleton socket.io-client instance
```

### Components

**Node**    
The `<Node />` component is the class used to render *every* node type: root, factory, and number.
This sets up a socket listener for the node and updates (re-renders) it when the `nodeWasUpdated:${node.id}` event is emitted by the socket server.

When a node is rendered, it selects a "node-renderer" method based on the node's `type` property and renders the node using this method. In this way, we're able to share the base functionality between
nodes (updating and managing socket events), but also provide a way to allow the node types
to be presented differently.

**Application Container**    
The outer wrapper for the entire application.    
Ties together the `<NavBar />`, `<NodeTree />`, and `<InfoCards />` components.

**NavBar**    
The navigation component—contains the header and the links show on the top menu.

**NodeTree**    
This component "initializes" the rendering of all nodes. It emits the `nodeInitialize` socket
event and listens for a response that contains the *full* initial tree rendering.

Once the page has been initialized, we never have to fully re-render the tree since each node
listens for its own update event. So, post initialization, a node will never re-render more
than itself and its children.

This component also handles socket errors and "toasing" socket messages to the screen (like
when a user upserts a new node).

## Architecture

