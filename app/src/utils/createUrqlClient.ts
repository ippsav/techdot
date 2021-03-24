import { dedupExchange } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  ProfileDocument,
  ProfileQuery,
  UpdateProfileMutation,
} from "../generated/graphql";
import { devtoolsExchange } from "@urql/devtools";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:7001/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    devtoolsExchange,
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
              () => ({
                me: null,
              })
            );
          },
          updateProfile: (result, _args, cache, _info) => {
            betterUpdateQuery<UpdateProfileMutation, ProfileQuery>(
              cache,
              { query: ProfileDocument },
              result,
              (r, query) => {
                const { userId, user, id } = query.profile!;
                if (r.updateProfile)
                  return {
                    profile: {
                      id,
                      avatar: r.updateProfile.avatar,
                      bio: r.updateProfile.bio,
                      userId,
                      user,
                    },
                  };
                else {
                  return query;
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    multipartFetchExchange,
  ],
});
