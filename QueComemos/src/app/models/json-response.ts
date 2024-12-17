class Response<T> {
  ok!: boolean;
  message!: string;
  errorCode?: number;

  constructor() {}
}

export class JsonResponse<T> extends Response<T> {
  json!: T;
}
