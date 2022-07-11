import { api } from 'api';
import { PropertyTypes, Template } from 'domains/Template';
import { Entity, Property, PropertyValue } from 'domains/Entity';
import { Entity as BackendEntity, Property as BackendProperty } from 'domains/BackendEntity';

interface SearchResults {
  rows: Entity[];
}

const populateTemplate = (template: Template) => ({
  _id: template?._id,
  name: template?.name,
  color: template?.color || '#f00',
});

const sanitizeLabelToValue = (type: PropertyTypes, data: BackendProperty[]) =>
  data.map(value => {
    const newValue: PropertyValue = { value: value.value };
    if (['select', 'multiselect'].includes(type)) {
      newValue.value = value.label;
      newValue.key = value.value;
    }
    return newValue;
  });

const formatMetadata = (template: Template, entity: BackendEntity) =>
  (template?.properties || []).reduce((newMetadata, propertyData) => {
    if (entity.metadata[propertyData.name]) {
      const data = entity.metadata[propertyData.name];
      const values = sanitizeLabelToValue(propertyData.type, data);

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

const populateEntities = async (rawEntities: BackendEntity[]) => {
  const templates: Template[] = (await api.get('templates')).rows;

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

const search = async (): Promise<SearchResults> => {
  const resp = await api.get('search');
  const processedRows = await populateEntities(resp.rows);
  return { ...resp, rows: processedRows };
};

export { search };
