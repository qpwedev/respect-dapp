import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  OperationVariables,
} from "@apollo/client/core";
import fetch from "node-fetch";
import { DocumentNode } from "graphql";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graph-query.goerli.linea.build/subgraphs/name/Consensys/linea-attestation-registry",
    fetch: fetch as any,
  }),
  cache: new InMemoryCache(),
});
