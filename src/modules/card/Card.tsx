import React from 'react';
import { Entity } from 'domains/Entity';
import { CardView } from './Card.view';

type CardProps = {
  entity: Entity;
};

const formatMetadata = (metadata: Entity['metadata']) =>
  metadata.filter(property => property.featured);

const Card = ({ entity }: CardProps) => {
  const processedEntity: Entity = {
    ...entity,
    metadata: formatMetadata(entity.metadata),
  };

  return <CardView entity={processedEntity} />;
};

export { Card };
