import { graphql } from "@/src/generated/gql"
import { gql } from "@apollo/client"

const c = graphql(`#graphql
  query he {
    posts {
      id
    }
  }
`)

-- gql`
--   query he {
--     posts {
--       id
--       title
--     }
--   }
-- `
