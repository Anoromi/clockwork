import { readFileSync } from "fs";
import * as ts from "typescript";

function eachRecursive(
  obj,
) {
  let v =
    [];
  for (let i in obj) {
    if (typeof obj[i] === "string") {
      v.push(
        ts.factory.createPropertySignature(
          undefined,
          i,
          undefined,
          ts.factory.createTypeReferenceNode("string"),
        ),
      );
    } else if (typeof obj[i] === "object") {
      let object = obj[i];
      // as any as Record<string, unknown>
      let result = eachRecursive(object);
    }
  }
  return ts.factory.createTypeLiteralNode(v);
}

let result = eachRecursive(
  JSON.parse(readFileSync("./messages/en.json", "utf8")),
);

