import React from 'react';
import { Entity } from 'domains/Entity';
import { CardView, CardView2, ProcessedEntity } from './Card.view';

type CardProps = {
  entity: Entity;
};

//we broke eslint

const Card = ({ entity }: CardProps) => {
  const processedEntity = {
    title: entity.title,
    template: entity.template,
    metadata: Object.values(entity.metadata).map(property => {
      return {
        name: property.name,
        value: property.values[0],
        showInCards: property.showInCards,
        type: property.type,
      };
    }),
  };

  return (
    <CardView>
      <Title>{processedEntity.title}</Title>
      <Metadata>
        {processedEntity.metadata.map(
          property => property.showInCards && <MetadataProperty property={property} />
        )}
      </Metadata>
    </CardView>
  );
};

const formatCardMetadata = (metadata: Entity['metadata']) => {
  return Object.values(metadata)
    .filter(property => property.showInCards && property.values[0].value)
    .map(property => {
      return { name: property.name, value: property.values[0].value! };
    });
};

const Card2 = ({ entity }: CardProps) => {
  const processedEntity: ProcessedEntity = {
    title: entity.title,
    template: entity.template,
    metadata: formatCardMetadata(entity.metadata),
  };

  return <CardView2 entity={processedEntity} />;
};

export { Card, Card2 };
