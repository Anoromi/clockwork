import { graphql } from "@/src/generated/gql"
import { gql } from "@apollo/client"

const c = graphql(`
  query he {
    posts {
      id
    }
  }
`)
