import React from 'react';
import { Entity, ProcessedEntity } from 'domains/Entity';
import { CardView } from './Card.view';

type CardProps = {
  entity: Entity;
};

const formatMetadata = (metadata: Entity['metadata']) =>
  Object.values(metadata)
    .filter(property => property.showInCards && property.values[0].value)
    .map(property => ({ name: property.name, value: property.values[0].value as string | number }));

const Card = ({ entity }: CardProps) => {
  const processedEntity: ProcessedEntity = {
    title: entity.title,
    template: entity.template,
    metadata: formatMetadata(entity.metadata),
  };

  return <CardView entity={processedEntity} />;
};

export { Card };
