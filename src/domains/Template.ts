export type PropertyTypes = 'text' | 'numeric' | 'select' | 'multiselect' | 'date';

interface CommonPropertyDefinition {
  _id: string;
  name: string;
  label: string;
  type: PropertyTypes;
  isCommonProperty?: boolean;
}

interface PropertyDefinition extends CommonPropertyDefinition {
  showInCard?: boolean;
  content?: string;
}

export interface Template {
  _id: string;
  name: string;
  color?: string;
  commonProperties: CommonPropertyDefinition[];
  properties: PropertyDefinition[];
}
