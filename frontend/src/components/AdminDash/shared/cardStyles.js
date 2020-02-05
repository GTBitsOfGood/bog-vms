import styled from 'styled-components';

const Container = styled.div`
  background: white;
  width: 100%;
  max-width: 80rem;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid ${props => props.theme.grey9};
`;

const Card = styled.div`
  width: 25%;
  padding-top: 100%; /* 1:1 Aspect Ratio */ 
  
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
`;

const LoadingBody = styled.div`
  height: 39rem;
  width: 100%;
  display: flex;
  align-items: center;
`;