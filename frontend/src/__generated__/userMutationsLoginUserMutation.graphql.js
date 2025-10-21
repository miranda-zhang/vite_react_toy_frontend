/**
 * @generated SignedSource<<dd98585d85a8824e492ac05c498fb34b>>
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
    "kind": "ScalarField",
    "name": "loginUser",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "userMutationsLoginUserMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userMutationsLoginUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3a1ed4f2c7d9c2a30c6e30504b256190",
    "id": null,
    "metadata": {},
    "name": "userMutationsLoginUserMutation",
    "operationKind": "mutation",
    "text": "mutation userMutationsLoginUserMutation(\n  $email: String!\n  $password: String!\n) {\n  loginUser(email: $email, password: $password)\n}\n"
  }
};
})();

node.hash = "63ee93123c03262b9b3c24820411cb31";

export default node;
