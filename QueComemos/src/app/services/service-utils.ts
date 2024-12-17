import { JsonResponse } from "../models/json-response";

export class ServiceUtils {}

export const handleResponse = (response: JsonResponse<any>) => {
  if (response.ok) {
    return JSON.parse(JSON.stringify(response.json));
  } else {
    throw new Error(`${response.message}`);
  }
};