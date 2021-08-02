import React from 'react';
import { Popover } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled(Popover)`
  max-width: 400px;
  width: 100%;
  height: 450px;
  max-height: 100%;
`;

const StyledPopoverBody = styled(Popover.Content)`
  overflow-y: auto;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomPopover = React.forwardRef((props, ref) => {
  return (
    <Wrapper
      ref={ref}
      id={props.id}
      {...props}
      onBlur={() => props.handleOutsideClick}>
      <Popover.Title as='h3'>{props.title}</Popover.Title>
      <StyledPopoverBody>{props.children}</StyledPopoverBody>
    </Wrapper>
  );
});
export default CustomPopover;
