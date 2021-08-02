import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #1f2c383d;
  border-radius: 10px;
  max-width: 350px;
  min-width: 350px;
  padding: 10px;
  border: 1px solid #333333;
  max-height: 400px;
`;

export const CardHeader = styled.div`
  display: flex;
  padding: 5px;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  margin-inline-start: auto;
`;

export const CardInfoBlock = styled.div`
  margin-bottom: 10px;
`;

export const CardInfoSubHeader = styled.span`
  font-size: 1.2rem;
  color: lightgray;
  font-weight: 600;
`;

export const CardInfoText = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;
