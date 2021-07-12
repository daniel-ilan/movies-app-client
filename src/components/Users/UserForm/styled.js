import styled from 'styled-components';

export const FormWrapper = styled.div`
  margin: auto;
  width: 70%;
`;

export const Form = styled.form`
  width: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

export const InputsWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
`;

export const FormError = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.5rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin: 1rem auto;
  max-width: 50%;
`;

export const Credentials = styled.div`
  flex-grow: 1;
`;

export const Permissions = styled.div`
  flex-grow: 1;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const Header = styled.h2`
  text-align: center;
`;

export const FormHeader = styled.div`
  text-align: center;
`;
