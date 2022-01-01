---
slug: blog-post
title: A blog post
date: 2021-12-25
excerpt: 'Christmas blogging'
tags: [Christmas, Blog]
---

# markdown-meta-reader
Read / strip meta data from markdown

## What?
Some markdown files contain meta data before the main content - below is an example 👇

~~~
---
slug: blog-post
title: A blog post
date: 2021-12-25
excerpt: 'Christmas blogging'
tags: [Christmas, Blog]
---
~~~

This package allows you to strongly type read meta data from markdown.
Additionaly, you can return the content of the markdown without the meta data.
This is useful where a 'markdown to html' package renders this section as a table - e.g. GitHub

Currently, this package will only read meta data from the first block.
This may change.
