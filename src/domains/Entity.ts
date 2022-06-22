export interface EntityPlaceholder {
  _id: string;
  title: string;
}
export type PropertyValue = {
  value?: string | number;
  key?: string;
};

export interface Entity {
  _id: string;
  sharedId: string;
  title: string;
  creationDate: number;
  template: {
    _id: string;
    color: string;
    name: string;
  };
  metadata: {
    [propertyName: string]: {
      name: string;
      type: 'text' | 'numeric' | 'select' | 'date';
      showInCards: boolean;
      values: PropertyValue[];
    };
  };
}

export type ProcessedEntity = {
  title: string;
  template: {
    _id: string;
    color: string;
    name: string;
  };
  metadata: {
    name: string;
    value: string | number;
  }[];
};
