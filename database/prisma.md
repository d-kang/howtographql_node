```
❯ prisma deploy
Deploying service `database` to stage `dev` to server `prisma-us1` 242ms

Changes:

  Link (Type)
  + Created type `Link`
  + Created field `id` of type `GraphQLID!`
  + Created field `createdAt` of type `DateTime!`
  + Created field `description` of type `String!`
  + Created field `url` of type `String!`
  + Created field `updatedAt` of type `DateTime!`

Applying changes 4.3s

Your Prisma GraphQL database endpoint is live:

  HTTP:  https://us1.prisma.sh/david-kang/database/dev
  WS:    wss://us1.prisma.sh/david-kang/database/dev

```

Once the command has finished running, the CLI outputs the endpoint for the Prisma GraphQL API. It will look somewhat similar to this: `https://eu1.prisma.sh/public-graytracker-771/hackernews-node/dev`.

Here's how the URL is composed:

- `eu1.prisma.sh`: The domain of your cluster
- `public-graytracker-771`: A randomly generated ID for your service
- `hackernews-node`: The service name from `prisma.yml`
- `dev`: The deployment stage from `prisma.yml`



In future deploys (e.g. after you made changes to the data model), you won't be prompted where to deploy the service any more - the CLI will read the endpoint URL from `prisma.yml`.

