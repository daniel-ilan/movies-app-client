import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ShowCard = styled.div`
  margin-inline: 2%;
  margin-bottom: 5%;
  width: 20%;
  position: relative;
  box-shadow: 0px 0px 2px 2px rgb(0 0 0 / 29%);
  height: fit-content;
`;

export const ShowLink = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.15s;
  color: whitesmoke;

  &:hover {
    transform: scale(1.05);
    text-decoration: none;
    color: whitesmoke;
  }
`;

export const CardBody = styled.div`
  padding: 10px;
`;

export const ShowTitle = styled.div`
  color: whitesmoke;
  font-weight: 700;
  margin-block: 5px;
`;

export const ShowHeader = styled.div``;

export const ShowImage = styled.img`
  object-fit: contain;
`;

export const Small = styled.small`
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

export const CardFooter = styled.div`
  padding: 5px;
`;

export const SubscribersContainer = styled.div``;

export const Subscriber = styled(Link)`
  background-color: #1f2c383d;
  border-radius: 3px;
  padding: 5px;
  color: whitesmoke;
  border: 1px solid #333333;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s;
  &:hover {
    color: darkcyan;
    background-color: hsl(209deg 29% 10% / 24%);
  }
`;
