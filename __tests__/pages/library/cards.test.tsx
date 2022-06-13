import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Cards from '../../../pages/library/cards';
import * as searchService from 'services/search';

describe('Cards page', () => {
  const entities = [
    { _id: 'entity1', title: 'Entity 1' },
    { _id: 'entity2', title: 'Entity 2' },
    { _id: 'entity3', title: 'Entity 3' },
  ];

  const searchServiceMock = jest
    .spyOn(searchService, 'search')
    .mockImplementation(() => Promise.resolve({ rows: entities }));

  beforeEach(() => {
    render(<Cards entities={entities} />);
  });

  describe('Entities', () => {
    it('should render the Cards page', () => {
      const heading = screen.getByRole('heading', { name: 'Cards' });
      expect(heading).toBeInTheDocument();
    });

    it('should render a card for every entity', () => {
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(3);
    });
  });

  describe('Search', () => {
    it('should return the correct search results on search', () => {
      const searchInput = screen.getByRole('textbox');

      fireEvent.change(searchInput, { target: { value: 'Entity 1' } });
      fireEvent.keyPress(searchInput, { key: 'Enter', code: 13 });

      expect(searchServiceMock).toHaveBeenCalledWith('Entity 1');

      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(1);
      expect(cards[0].textContent).toContain('Entity 1');
    });
  });
});
