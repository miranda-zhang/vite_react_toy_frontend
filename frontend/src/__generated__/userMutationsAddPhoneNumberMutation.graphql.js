/**
 * @generated SignedSource<<21c558460560bb9d5a84495cdb94ec19>>
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
    "name": "phoneNumber"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "phoneNumber",
        "variableName": "phoneNumber"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "addPhoneNumber",
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
    "name": "userMutationsAddPhoneNumberMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userMutationsAddPhoneNumberMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "011826536a2d5669970640d59f9e0f02",
    "id": null,
    "metadata": {},
    "name": "userMutationsAddPhoneNumberMutation",
    "operationKind": "mutation",
    "text": "mutation userMutationsAddPhoneNumberMutation(\n  $phoneNumber: String!\n) {\n  addPhoneNumber(phoneNumber: $phoneNumber) {\n    id\n    email\n    name\n    phoneNumber\n  }\n}\n"
  }
};
})();

node.hash = "19d9b6cb80a53715e9e2c4c07818eb50";

export default node;
