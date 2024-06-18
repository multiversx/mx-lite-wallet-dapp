import {
  DefaultBodyType,
  GraphQLContext,
  GraphQLRequest,
  GraphQLVariables,
  ResponseComposition,
  RestContext,
  RestRequest
} from 'msw';

export const mockResponse =
  <T extends DefaultBodyType>(body: T) =>
  (
    _req: RestRequest,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext
  ) => {
    // return res(ctx.status(500), ctx.json({ error: 'Error' }));
    // return res(ctx.status(200), ctx.json([]));
    return res(ctx.status(200), ctx.json(body));
  };

export const mockErrorResponse =
  <T extends DefaultBodyType>(body: T) =>
  (
    _req: RestRequest,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext
  ) => {
    return res(ctx.status(400), ctx.json(body));
  };

export const mockGraphQLResponse =
  <T extends DefaultBodyType>(body: T, key?: string) =>
  (
    _: GraphQLRequest<GraphQLVariables>,
    res: ResponseComposition<DefaultBodyType>,
    ctx: GraphQLContext<Record<string, DefaultBodyType>>
  ) => {
    return res(ctx.data(key ? { [key]: body } : (body as any)));
  };

export const mockFetch = ({
  prop,
  response
}: {
  prop: string;
  response: string;
}) => {
  (global as any).fetch = jest.fn(
    () =>
      new Promise((res) =>
        res({
          [prop]: () => new Promise((resolve) => resolve(response))
        })
      )
  );
};
