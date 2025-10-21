/**
 * @generated SignedSource<<24fcc44c2dd6f0eb192d9b6766126d98>>
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
    "name": "LoginLoginUserMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginLoginUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "07dfea62f283f40a5f92fc901040c9be",
    "id": null,
    "metadata": {},
    "name": "LoginLoginUserMutation",
    "operationKind": "mutation",
    "text": "mutation LoginLoginUserMutation(\n  $email: String!\n  $password: String!\n) {\n  loginUser(email: $email, password: $password)\n}\n"
  }
};
})();

node.hash = "9d836891c83900a36440dd0208821dfc";

export default node;
