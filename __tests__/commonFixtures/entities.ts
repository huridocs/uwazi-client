import { Entity } from 'domains/Entity';

const entities: Entity[] = [
  {
    title: 'Entity 1',
    _id: 'entity1_en',
    sharedId: 'entity1',
    creationDate: 1234,
    template: { _id: '1', name: 'template1', color: '#fff' },
    metadata: {},
  },
  {
    title: 'Entity 2',
    _id: 'entity2_en',
    sharedId: 'entity2',
    creationDate: 1234,
    template: { _id: '1', name: 'template1', color: '#fff' },
    metadata: {},
  },
  {
    title: 'Entity 3',
    _id: 'entity3_en',
    sharedId: 'entity3',
    creationDate: 1234,
    template: { _id: '1', name: 'template1', color: '#fff' },
    metadata: {},
  },
];

export { entities };
