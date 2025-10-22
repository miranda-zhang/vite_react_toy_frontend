/**
 * @generated SignedSource<<4bd41ff74df3bdf893bcb05c8d5efd20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginMeQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LoginMeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bbf1e930b1e289b1c4fabcec132905fd",
    "id": null,
    "metadata": {},
    "name": "LoginMeQuery",
    "operationKind": "query",
    "text": "query LoginMeQuery {\n  me {\n    id\n    email\n    name\n    phoneNumber\n  }\n}\n"
  }
};
})();

node.hash = "5411b68f8572c9f244e054c59f9fda5b";

export default node;
