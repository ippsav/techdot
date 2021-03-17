import { dedupExchange, fetchExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:7001/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (r, query) => {
                if (!r.login.user) {
                  return query;
                }
                return {
                  me: r.login.user,
                };
              }
            );
          },
          logout: (result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (r, query) => {
                if (!r.logout.valueOf()) {
                  return query;
                }
                return {
                  me: null,
                };
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
