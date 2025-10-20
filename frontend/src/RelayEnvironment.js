import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchGraphQL(text, variables) {
  return fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: text, variables }),
  }).then((response) => response.json());
}

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});
