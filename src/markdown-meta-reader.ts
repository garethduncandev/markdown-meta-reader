import { MarkdownMetaReaderResult } from './markdown-meta-reader-result';
import { MetaProperties } from './models/meta-properties';
import { MetaResponse } from './models/meta-response.model';

class TheOtherType {}

export class MarkdownMetaReader {
  public ParseMarkdown<T extends object>(
    markdown: string,
    response: T
  ): MarkdownMetaReaderResult<T> {
    const metaData = this.getMetaData<T>(markdown, response);
    const content: string = this.getMarkdownContent(markdown);
    const result = new MarkdownMetaReaderResult<T>(metaData, content);
    return result;
  }

  private getMarkdownContent(markdown: string): string {
    return markdown.split('---')[2];
  }

  private getMetaData<T>(markdown: string, response: T): T {
    const metaProperties = this.getMetaProperties(markdown);
    const parsedProperties = this.parseMetaData<T>(metaProperties, response);
    return parsedProperties;
  }

  private getMetaProperties(markdown: string): MetaProperties[] {
    const metaLines = markdown.split('---')[1].split(/\r?\n/);
    const startIndex = metaLines.indexOf('---') + 1;
    const endIndex = metaLines.indexOf('---', startIndex);
    const values = metaLines.slice(startIndex, endIndex);

    const properties: MetaProperties[] = values.map((x) => {
      const split = x.split(':');
      return { name: split[0]?.trim(), value: split[1]?.trim() };
    });

    return properties;
  }

  private parseMetaData<T>(metaProperties: MetaProperties[], response: T): T {
    const meta = response;

    for (const property of metaProperties) {
      const prop = (<any>meta)[property.name];

      if (prop instanceof Date) {
        (<any>meta)[property.name] = this.getMetaDate(
          property.name,
          metaProperties
        );
      } else if (prop instanceof Array) {
        (<any>meta)[property.name] = this.getMetaArray(
          property.name,
          metaProperties
        );
      } else {
        (<any>meta)[property.name] = this.getMetaValue(
          property.name,
          metaProperties
        );
      }
    }

    // for (const property in T) return x;

    // meta.title = this.getMetaValue('title', metaProperties);
    // meta.date = this.getMetaDate('date', metaProperties);
    // meta.excerpt = this.getMetaValue('excerpt', metaProperties);
    // meta.slug = this.getMetaValue('slug', metaProperties);
    // meta.tags = this.getMetaArray('tags', metaProperties);
    // return meta;

    return meta;
  }

  private getMetaDate(name: string, metaProperties: MetaProperties[]): Date {
    const value = this.getMetaValue(name, metaProperties);
    const date = new Date(value);
    return date;
  }

  private getMetaValue(name: string, metaProperties: MetaProperties[]): string {
    return metaProperties.find((x) => x.name === name)?.value ?? '';
  }

  private getMetaArray(
    name: string,
    metaProperties: MetaProperties[]
  ): string[] {
    const value = this.getMetaValue(name, metaProperties);
    return this.yamlArrayToJsonArray(value);
  }

  private yamlArrayToJsonArray(yamlValue: string): string[] {
    // Remove opening and closing square brackets
    const stripped = yamlValue.split('[')[1].split(']')[0];

    // Convert into string array
    const array = stripped.split(',').map((x) => x.trim());

    return array;
  }
}
