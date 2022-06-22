import { ProcessedEntity } from 'domains/Entity';

type CardViewProps = {
  children: JSX.Element[] | JSX.Element;
};

const CardView = ({ children }: CardViewProps) => {
  return (
    <article>
      <header>
        <p>Template name</p>
      </header>
      <h2>Entity title</h2>
      <section>
        <dl>
          <dt>Property 1 name:</dt>
          <dd>Property 1 value</dd>
          <dt>Property 2 name:</dt>
          <dd>Property 2 value</dd>
        </dl>
      </section>
      <footer>
        <span>Tags</span>
        <span>Action buttons</span>
      </footer>
    </article>
  );
};

type CardView2Props = {
  entity: ProcessedEntity;
};

const CardView2 = ({ entity }: CardView2Props) => {
  return (
    <article>
      <header>
        <p>{entity.template.name}</p>
      </header>
      <h2>{entity.title}</h2>
      <section>
        <dl>
          {entity.metadata.map(property => {
            return (
              <>
                <dt>{property.name}:</dt>
                <dd>{property.value}</dd>
              </>
            );
          })}
        </dl>
      </section>
      <footer>
        <span>Tags</span>
        <span>Action buttons</span>
      </footer>
    </article>
  );
};

export type { ProcessedEntity };
export { CardView, CardView2 };
