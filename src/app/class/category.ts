export class Category {
  name: string;
  attribute?: string;
  constructor(name: string, attribute?: string) {
    this.name = name;
    this.attribute = attribute;
  }
}
