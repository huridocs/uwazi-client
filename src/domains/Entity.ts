import { PropertyTypes } from './Template';
import { Entity as BackendEntity } from './BackendEntity';

export type PropertyValue = {
  value?: string | number;
  key?: string;
};

export interface Property {
  name: string;
  property: string;
  type: PropertyTypes;
  featured: boolean;
  values: PropertyValue[] | [];
}

export interface Entity extends Omit<BackendEntity, 'template' | 'metadata'> {
  template: {
    _id: string;
    name: string;
    color: string;
  };
  metadata: Property[];
}
