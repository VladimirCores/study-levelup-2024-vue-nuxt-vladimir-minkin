import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URL,
  headers: {
    [import.meta.env.VITE_GRAPHQL_SERVER_SECRET_HEADER]: import.meta.env.VITE_GRAPHQL_SERVER_SECRET_VALUE
  }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
