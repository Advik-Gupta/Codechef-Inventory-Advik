import { USERS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation } = usersSlice;
