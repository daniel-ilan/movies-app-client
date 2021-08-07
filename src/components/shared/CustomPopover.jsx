import React from 'react';
import { Popover } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled(Popover)`
  max-width: 400px;
  width: 100%;
  height: 100%;
  max-height: 450px;
  background-color: hsl(218deg 15% 8%);
  border: 1px solid #415858;
`;

const StyledPopoverBody = styled(Popover.Content)`
  overflow-y: auto;
  height: calc(90% - 1px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: hsl(218deg 15% 8%);
  color: whitesmoke;
`;

const StyledPopOverHeader = styled(Popover.Title)`
  background-color: hsl(216deg 13% 14%);
  color: whitesmoke;
  border-bottom: 1px solid #2d2d2d;
  height: 10%;
`;

const CustomPopover = React.forwardRef((props, ref) => {
  return (
    <Wrapper
      ref={ref}
      id={props.id}
      {...props}
      onBlur={() => props.handleOutsideClick}>
      <StyledPopOverHeader>{props.title}</StyledPopOverHeader>
      <StyledPopoverBody>{props.children}</StyledPopoverBody>
    </Wrapper>
  );
});
export default CustomPopover;
