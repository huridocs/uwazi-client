import { PropertyTypes } from './Template';

export interface EntityPlaceholder {
  _id: string;
  title: string;
}

export type PropertyValue = {
  value?: string | number;
  key?: string;
};

export interface RawEntity {
  _id: string;
  sharedId: string;
  title: string;
  creationDate: number;
  template: string;
  metadata: {
    [propertyName: string]: {
      label?: string;
      value: string;
    }[];
  };
}

export interface Property {
  name: string;
  property: string;
  type: PropertyTypes;
  featured: boolean;
  values: PropertyValue[] | [];
}

export interface Entity extends Omit<RawEntity, 'template' | 'metadata'> {
  template: {
    _id: string;
    name: string;
    color: string;
  };
  metadata: Property[];
}
