import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
`;

export const MovieImage = styled.img`
  object-fit: contain;
  height: 100%;
`;

export const MovieTitle = styled.h2`
  color: whitesmoke;
  font-size: 3rem;
`;

export const DescriptionContainer = styled.div`
  color: whitesmoke;
  padding: 30px;
`;

export const MovieDescription = styled.div`
  color: whitesmoke;
`;

export const RatingGenersContainer = styled.div`
  display: flex;
  gap: 50px;
  margin-block: 15px;
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
