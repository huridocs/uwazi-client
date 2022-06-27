import React from 'react';
import { ProcessedEntity } from 'domains/Entity';

type CardViewProps = {
  entity: ProcessedEntity;
};

const CardView = ({ entity }: CardViewProps) => (
  <article>
    <header>
      <p>{entity.template.name}</p>
    </header>
    <h2>{entity.title}</h2>
    <section>
      <dl>
        {entity.metadata.map(property => (
          <>
            <dt>{property.name}:</dt>
            <dd>{property.value}</dd>
          </>
        ))}
      </dl>
    </section>
    <footer>
      <span>Tags</span>
      <span>Action buttons</span>
    </footer>
  </article>
);

export { CardView };
