import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from 'modules/card/Card';

describe('Card', () => {
  it('should allow users to see the title', () => {
    render(<Card entity={{ title: 'Entity 1', _id: 'entity1' }} />);
    const [title] = screen.queryAllByText('Entity 1');
    expect(title).toBeInTheDocument();
  });
});
