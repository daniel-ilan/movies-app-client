import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MoviesWatchedWrapper = styled.div`
  padding: 5px;
`;

export const MoviesHeader = styled.h5``;

export const MovieItem = styled(NavLink)`
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

export const SubscriptionsWrapper = styled.div`
  padding: 5px;
  max-height: 160px;
  overflow-y: auto;
  border: 1px solid #3e3e3e54;
`;

export const SubscriptionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
