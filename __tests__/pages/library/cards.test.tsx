import React from 'react';
import { render, screen } from '@testing-library/react';
import Cards from 'pages/library/cards';
import { entities } from '../../commonFixtures/entities';

describe('Cards page', () => {
  beforeEach(() => {
    render(<Cards entities={entities} />);
  });

  it('should allow users to see all the cards', () => {
    const cards = screen.queryAllByText(/Entity \d/);
    expect(cards).toHaveLength(3);
  });
});
