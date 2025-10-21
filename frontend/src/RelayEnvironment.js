import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

async function fetchGraphQL(params, variables) {
  const token = localStorage.getItem('token');
  const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return await response.json();
}

function fetchRelay(params, variables) {
  return fetchGraphQL(params, variables);
}

const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

export default RelayEnvironment;
