export interface IElementData {
  id: number;
  name: string;
  isWhitelisted?: boolean;
  isPreSeason?: boolean;
}

export interface IScapesElementData {
  id: number;
  name: string;
  displayName: string;
  elements: IElementData[];
  orderId: number;
}

export interface IScapesElement {
  isPreSeason?: boolean;
  elementTypes: IScapesElementData[];
}
