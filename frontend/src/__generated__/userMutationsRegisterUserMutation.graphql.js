/**
 * @generated SignedSource<<acd26f8ef7ca188f5f6b6efcba2a6c6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "registerUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "phoneNumber",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "userMutationsRegisterUserMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userMutationsRegisterUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "04aa200020f5b85c12b449f816041120",
    "id": null,
    "metadata": {},
    "name": "userMutationsRegisterUserMutation",
    "operationKind": "mutation",
    "text": "mutation userMutationsRegisterUserMutation(\n  $email: String!\n  $password: String!\n) {\n  registerUser(email: $email, password: $password) {\n    id\n    email\n    name\n    phoneNumber\n  }\n}\n"
  }
};
})();

node.hash = "f4067f95d547c3f4bf4ef6df7cf34748";

export default node;
