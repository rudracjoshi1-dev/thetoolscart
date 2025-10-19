import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Calculator, PoundSterling, TrendingDown, Info, Clock, Target } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { CompareToggle } from "@/components/CompareToggle";
import { MaximizeChart } from "@/components/MaximizeChart";
import { RelatedTools } from "@/components/RelatedTools";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CreditCardCalculator = () => {
  const [isComparing, setIsComparing] = useState(false);
  
  // Scenario 1
  const [balance, setBalance] = useState(5000);
  const [interestRate, setInterestRate] = useState(18.9);
  const [monthlyPayment, setMonthlyPayment] = useState(100);
  
  // Scenario 2
  const [balance2, setBalance2] = useState(5000);
  const [interestRate2, setInterestRate2] = useState(15.9);
  const [monthlyPayment2, setMonthlyPayment2] = useState(150);
  
  const [results, setResults] = useState({
    timeToPayOff: 0,
    totalInterest: 0,
    totalAmount: 0,
    minimumPayment: 0,
    recommendedPayment: 0
  });
  
  const [results2, setResults2] = useState({
    timeToPayOff: 0,
    totalInterest: 0,
    totalAmount: 0,
    minimumPayment: 0,
    recommendedPayment: 0
  });

  const calculatePayoff = () => {
    const monthlyRate = interestRate / 100 / 12;
    let currentBalance = balance;
    let totalInterestPaid = 0;
    let months = 0;

    // Calculate minimum payment (typically 2-3% of balance)
    const minimumPayment = Math.max(25, balance * 0.025);
    
    // Recommended payment to pay off in 2-3 years
    const recommendedPayment = balance / 24 + (balance * monthlyRate);

    if (monthlyPayment <= minimumPayment && monthlyPayment < balance * monthlyRate) {
      // Payment too low, will never pay off
      setResults({
        timeToPayOff: 999,
        totalInterest: 999999,
        totalAmount: 999999,
        minimumPayment,
        recommendedPayment
      });
      return;
    }

    while (currentBalance > 0 && months < 600) { // Cap at 50 years
      const interestCharge = currentBalance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestCharge, currentBalance);
      
      if (principalPayment <= 0) {
        months = 999;
        break;
      }

      totalInterestPaid += interestCharge;
      currentBalance -= principalPayment;
      months++;
    }

    setResults({
      timeToPayOff: months,
      totalInterest: totalInterestPaid,
      totalAmount: balance + totalInterestPaid,
      minimumPayment,
      recommendedPayment
    });
  };

  const calculatePayoff2 = () => {
    const monthlyRate = interestRate2 / 100 / 12;
    let currentBalance = balance2;
    let totalInterestPaid = 0;
    let months = 0;

    const minimumPayment = Math.max(25, balance2 * 0.025);
    const recommendedPayment = balance2 / 24 + (balance2 * monthlyRate);

    if (monthlyPayment2 <= minimumPayment && monthlyPayment2 < balance2 * monthlyRate) {
      setResults2({
        timeToPayOff: 999,
        totalInterest: 999999,
        totalAmount: 999999,
        minimumPayment,
        recommendedPayment
      });
      return;
    }

    while (currentBalance > 0 && months < 600) {
      const interestCharge = currentBalance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment2 - interestCharge, currentBalance);
      
      if (principalPayment <= 0) {
        months = 999;
        break;
      }

      totalInterestPaid += interestCharge;
      currentBalance -= principalPayment;
      months++;
    }

    setResults2({
      timeToPayOff: months,
      totalInterest: totalInterestPaid,
      totalAmount: balance2 + totalInterestPaid,
      minimumPayment,
      recommendedPayment
    });
  };

  useEffect(() => {
    calculatePayoff();
    calculatePayoff2();
  }, [balance, interestRate, monthlyPayment, balance2, interestRate2, monthlyPayment2]);

  const formatMonths = (months: number) => {
    if (months >= 999) return "Never";
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
    return `${months} month${months !== 1 ? 's' : ''}`;
  };

  const chartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [balance, Math.max(0, results.totalInterest)],
        backgroundColor: [
          'hsl(142, 76%, 36%)', // Green for principal
          'hsl(0, 84%, 60%)',   // Red for interest
        ],
        borderColor: [
          'hsl(142, 76%, 36%)',
          'hsl(0, 84%, 60%)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const percentage = ((value / results.totalAmount) * 100).toFixed(1);
            return `${context.label}: £${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <Layout>
      <SEO 
        title="Credit Card Repayment Calculator - Free Debt Payoff Calculator"
        description="Calculate how long it will take to pay off your credit card debt and how much interest you'll pay. Free UK credit card calculator with payoff strategies."
        keywords="credit card calculator, debt payoff calculator, credit card repayment, debt calculator, UK credit card calculator"
        canonical="https://toolkit-pro.lovable.app/credit-card-calculator"
      />
      
      <div className="container py-12">

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Credit Card Repayment Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate how long it will take to pay off your credit card debt and discover strategies to become debt-free faster.
            </p>
          </div>

          <CompareToggle isComparing={isComparing} onToggle={() => setIsComparing(!isComparing)} />

          <div className={`grid grid-cols-1 ${isComparing ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
            {/* Input Panel - Scenario 1 */}
            <Card className="lg:sticky lg:top-24 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Your Credit Card Details
                </CardTitle>
                <CardDescription>
                  Enter your credit card information to calculate repayment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="balance">Current Balance</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
                    <Input
                      id="balance"
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(Number(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    placeholder="18.9"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment">Monthly Payment</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
                    <Input
                      id="payment"
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">Minimum Payment</div>
                    <div className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                      £{results.minimumPayment.toFixed(0)}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Recommended</div>
                    <div className="text-sm font-semibold text-green-900 dark:text-green-100">
                      £{results.recommendedPayment.toFixed(0)}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Quick Tip</p>
                      <p className="text-blue-700 dark:text-blue-300">
                        Paying more than the minimum can save you thousands in interest and years of payments.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Mobile Ad Space */}
              <div className="lg:hidden w-full h-16 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                Mobile Ad Space (320x50)
              </div>

              {/* Payoff Summary */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Time to Pay Off</h3>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4 break-words">
                      {formatMonths(results.timeToPayOff)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium">Total Interest</div>
                        <div className="text-sm sm:text-base text-purple-800 dark:text-purple-200 font-semibold break-words">
                          £{results.totalInterest < 999999 ? results.totalInterest.toLocaleString() : "∞"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium">Total Amount</div>
                        <div className="text-sm sm:text-base text-purple-800 dark:text-purple-200 font-semibold break-words">
                          £{results.totalAmount < 999999 ? results.totalAmount.toLocaleString() : "∞"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card className="relative">
                <MaximizeChart title="Payment Breakdown">
                  <div className="h-full">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                </MaximizeChart>
                <CardHeader>
                  <CardTitle>Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Debt Payoff Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Pay More Than Minimum</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Even an extra £20-50 per month can significantly reduce your payoff time and interest costs.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Debt Avalanche Method</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Pay minimums on all cards, then put extra money toward the highest interest rate card first.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Balance Transfer</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Consider transferring to a 0% APR card to save on interest, but watch for transfer fees.
                    </p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* How to Use Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How to Use This Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Step 1: Enter Your Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Current balance on your credit card</li>
                    <li>• Annual percentage rate (APR) from your statement</li>
                    <li>• How much you plan to pay each month</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Step 2: Review Results</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• See how long it will take to pay off your debt</li>
                    <li>• View total interest you'll pay</li>
                    <li>• Compare with minimum payment scenarios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What is Credit Card Repayment Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Understanding Credit Card Repayment</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">What is Credit Card Repayment?</h3>
                  <p className="text-sm text-muted-foreground">
                    Credit card repayment is the process of paying back money you've borrowed using your credit card. 
                    When you make purchases with a credit card, you're essentially taking a short-term loan from the 
                    card issuer that needs to be repaid with interest.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Terms:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><strong>Principal:</strong> The original amount you borrowed</li>
                      <li><strong>Interest (APR):</strong> The cost of borrowing, charged annually</li>
                      <li><strong>Minimum Payment:</strong> The smallest amount you must pay each month</li>
                      <li><strong>Balance:</strong> The total amount you currently owe</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Why Pay More Than Minimum?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Reduces total interest paid significantly</li>
                      <li>• Shortens repayment time dramatically</li>
                      <li>• Improves your credit utilization ratio</li>
                      <li>• Provides financial peace of mind</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Important Note</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This calculator provides estimates based on your inputs. Actual results may vary depending on 
                    changes in interest rates, additional charges, or spending patterns. Always refer to your 
                    credit card statement for the most accurate information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">What happens if I only pay the minimum payment?</h4>
                  <p className="text-sm text-muted-foreground">
                    Paying only the minimum keeps your account in good standing but dramatically extends repayment time and increases 
                    total interest. A £5,000 balance at 18.9% APR could take 30+ years to pay off with minimum payments only.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How is credit card interest calculated?</h4>
                  <p className="text-sm text-muted-foreground">
                    Credit cards use daily compounding. Your APR is divided by 365 to get a daily rate, which is applied to your 
                    balance each day. This is why paying more than the minimum or paying early in the billing cycle helps significantly.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Should I transfer my balance to a 0% card?</h4>
                  <p className="text-sm text-muted-foreground">
                    If you qualify, a 0% balance transfer can save hundreds or thousands in interest. However, check for transfer fees 
                    (typically 3-5%) and ensure you can pay off the balance before the promotional period ends.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How can I pay off my credit card faster?</h4>
                  <p className="text-sm text-muted-foreground">
                    Pay more than the minimum, make bi-weekly payments instead of monthly, stop using the card for new purchases, 
                    and use windfalls (tax refunds, bonuses) to make extra payments. Even an extra £50/month makes a huge difference.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Will paying off my credit card improve my credit score?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! Reducing your credit utilization ratio (balance ÷ credit limit) is one of the fastest ways to improve your 
                    credit score. Keep utilization below 30%, ideally below 10%, for the best scores.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <RelatedTools currentPath="/uk-credit-card-repayment-calculator" />
        </div>
      </div>
    </Layout>
  );
};

export default CreditCardCalculator;