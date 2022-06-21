import React from 'react';
import { EntityPlaceholder } from 'domains/Entity';

type CardProps = {
  entity: EntityPlaceholder;
};

const Card = ({ entity }: CardProps) => (
  <article>
    <h2>{entity.title}</h2>
  </article>
);

export { Card };
