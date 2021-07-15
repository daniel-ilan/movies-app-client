import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 95%;
  max-width: 80%;
  overflow: auto;
  padding-top: 50px;
`;

export const MovieCard = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-inline-end: 5%;
  margin-bottom: 5%;
  width: 20%;
  position: relative;
  box-shadow: 3px 1px 15px 0px rgb(0 0 0 / 13%);
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
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

export const MovieImage = styled.img`
  display: block;
  object-fit: cover;
  box-shadow: 6px 4px 15px 1px rgb(0 0 0 / 75%);
`;

export const Genres = styled.h5`
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
  height: 88%;
`;

export const SideNav = styled.div`
  flex-grow: 2;
`;
