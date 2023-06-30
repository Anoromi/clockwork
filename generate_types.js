import * as ts from "typescript"
import { readFileSync } from "fs"

console.log(ts.factory)
// const file = ts.createSourceFile(
// 	"src/intl",
// 	"",
// 	ts.ScriptTarget.ESNext,
// 	false,
// 	ts.ScriptKind.TS
// )
// const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

// const stringTypeReference = ts.factory.createTypeReferenceNode("string");

// const uuidDecl = ts.factory.createTypeAliasDeclaration(
//   undefined, // decorators
//   undefined, // modifiers
//   ts.factory.createIdentifier("Uuid"), // name
//   undefined, // type parameters
//   stringTypeReference // aliased type
// );

// const result = printer.printNode(ts.EmitHint.Unspecified, uuidDecl, file);

// ts.factory.createFunct

function eachRecursive(obj
	// : Record<string, unknown>
) {
	let v
		// : ts.PropertySignature[]
		= []
	for (let i in obj) {
		if (typeof obj[i] === "string") {
			v.push(
				ts.factory.createPropertySignature(
					undefined,
					i,
					undefined,
					ts.factory.createTypeReferenceNode("string")
				)
			)
		} else if (typeof obj[i] === "object") {
			let object = obj[i]
			// as any as Record<string, unknown>
			let result = eachRecursive(object)

			// ts.factory.createPropertySignature(
			//   undefined,
			//   i,
			//   undefined,
			//   // ts.factory.createNode
			// )
		}
	}
	return ts.factory.createTypeLiteralNode(v)
}

let result = eachRecursive(JSON.parse(readFileSync("./messages/en.json", "utf8")))


console.log(result)


