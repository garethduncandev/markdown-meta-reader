interface IMetaResponse<T> {
  new (): T;
}

export class MetaResponse<T> {
  metaResponse: T;

  constructor(type: IMetaResponse<T>) {
    this.metaResponse = new type();
  }
}
