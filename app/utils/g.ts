import { graphql } from "@/src/generated/gql";

const c = graphql(`
  #graphql
  query he {
    posts {
      id
    }
  }
`);

// gql`
//   query he {
//     posts {
//       id
//       title
//     }
//   }
// `
