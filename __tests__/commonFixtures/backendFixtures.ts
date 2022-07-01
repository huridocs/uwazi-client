import { RawEntity } from 'domains/Entity';
import { Template } from 'domains/Template';

interface Fixtures {
  templates: Template[];
  entities: RawEntity[];
}

const backendFixtures: Fixtures = {
  templates: [
    {
      _id: 'templateId1',
      color: '#f00',
      name: 'Template 1 Name',
      commonProperties: [],
      properties: [
        {
          _id: '1',
          name: 'prop1multiselect',
          type: 'multiselect',
          label: 'Prop 1 Multiselect',
          showInCard: true,
        },
      ],
    },
    {
      _id: 'templateId2',
      color: '#0f0',
      name: 'Template 2 Name',
      commonProperties: [],
      properties: [
        { _id: '1', name: 'prop2select', type: 'select', label: 'Prop 2 Select', showInCard: true },
        { _id: '2', name: 'prop1text', type: 'text', label: 'Prop 1 Text', showInCard: false },
      ],
    },
  ],
  entities: [
    {
      _id: 'entityId1',
      sharedId: 'sharedId1',
      title: 'Entity 1 Title',
      template: 'templateId1',
      creationDate: 1234,
      metadata: {
        prop1multiselect: [{ label: 'Value 1', value: 'thesaurusValue1' }],
      },
    },
    {
      _id: 'entityId2',
      sharedId: 'sharedId2',
      title: 'Entity 2 Title',
      template: 'templateId1',
      creationDate: 1234,
      metadata: {
        prop1multiselect: [
          { label: 'Value 2', value: 'thesaurusValue2' },
          { label: 'Value 3', value: 'thesaurusValue3' },
        ],
      },
    },
    {
      _id: 'entityId3',
      sharedId: 'sharedId3',
      title: 'Entity 3 Title',
      template: 'templateId2',
      creationDate: 1235,
      metadata: {
        prop1text: [{ value: 'Prop 1 Text Value' }],
        prop2select: [{ label: 'Value 2', value: 'thesaurusValue2' }],
      },
    },
    {
      _id: 'entityId4',
      sharedId: 'sharedId4',
      title: 'Entity 4 with wrong template',
      template: 'templateIdWrong',
      creationDate: 1235,
      metadata: {},
    },
  ],
};

export { backendFixtures };
