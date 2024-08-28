import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const contentApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints(builder) {
    return {
      getChunks: builder.query({
        query(id) {
          return `chank${id}`;
        },
      }),
    };
  },
});

export const { useGetChunksQuery } = contentApi;
