import { Entity } from 'domains/Entity';

const entities: Entity[] = [
  {
    _id: 'entityId1',
    sharedId: 'sharedId1',
    title: 'Entity 1 Title',
    template: { _id: 'templateId1', name: 'Template 1 Name', color: '#f00' },
    creationDate: 1234,
    metadata: [
      {
        property: 'prop1multiselect',
        name: 'Prop 1 Multiselect',
        type: 'multiselect',
        featured: true,
        values: [{ value: 'Value 1', key: 'thesaurusValue1' }],
      },
    ],
  },
  {
    _id: 'entityId2',
    sharedId: 'sharedId2',
    title: 'Entity 2 Title',
    template: { _id: 'templateId1', name: 'Template 1 Name', color: '#f00' },
    creationDate: 1234,
    metadata: [
      {
        property: 'prop1multiselect',
        name: 'Prop 1 Multiselect',
        type: 'multiselect',
        featured: true,
        values: [
          { value: 'Value 2', key: 'thesaurusValue2' },
          { value: 'Value 3', key: 'thesaurusValue3' },
        ],
      },
    ],
  },
  {
    _id: 'entityId3',
    sharedId: 'sharedId3',
    title: 'Entity 3 Title',
    template: { _id: 'templateId2', name: 'Template 2 Name', color: '#0f0' },
    creationDate: 1235,
    metadata: [
      {
        property: 'prop2select',
        name: 'Prop 2 Select',
        type: 'select',
        featured: true,
        values: [{ value: 'Value 2', key: 'thesaurusValue2' }],
      },
      {
        property: 'prop1text',
        name: 'Prop 1 Text',
        type: 'text',
        featured: false,
        values: [{ value: 'Prop 1 Text Value' }],
      },
    ],
  },
];

export { entities };
