import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  documents: ['app/**/*.{tsx,ts}'],
  ignoreNoDocuments: true,
  generates: {
    './src/generated/gql/': {
      preset: 'client',
    },
    './src/generated/resolver-types.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
}
export default config;