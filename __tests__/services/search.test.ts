import { api } from 'api';
import { Entity, RawEntity } from 'domains/Entity';
import { Template } from 'domains/Template';
import { search } from 'services/search';

interface Fixtures {
  templates: Template[];
  entities: RawEntity[];
}

const backendResultsFixtures: Fixtures = {
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

const expectedReults: Entity[] = [
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

describe('search', () => {
  beforeEach(() => {
    const apiGetSpy = jest.spyOn(api, 'get');
    apiGetSpy.mockImplementation(async (_domain, url) => {
      switch (url) {
        case 'search':
          return { rows: backendResultsFixtures.entities };
        case 'templates':
          return { rows: backendResultsFixtures.templates };
      }
    });
  });

  it('should fetch and parse the search endpoint', async () => {
    const results = await search('domain');
    expect(results).toEqual({ rows: expectedReults });
  });
});
