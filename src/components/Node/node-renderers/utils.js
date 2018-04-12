/**
 * Common functionality shared between node renderers.
 * @since 4/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Tag,
  Popover,
  PopoverInteractionKind,
} from '@blueprintjs/core';

export const FormPopover = ({ Form, ...props }) => (
  <Popover
    interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
    popoverClassName="pt-popover-content-sizing"
  >
    <Tag className="pt-round">
      <span className="pt-icon-share" />
    </Tag>
    <Form {...props} />
  </Popover>
);

FormPopover.propTypes = {
  Form: PropTypes.node.isRequired,
};


export default exports;
