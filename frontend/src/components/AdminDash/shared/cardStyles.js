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
`;

const Card = styled.div `
  position: relative;
  overflow: hidden;
  margin: 10px;
  width: 25%;
  min-width: 100px;
  padding-bottom: 25%;
  border-radius: 10px;
  background: #e0e0e0;
  transition: 0.3s;
 
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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
    height: 100%;
    background: #efa0a0; /*placeholder color if no image is found */
`;

const cardText = styled.div `
    margin-bottom: 0;
    margin-top: auto;
    padding: 0.5vw;
    width: 100%;
    font-family: "Calibri", sans-serif;
    background: #f8f8f8;
`;


const LoadingBody = styled.div `
  height: 39rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export { Container, cardGrid, Card, cardContainer, LoadingBody, cardText, imgPlaceholder};
