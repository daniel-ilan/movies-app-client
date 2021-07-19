import styled from 'styled-components';

export const UsersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  gap: 10px;
  overflow: auto;
`;

export const UserContainer = styled.div`
  background-color: #1f2c383d;
  border-radius: 10px;
  max-width: 350px;
  min-width: 350px;
  padding: 10px;
  border: 1px solid #333333;
  max-height: 400px;
`;

export const UserActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

export const Wrapper = styled.div`
  height: 100%;
`;

export const NormalText = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

export const UserFullName = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: lightgray;
  font-weight: 600;
`;

export const Username = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: lightgray;
  font-weight: 600;
`;
export const UserSession = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: lightgray;
  font-weight: 600;
`;
export const UserPermissions = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: lightgray;
  font-weight: 600;
`;
