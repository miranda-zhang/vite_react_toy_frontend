
import { graphql } from 'react-relay';

export const RegisterUserMutation = graphql`
  mutation userMutationsRegisterUserMutation(
    $email: String!
    $password: String!
  ) {
    registerUser(email: $email, password: $password) {
      id
      email
      name
      phoneNumber
    }
  }
`;

export const LoginUserMutation = graphql`
  mutation userMutationsLoginUserMutation(
    $email: String!
    $password: String!
  ) {
    loginUser(email: $email, password: $password)
  }
`;

export const AddPhoneNumberMutation = graphql`
  mutation userMutationsAddPhoneNumberMutation(
    $phoneNumber: String!
  ) {
    addPhoneNumber(phoneNumber: $phoneNumber) {
      id
      email
      name
      phoneNumber
    }
  }
`;
