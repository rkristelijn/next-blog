# Next-blog

Gert's version

This is a simple blog application using Next.js and Markdown files for content. It's designed to be a starting point for building your own blog, where changing (creating, updating, deleting) blog posts will trigger a new build. 

NextJS' router will take care of navigating to the right page containing the blog post, reading the respective markdown file, and rendering the content. 

Detailed documentation can be found in the [./docs](docs) folder.

## Demo

https://next-blog.gert41jan.workers.dev

## Prerequisites

Node

## Getting started

- `npm start` - start the development server

## Testing

- `npm t` - run the tests
- `npm run lint` - checks for the proper markdown formatting

## Deploying

- merge your changes to the `main` branch and push to GitHub
- create a new GitHub release and select the latest release tag
- go to the GitHub Actions tab and select the workflow named `deploy`

## Resources

- https://github.com/zanicool/republicofzani
- https://opennext.js.org/cloudflare/get-started
- https://nextjs.org/docs/app/guides/mdx
- https://mui.com/material-ui/integrations/nextjs/
