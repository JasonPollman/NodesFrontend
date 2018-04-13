/**
 * Renders a number node.
 * @since 4/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '@blueprintjs/core';

const NumberNode = ({ type, value }) => (
  <div className={`node node-leaf node-type-${type}`}>
    <Tag className="node-value pt-minimal pt-intent-primary">{value}</Tag>
  </div>
);

NumberNode.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default NumberNode;
