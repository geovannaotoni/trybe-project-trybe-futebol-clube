export type ServiceResponseError = {
  status: 'INVALID_DATA' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'INTERNAL_ERROR';
  data: { message: string };
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL';
  data: T;
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
