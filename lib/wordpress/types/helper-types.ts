type Edge<T> = {
  node: T;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;
