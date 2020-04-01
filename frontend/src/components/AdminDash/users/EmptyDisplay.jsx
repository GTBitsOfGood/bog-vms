import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../Shared';

const Styled = {
  EmptyContainer: styled.div`
    margin: auto;
    padding: 2rem;
    text-align: center;
  `,
  EmptyText: styled.h4`
    margin-bottom: 0;
    font-size: 1.2rem;
    line-height: 1.3;
    color: ${props => props.theme.grey5};
  `,
  EmptyIcon: styled(Icon)`
    transform: scale(3);
    margin-bottom: 2.5rem;
  `
};

const EmptyDisplay = () => (
  <Styled.EmptyContainer>
    <Styled.EmptyIcon name="empty" color="grey7" />
    <Styled.EmptyText>Your mailing list is empty.</Styled.EmptyText>
  </Styled.EmptyContainer>
);

export default EmptyDisplay;
