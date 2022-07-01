import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from 'modules/card/Card';
import { entities } from '../../commonFixtures/entities';

describe('Card', () => {
  it('should allow users to see the title', () => {
    render(<Card entity={entities[0]} />);
    const [title] = screen.queryAllByText('Entity 1 Title');
    expect(title).toBeInTheDocument();
  });
});
