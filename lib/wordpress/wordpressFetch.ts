"use server";

import { ExtractVariables } from "./types";

export async function wordPressFetch<T>({
  cache = "force-cache",
  headers,
  query,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(process.env.WP_GRAPHQL_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return { status: result.status, body };
  } catch (error) {
    throw {
      error,
      query,
    };
  }
}
