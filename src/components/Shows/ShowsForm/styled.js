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

export const LeftInputs = styled.div``;
export const RightInputs = styled.div``;
export const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 80%;
`;
