export function computeResult(fees: number[]) {
  // comput average result
  const average = fees.reduce((a, b) => a + b, 0) / fees.length;

  // comput median result
  let median = 0;
  fees.sort(function (a, b) {
    return a - b;
  });
  var half = Math.floor(fees.length / 2);

  if (fees.length % 2) median = fees[half];
  else median = (fees[half - 1] + fees[half]) / 2.0;

  // comput max result
  const max = Math.max(...fees);

  // comput min result
  const min = Math.min(...fees);

  return { average, median, min, max };
}
