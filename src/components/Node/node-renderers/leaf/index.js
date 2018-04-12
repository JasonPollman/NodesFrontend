/**
 * Renders a leaf node.
 * @since 4/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '@blueprintjs/core';

const LeafNode = ({ value }) => (
  <div className="node-value">
    <Tag className="pt-round">{value}</Tag>
  </div>
);

LeafNode.propTypes = {
  value: PropTypes.number.isRequired,
};

export default LeafNode;
