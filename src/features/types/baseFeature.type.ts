export type BasePayload<T> = {
  type: string;
  payload: T;
};

export type BaseInitialState = {
  id: string;
};
