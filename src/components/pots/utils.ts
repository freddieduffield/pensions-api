export function calculateFutureValue(
  amount: number,
  monthlyContribution: number,
  annualInterestRate: number,
  years: number
) {
  if (!amount || !monthlyContribution || !annualInterestRate || !years) {
    return null;
  }

  const monthyInterestRate = annualInterestRate / 1200;
  const months = years * 12;

  const futureValue = monthlyContribution * (((1 + monthyInterestRate) ** months - 1) / monthyInterestRate) * (1 + monthyInterestRate) + amount * (1 + monthyInterestRate) ** months;

  return futureValue.toFixed(2);
}
