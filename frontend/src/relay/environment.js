import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function fetchGraphQL(text, variables) {
  const response = await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  return await response.json();
}

export const createEnvironment = () => {
  const network = Network.create(fetchGraphQL);
  const store = new Store(new RecordSource());

  return new Environment({
    network,
    store,
  });
};

export const environment = createEnvironment();
