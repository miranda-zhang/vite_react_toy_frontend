/**
 * @generated SignedSource<<900725f0984adee20e5ed83433a35cef>>
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
    "name": "DashboardAddPhoneNumberMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DashboardAddPhoneNumberMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ed7a005057daf64bd1f48d41fa149294",
    "id": null,
    "metadata": {},
    "name": "DashboardAddPhoneNumberMutation",
    "operationKind": "mutation",
    "text": "mutation DashboardAddPhoneNumberMutation(\n  $phoneNumber: String!\n) {\n  addPhoneNumber(phoneNumber: $phoneNumber) {\n    id\n    email\n    name\n    phoneNumber\n  }\n}\n"
  }
};
})();

node.hash = "a0a40bb261aeb4e571e1677cd8bda957";

export default node;
