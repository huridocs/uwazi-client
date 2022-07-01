export interface Property {
  label?: string;
  value: string;
}

export interface Entity {
  _id: string;
  sharedId: string;
  title: string;
  creationDate: number;
  template: string;
  metadata: {
    [propertyName: string]: Property[];
  };
}
