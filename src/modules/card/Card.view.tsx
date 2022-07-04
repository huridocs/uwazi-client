import React from 'react';
import { Entity } from 'domains/Entity';

type CardViewProps = {
  entity: Entity;
};

const CardView = ({ entity }: CardViewProps) => (
  <article
    className={`card template-${entity.template._id} flex flex-col border border-neutral-300 rounded-md p-4 bg-white hover:border-neutral-500 hover:shadow-md`}
  >
    <header className="text-sm font-bold text-neutral-500 mb-2">
      <p className="template">{entity.template.name}</p>
    </header>
    <h2 className="title flex-1 text-sm font-bold mb-4">{entity.title}</h2>
    <section className="metadata-section">
      <dl className="text-sm text-neutral-300">
        {entity.metadata.map(property => (
          <div
            key={property.name}
            className="metadata-property inline after:content-['\0020|\0020'] last:after:content-none"
          >
            <dt className="metadata-label inline italic text-neutral-500 after:content-['\00A0']">
              {property.name}
            </dt>
            <dd className="metadata-value inline text-neutral-800">
              <ul className="inline">
                {property.values.map(val => (
                  <li
                    key={val.value}
                    className="inline after:content-[',\0020'] last:after:content-none"
                  >
                    {val.value}
                  </li>
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
