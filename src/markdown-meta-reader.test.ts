import { MarkdownMetaReader } from '.';

describe('Test markdown meta reader', () => {
  const markdown = `
    ---
    slug: hello-world
    name: hello world
    date: 2021-12-25
    tags: [Blog, Typescript]
    ---
    
    # Hello World
    How are you?
    `;

  const markdownMetaReader = new MarkdownMetaReader();

  const response: BlogMetaData = {
    date: new Date(),
    name: '',
    slug: '',
    tags: [''],
  };

  const result = markdownMetaReader.ParseMarkdown<BlogMetaData>(
    markdown,
    response
  );

  const expectedMetaData: BlogMetaData = {
    slug: 'hello-world',
    name: 'hello world',
    date: new Date(2021, 11, 25),
    tags: ['Blog', 'Typescript'],
  };

  test('content starts with # Hello World', () => {
    const found = result.content.startsWith('\n    \n    # Hello World');
    expect(found).toBeTruthy();
  });

  test('meta data result', () => {
    expect(result.metaData.date).toStrictEqual(expectedMetaData.date);
    expect(result.metaData.name).toBe(expectedMetaData.name);
    expect(result.metaData.slug).toBe(expectedMetaData.slug);
    expect(JSON.stringify(result.metaData.tags.sort())).toBe(
      JSON.stringify(expectedMetaData.tags.sort())
    );
  });
});

class BlogMetaData {
  slug: string;
  name: string;
  date: Date;
  tags: string[];
}
