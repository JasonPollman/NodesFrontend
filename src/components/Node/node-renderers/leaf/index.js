/**
 * Renders a leaf node.
 * @since 4/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '@blueprintjs/core';

const LeafNode = ({ value, type, children }) => (
  <div className={`node node-type-${type}`}>
    <div className="node-value">
      <Tag className="pt-round">{value}</Tag>
    </div>
    <div className="node-children">
      {Boolean(children.length) && children}
    </div>
  </div>
);

LeafNode.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default LeafNode;
