import styled from 'styled-components';

const Container = styled.div`
  background: white;
  width: 100%;
  max-width: 80rem;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid ${props => props.theme.grey9};
`;
const Table = styled.table`
  width: 100%;

  th {
    color: ${props => props.theme.primaryGrey};
    font-size: 1.2rem;
  }
  th,
  td {
    padding: 1.5rem;
  }
`;
const Row = styled.tr`
  ${props => props.evenIndex && 'background: #FFFFFF'};
  cursor: pointer;
  border-bottom: 2px solid #f0f0f0;
`;
const LoadingBody = styled.div`
  height: 39rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export { Container, Table, Row, LoadingBody };
