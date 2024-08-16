import { calculateFutureValue } from './utils';
test('calculateFutureValue', () => {
  const result = calculateFutureValue(1000, 200, 0.2, 5);
  const expected = 13071.25;
  expect(result.toFixed(2)).toEqual(expected.toFixed(2));
});