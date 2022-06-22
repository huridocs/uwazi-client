import React from 'react';
import { render, screen } from '@testing-library/react';
import Cards from '../../../src/pages/library/cards';

describe('Cards page', () => {
  const entities = [
    { _id: 'entity1', title: 'Entity 1' },
    { _id: 'entity2', title: 'Entity 2' },
    { _id: 'entity3', title: 'Entity 3' },
  ];

  beforeEach(() => {
    render(<Cards entities={entities} />);
  });

  it('should allow users to see all the cards', () => {
    const cards = screen.queryAllByText(/Entity \d/);
    expect(cards).toHaveLength(3);
  });
});
