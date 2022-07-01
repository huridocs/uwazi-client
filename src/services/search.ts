import { api } from 'api';
import { Template } from 'domains/Template';
import { Entity, Property, PropertyValue, RawEntity } from 'domains/Entity';

interface SearchResults {
  rows: Entity[];
}

const populateTemplate = (template: Template) => ({
  _id: template?._id,
  name: template?.name,
  color: template?.color || '#f00',
});

const formatMetadata = (template: Template, entity: RawEntity) =>
  (template?.properties || []).reduce((newMetadata, propertyData) => {
    if (entity.metadata[propertyData.name]) {
      const data = entity.metadata[propertyData.name];

      const values = data.map(value => {
        const newValue: PropertyValue = { value: value.value };
        if (['select', 'multiselect'].includes(propertyData.type)) {
          newValue.value = value.label;
          newValue.key = value.value;
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

const populateEntities = async (rawEntities: RawEntity[], domain: string) => {
  const templates: Template[] = (await api.get(domain, 'templates')).rows;

  const rows = rawEntities
    .map(rawEntity => {
      const currentTemplate = templates.find(template => template._id === rawEntity.template);
      if (currentTemplate) {
        const template = populateTemplate(currentTemplate);
        const metadata = formatMetadata(currentTemplate, rawEntity);
        return { ...rawEntity, template, metadata } as Entity;
      }

      return null;
    })
    .filter(row => row);

  return rows;
};

const search = async (domain: string): Promise<SearchResults> => {
  const resp = await api.get(domain, 'search');
  const processedRows = await populateEntities(resp.rows, domain);
  return { ...resp, rows: processedRows };
};

export { search };
