import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation RegisterUserMutation($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export function registerUser(environment, email, password, onCompleted, onError) {
  const variables = { email, password };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError,
  });
}
