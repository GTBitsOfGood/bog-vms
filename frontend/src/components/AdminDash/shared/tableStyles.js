import styled from 'styled-components';
import { transparentize } from "polished";

const Container = styled.div`
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
  border-top: 2px solid ${props => transparentize(0.9, props.theme.grey3)};
`;
const LoadingBody = styled.div`
  height: 39rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export { Container, Table, Row, LoadingBody };
