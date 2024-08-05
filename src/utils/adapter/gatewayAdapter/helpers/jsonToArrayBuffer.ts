export const jsonToArrayBuffer = (json: Record<string, unknown>) => {
  const jsonString = JSON.stringify(json);
  const encoder = new TextEncoder();
  const arrayBuffer = encoder.encode(jsonString);
  return arrayBuffer;
};
