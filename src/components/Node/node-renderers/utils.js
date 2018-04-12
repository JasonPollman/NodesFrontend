import React from 'react';

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


export default exports;
