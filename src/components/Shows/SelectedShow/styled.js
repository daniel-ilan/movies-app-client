import styled from 'styled-components';

export const MovieItem = styled.button`
  background-color: #1f2c383d;
  border-radius: 5px;
  border: 1px solid #333333;
  color: inherit;
  width: 100%;
  display: block;
  text-align: center;
  padding: 6px;
  transition: 0.2s all;
  &:hover {
    color: darkcyan;
    background-color: #1f2c3800;
  }
`;

export const ShowTitle = styled.h5`
  text-align: center;
`;

export const ShowWrapper = styled.div`
  display: flex;
`;

export const FlexChildContainer = styled.div`
  flex: 1 1 50%;
  max-width: 50%;
`;

export const SelectedShowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
