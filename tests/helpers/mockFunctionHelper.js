export function getArgsInLastCall(mockFn) {
  const { calls } = mockFn.mock;
  return calls[calls.length - 1];
}
