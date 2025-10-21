import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export function loginUser(environment, email, password, onCompleted, onError) {
  const variables = { email, password };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError,
  });
}
