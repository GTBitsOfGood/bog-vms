import styled from 'styled-components';

const Container = styled.div `
  background: white;
  width: 100%;
  max-width: 80rem;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid ${props => props.theme.grey9};
`;

const cardGrid = styled.div `
  display: flex;
  background: white;
  width: 100%;
  max-width: 80rem;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid ${props => props.theme.grey9};
`;


const Card = styled.div `
  position: relative;
  overflow: hidden;
  margin: 10px;
  width: 25%;
  min-width: 250px;
  min-height: 250px;
  padding-bottom: 25%;
  border-radius: 10px;
  background: #e0e0e0;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
    min-width: 0px;
    min-height: 0px;
    width: 100%;
    padding-bottom: 100%;
  }
`;

const cardContainer = styled.div `
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const imgPlaceholder = styled.img `
    width: 100%;
    background: #efa0a0; /*placeholder color if no image is found */
`;

const cardText = styled.div `
    margin-bottom: 0;
    align-self: flex-end;
    padding: 0.5vw;
    width: 100%;
    background: #f8f8f8;
`;


const LoadingBody = styled.div `
  height: 39rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export { Container, cardGrid, Card, cardContainer, LoadingBody, cardText, imgPlaceholder};
