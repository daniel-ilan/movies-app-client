import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  overflow: auto;
  padding-top: 50px;
`;

export const MovieCard = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-inline: 2%;
  margin-bottom: 5%;
  width: 20%;
  position: relative;
  box-shadow: 0px 0px 2px 2px rgb(0 0 0 / 29%);
  transition: all 0.15s;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.05);
    text-decoration: none;
    box-shadow: 0px 0px 10px 0px rgb(0 0 0);
  }
`;

export const CardActions = styled.div`
  padding: 10px;
`;

export const MovieTitle = styled.div`
  color: whitesmoke;
  font-weight: 700;
  margin-block: 5px;
`;

export const MovieHeader = styled.div``;

export const MovieImage = styled.img`
  object-fit: contain;
`;

export const Genres = styled.small`
  color: hsl(0deg 0% 56%);
`;

export const Rating = styled.div`
  border-radius: 30px;
  background-color: orange;
  position: absolute;
  width: 70px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  inset-inline: 0;
  inset-block-start: -20px;
  color: whitesmoke;
  font-weight: 500;
  background: linear-gradient(
    180deg,
    rgba(222, 86, 0, 1) 0%,
    rgba(252, 176, 69, 1) 100%
  );
`;

export const AllShowsContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SideNav = styled.div`
  flex-grow: 2;
`;
