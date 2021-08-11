import styled from 'styled-components';

export const FormWrapper = styled.div`
  margin: auto;
  height: 80%;
  min-width: 40%;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const StyledHeader = styled.h1`
  margin-block: 20px;
  text-align: center;
`;

export const FormError = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.5rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin: 0 auto;
`;

export const FormHeader = styled.div`
  text-align: center;
  min-height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormFooter = styled.div`
  margin-top: 15px;
`;
