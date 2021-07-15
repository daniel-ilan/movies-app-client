import React from 'react';
import styled from 'styled-components';

export const Av = styled.div`
  border-radius: 200px;
  font-size: 0.8rem;
  width: 50px;
  height: 50px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
`;

const Avatar = ({ firstName, lastName }) => {
  const getRandColor = () => {
    const deg = Math.floor(Math.random() * 240);
    const sat = Math.floor(Math.random() * 100);
    const light = Math.floor(Math.random() * 50);

    const hsl = `hsl(${deg}deg, ${sat}%, ${light}%)`;
    return hsl;
  };

  const avName = firstName[0] + lastName[0];

  return <Av backgroundColor={getRandColor}>{avName}</Av>;
};

export default Avatar;
