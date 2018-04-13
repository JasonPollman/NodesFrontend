/**
 * Common functionality shared between node renderers.
 * @since 4/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Popover,
  PopoverInteractionKind,
} from '@blueprintjs/core';

/**
 * Creates a Popover containing the given form.
 * @param {object} props React props.
 */
export const FormPopover = ({ Form, ...props }) => (
  <Popover
    interactionKind={PopoverInteractionKind.CLICK}
    popoverClassName="pt-popover-content-sizing"
    {...props}
  >
    <span className="text-muted margin-right-3 pt-icon-add font-size-11 top--2 position-relative" />
    <Form {...props} />
  </Popover>
);

FormPopover.propTypes = {
  Form: PropTypes.func.isRequired,
};


export default exports;
