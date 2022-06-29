import React from 'react';
import { Entity } from 'domains/Entity';

type CardViewProps = {
  entity: Entity;
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
          <React.Fragment key={property.name}>
            <dt>{property.name}:</dt>
            <dd>{property.values && property.values.length ? property.values[0].value : ''}</dd>
          </React.Fragment>
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
