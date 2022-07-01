import React from 'react';
import { Entity } from 'domains/Entity';

type CardViewProps = {
  entity: Entity;
};

const CardView = ({ entity }: CardViewProps) => (
  <article
    className={`card template-${entity.template._id} border border-neutral-200 rounded-md p-4`}
  >
    <header className="text-sm font-bold mb-2">
      <p className="template">{entity.template.name}</p>
    </header>
    <h2 className="title font-bold mb-4">{entity.title}</h2>
    <section className="metadata-section">
      <dl className="text-sm text-neutral-300">
        {entity.metadata.map(property => (
          <div key={property.name} className="metadata-property flex gap-2">
            <dt className="metadata-label italic text-neutral-500">{property.name}</dt>
            <dd className="metadata-value text-neutral-800">
              <ul>
                {property.values.map(val => (
                  <li key={val.value}>{val.value}</li>
                ))}
              </ul>
            </dd>
          </div>
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
