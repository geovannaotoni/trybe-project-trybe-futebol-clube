export type ServiceResponseMessage = {
  message: string;
};

export type ServiceResponseError = {
  status: 'INVALID_DATA' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'INTERNAL_ERROR';
  data: ServiceResponseMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL';
  data: T;
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
