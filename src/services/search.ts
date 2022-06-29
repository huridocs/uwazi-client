import { api } from 'api';
import { Template } from 'domains/Template';
import { Entity, Property, PropertyValue, RawEntity } from 'domains/Entity';

interface SearchResults {
  rows: Entity[];
}

const populateEntities = async (rawEntities: RawEntity[], domain: string) => {
  // This needs to be chaced somehow
  const templates: Template[] = (await api.get(domain, 'templates')).rows;

  const rows = rawEntities.map(rawEntity => {
    const currentTemplate = templates.find(template => template._id === rawEntity.template);
    const template = {
      _id: currentTemplate?._id,
      name: currentTemplate?.name,
      color: currentTemplate?.color || '#f00',
    };

    const metadata = (currentTemplate?.properties || []).reduce((newMetadata, propertyData) => {
      if (rawEntity.metadata[propertyData.name]) {
        const rawData = rawEntity.metadata[propertyData.name];

        const values = rawData.map(rawValue => {
          const newValue: PropertyValue = { value: rawValue.value };
          if (['select', 'multiselect'].includes(propertyData.type)) {
            newValue.value = rawValue.label;
            newValue.key = rawValue.value;
          }
          return newValue;
        });

        newMetadata.push({
          name: propertyData.label,
          property: propertyData.name,
          type: propertyData.type,
          featured: Boolean(propertyData.showInCard),
          values,
        });
      }

      return newMetadata;
    }, [] as Property[]);

    return { ...rawEntity, template, metadata } as Entity;
  });

  return rows;
};

const search = async (domain: string): Promise<SearchResults> => {
  const resp = await api.get(domain, 'search');
  const processedRows = await populateEntities(resp.rows, domain);
  return { ...resp, rows: processedRows };
};

export { search };
