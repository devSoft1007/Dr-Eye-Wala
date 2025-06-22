import { BaseInitialState } from './baseFeature.type';

export type UserSliceInitialState = BaseInitialState & {
  isAuth: boolean;
  isLoading: boolean;
  user: {
    id: number;
  };
  error: string | null;
};
