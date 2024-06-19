import { DefaultBodyType, HttpResponse } from 'msw';

export const mockResponse =
  <T extends DefaultBodyType>(body: T) =>
  () =>
    HttpResponse.json(body);

export const mockErrorResponse =
  <T extends BodyInit>(body: T) =>
  () =>
    new HttpResponse(body, {
      status: 400,
      statusText: 'Out Of Apples'
    });

export const mockGraphQLResponse =
  <T extends DefaultBodyType>(body: T, key?: string) =>
  () =>
    HttpResponse.json(key ? { [key]: body } : body);
