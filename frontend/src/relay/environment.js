import { Environment, Network, RecordSource, Store } from 'relay-runtime';

async function fetchGraphQL(params, variables) {
  // Retrieve the JWT token (adjust depending on your app)
  const token = localStorage.getItem('authToken'); 
  // or, if your AuthContext stores it somewhere globally accessible:
  // const token = getAuthToken(); 

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(import.meta.env.VITE_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return await response.json();
}

export const createEnvironment = () => {
  const network = Network.create(fetchGraphQL);
  const store = new Store(new RecordSource());

  return new Environment({ network, store });
};

export const environment = createEnvironment();
