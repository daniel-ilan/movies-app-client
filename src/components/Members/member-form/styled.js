import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 70%;
  margin: auto;
  padding-block: 20px;
  background-color: #1f2c383d;
  border-radius: 20px;
`;

export const Form = styled.form`
  width: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

export const InputsWrapper = styled.div`
  max-width: 100%;
  padding-inline: 20px;
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
`;

export const FormError = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.5rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin: 0 auto;
  max-width: 50%;
`;

export const Credentials = styled.div`
  flex-grow: 2;
  display: flex;
  flex-wrap: wrap;
  max-width: 60%;
  gap: 20px;
`;

export const Permissions = styled.div`
  flex-grow: 1;
  max-height: 235px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const Header = styled.h2`
  text-align: center;
`;

export const FormHeader = styled.div`
  text-align: center;
  min-height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
