import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
`;

export const MovieHeader = styled.div`
  height: 30%;
`;

export const MovieImage = styled.img`
  object-fit: contain;
  min-width: 0;
  min-height: 0;
  flex: 1 1 30%;
  max-width: 40%;
`;

export const MovieTitle = styled.h2`
  color: whitesmoke;
  font-size: 3rem;
`;

export const DescriptionContainer = styled.div`
  color: whitesmoke;
  padding-inline: 30px;
  flex: 1 1 70%;
`;

export const MovieDescription = styled.div`
  color: whitesmoke;
  overflow: auto;
  height: 70%;
`;

export const RatingGenersContainer = styled.div`
  display: flex;
  gap: 50px;
  margin-block: 15px;
  align-items: center;
`;

export const Genres = styled.div`
  color: hsl(0deg 0% 56%);
`;
export const Rating = styled.div`
  border-radius: 30px;
  background-color: orange;
  width: 70px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  background: linear-gradient(
    180deg,
    rgba(222, 86, 0, 1) 0%,
    rgba(252, 176, 69, 1) 100%
  );
`;
