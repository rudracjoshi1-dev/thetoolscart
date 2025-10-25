import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Home, PoundSterling, Calendar, PieChart, AlertTriangle } from "lucide-react";
import { CompareToggle } from "@/components/CompareToggle";
import { MaximizeChart } from "@/components/MaximizeChart";
import { RelatedTools } from "@/components/RelatedTools";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MortgageCalculator = () => {
  const [isComparing, setIsComparing] = useState(false);
  
  // Scenario 1
  const [loanAmount, setLoanAmount] = useState("250000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState([25]);
  const [downPayment, setDownPayment] = useState("50000");
  const [extraPayment, setExtraPayment] = useState("0");
  
  // Scenario 2
  const [loanAmount2, setLoanAmount2] = useState("250000");
  const [interestRate2, setInterestRate2] = useState("6.0");
  const [loanTerm2, setLoanTerm2] = useState([25]);
  const [downPayment2, setDownPayment2] = useState("50000");
  const [extraPayment2, setExtraPayment2] = useState("0");

  const calculations = useCallback(() => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = loanTerm[0] * 12;
    const extraMonthly = parseFloat(extraPayment) || 0;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      return null;
    }

    // Calculate monthly payment
    const monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate total interest
    const totalInterest = (monthlyPayment * numberOfPayments) - principal;

    // Calculate amortization schedule (first 12 months)
    const schedule = [];
    let remainingBalance = principal;
    
    for (let month = 1; month <= Math.min(12, numberOfPayments); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment + extraMonthly;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);
      
      schedule.push({
        month,
        payment: monthlyPayment + extraMonthly,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }

    return {
      monthlyPayment,
      totalInterest,
      totalPayment: monthlyPayment * numberOfPayments,
      principal,
      schedule
    };
  }, [loanAmount, interestRate, loanTerm, downPayment, extraPayment]);

  const results = calculations();
  
  const calculations2 = useCallback(() => {
    const principal = parseFloat(loanAmount2) - parseFloat(downPayment2);
    const monthlyRate = parseFloat(interestRate2) / 100 / 12;
    const numberOfPayments = loanTerm2[0] * 12;
    const extraMonthly = parseFloat(extraPayment2) || 0;

    if (principal <= 0 || monthlyRate <= 0 || numberOfPayments <= 0) {
      return null;
    }

    const monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalInterest = (monthlyPayment * numberOfPayments) - principal;

    const schedule = [];
    let remainingBalance = principal;
    
    for (let month = 1; month <= Math.min(12, numberOfPayments); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment + extraMonthly;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);
      
      schedule.push({
        month,
        payment: monthlyPayment + extraMonthly,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }

    return {
      monthlyPayment,
      totalInterest,
      totalPayment: monthlyPayment * numberOfPayments,
      principal,
      schedule
    };
  }, [loanAmount2, interestRate2, loanTerm2, downPayment2, extraPayment2]);

  const results2 = calculations2();

  const pieData = results ? {
    labels: isComparing && results2 ? ['Scenario 1 Principal', 'Scenario 1 Interest', 'Scenario 2 Principal', 'Scenario 2 Interest'] : ['Principal', 'Interest'],
    datasets: [
      {
        data: isComparing && results2 
          ? [results.principal, results.totalInterest, results2.principal, results2.totalInterest]
          : [results.principal, results.totalInterest],
        backgroundColor: isComparing && results2
          ? ['hsl(221.2, 83.2%, 53.3%)', 'hsl(262.1, 83.3%, 57.8%)', 'hsl(142, 71%, 45%)', 'hsl(25, 95%, 53%)']
          : ['hsl(221.2, 83.2%, 53.3%)', 'hsl(262.1, 83.3%, 57.8%)'],
        borderColor: isComparing && results2
          ? ['hsl(221.2, 83.2%, 53.3%)', 'hsl(262.1, 83.3%, 57.8%)', 'hsl(142, 71%, 45%)', 'hsl(25, 95%, 53%)']
          : ['hsl(221.2, 83.2%, 53.3%)', 'hsl(262.1, 83.3%, 57.8%)'],
        borderWidth: 1,
      },
    ],
  } : null;

  const barData = results ? {
    labels: results.schedule.map(item => `Month ${item.month}`),
    datasets: isComparing && results2 
      ? [
          {
            label: 'Scenario 1 Principal',
            data: results.schedule.map(item => item.principal),
            backgroundColor: 'hsl(221.2, 83.2%, 53.3%)',
          },
          {
            label: 'Scenario 1 Interest',
            data: results.schedule.map(item => item.interest),
            backgroundColor: 'hsl(262.1, 83.3%, 57.8%)',
          },
          {
            label: 'Scenario 2 Principal',
            data: results2.schedule.map(item => item.principal),
            backgroundColor: 'hsl(142, 71%, 45%)',
          },
          {
            label: 'Scenario 2 Interest',
            data: results2.schedule.map(item => item.interest),
            backgroundColor: 'hsl(25, 95%, 53%)',
          },
        ]
      : [
          {
            label: 'Principal',
            data: results.schedule.map(item => item.principal),
            backgroundColor: 'hsl(221.2, 83.2%, 53.3%)',
          },
          {
            label: 'Interest',
            data: results.schedule.map(item => item.interest),
            backgroundColor: 'hsl(262.1, 83.3%, 57.8%)',
          },
        ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: window.innerWidth < 768 ? 0.8 : 1.5,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: window.innerWidth < 768 ? 10 : 15,
          font: {
            size: window.innerWidth < 768 ? 11 : 12,
          },
          boxWidth: window.innerWidth < 768 ? 30 : 40,
          boxHeight: window.innerWidth < 768 ? 12 : 14,
          usePointStyle: false
        },
      },
      tooltip: {
        padding: window.innerWidth < 768 ? 8 : 12,
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13
        },
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '£' + context.parsed.y.toFixed(2);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
          padding: window.innerWidth < 768 ? 4 : 8,
          callback: function(value: any) {
            if (window.innerWidth < 768) {
              // Shorter format for mobile
              if (value >= 1000) {
                return '£' + (value / 1000).toFixed(0) + 'k';
              }
              return '£' + value;
            }
            return '£' + value.toLocaleString();
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
    },
    layout: {
      padding: {
        left: window.innerWidth < 768 ? 5 : 10,
        right: window.innerWidth < 768 ? 10 : 20,
        top: window.innerWidth < 768 ? 5 : 10,
        bottom: window.innerWidth < 768 ? 5 : 10
      }
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mortgage Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate your monthly mortgage payments and visualize the breakdown.
            </p>
          </div>

          <CompareToggle isComparing={isComparing} onToggle={() => setIsComparing(!isComparing)} />

          <div className={`grid grid-cols-1 ${isComparing ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Loan Details
                  </CardTitle>
                  <CardDescription>
                    Enter your mortgage information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Home Price</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="300000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="60000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="6.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Loan Term: {loanTerm[0]} years</Label>
                    <Slider
                      value={loanTerm}
                      onValueChange={setLoanTerm}
                      max={40}
                      min={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10 years</span>
                      <span>40 years</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="extraPayment">Extra Monthly Payment (Optional)</Label>
                    <Input
                      id="extraPayment"
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </CardContent>
              </Card>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 sm:p-4 bg-primary/10 rounded-lg">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary break-words">
                          £{results.monthlyPayment.toFixed(2)}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Monthly Payment</div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-accent/10 rounded-lg">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-accent break-words">
                          £{results.totalInterest.toFixed(2)}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Total Interest</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span className="font-semibold">£{results.principal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total of Payments:</span>
                        <span className="font-semibold">£{results.totalPayment.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {isComparing && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Scenario 2 - Loan Details
                    </CardTitle>
                    <CardDescription>
                      Enter comparison mortgage information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount2">Home Price</Label>
                      <Input
                        id="loanAmount2"
                        type="number"
                        value={loanAmount2}
                        onChange={(e) => setLoanAmount2(e.target.value)}
                        placeholder="300000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downPayment2">Down Payment</Label>
                      <Input
                        id="downPayment2"
                        type="number"
                        value={downPayment2}
                        onChange={(e) => setDownPayment2(e.target.value)}
                        placeholder="60000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interestRate2">Interest Rate (%)</Label>
                      <Input
                        id="interestRate2"
                        type="number"
                        step="0.1"
                        value={interestRate2}
                        onChange={(e) => setInterestRate2(e.target.value)}
                        placeholder="6.5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Loan Term: {loanTerm2[0]} years</Label>
                      <Slider
                        value={loanTerm2}
                        onValueChange={setLoanTerm2}
                        max={40}
                        min={10}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>10 years</span>
                        <span>40 years</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="extraPayment2">Extra Monthly Payment (Optional)</Label>
                      <Input
                        id="extraPayment2"
                        type="number"
                        value={extraPayment2}
                        onChange={(e) => setExtraPayment2(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </CardContent>
                </Card>

                {results2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Scenario 2 - Payment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 sm:p-4 bg-green-500/10 rounded-lg">
                          <div className="text-lg sm:text-xl md:text-2xl font-bold break-words" style={{color: 'hsl(142, 71%, 45%)'}}>
                            £{results2.monthlyPayment.toFixed(2)}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">Monthly Payment</div>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-orange-500/10 rounded-lg">
                          <div className="text-lg sm:text-xl md:text-2xl font-bold break-words" style={{color: 'hsl(25, 95%, 53%)'}}>
                            £{results2.totalInterest.toFixed(2)}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">Total Interest</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Loan Amount:</span>
                          <span className="font-semibold">£{results2.principal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total of Payments:</span>
                          <span className="font-semibold">£{results2.totalPayment.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <div className="space-y-6">
              {results && pieData && (
                <Card className="relative">
                  <MaximizeChart title="Principal vs Interest">
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <div className="w-full max-w-2xl aspect-square">
                        <Pie data={pieData} options={chartOptions} />
                      </div>
                    </div>
                  </MaximizeChart>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Principal vs Interest
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-full h-48 sm:h-56 md:h-64 flex items-center justify-center">
                      <div className="w-full h-full max-w-xs sm:max-w-sm">
                        <Pie data={pieData} options={chartOptions} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {results && barData && (
                <Card className="relative">
                  <MaximizeChart title="Payment Comparison">
                    <div className="h-full">
                      <Bar data={barData} options={barChartOptions} />
                    </div>
                  </MaximizeChart>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      First Year Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-6">
                    <div className="h-[450px] sm:h-[400px] md:h-[450px] w-full">
                      <Bar data={barData} options={barChartOptions} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 space-y-8">
            {/* How to Use */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use the Mortgage Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Step-by-Step Guide:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Enter the total price of the home you're considering</li>
                      <li>Input your planned down payment amount</li>
                      <li>Set the annual interest rate (check current rates with lenders)</li>
                      <li>Choose your preferred loan term (typically 15-30 years)</li>
                      <li>Add any extra monthly payments if applicable</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Understanding the Results:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Monthly Payment:</strong> Your principal and interest payment</li>
                      <li><strong>Total Interest:</strong> Amount paid in interest over the loan term</li>
                      <li><strong>Principal vs Interest Chart:</strong> Shows the breakdown of your total payments</li>
                      <li><strong>First Year Payments:</strong> How much goes to principal vs interest initially</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* What is a Mortgage */}
            <Card>
              <CardHeader>
                <CardTitle>Understanding Mortgages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  A mortgage is a loan specifically used to purchase real estate, where the property itself serves as collateral. 
                  This means if you're unable to make payments, the lender can foreclose on the property to recover their money.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Components:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Principal:</strong> The amount you borrow</li>
                      <li><strong>Interest:</strong> The cost of borrowing money</li>
                      <li><strong>Term:</strong> How long you have to repay (15-30 years typically)</li>
                      <li><strong>Down Payment:</strong> Upfront payment (usually 5-20% of home price)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Additional Costs to Consider:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Property taxes</li>
                      <li>Homeowners insurance</li>
                      <li>Private mortgage insurance (PMI) if down payment &lt; 20%</li>
                      <li>Closing costs and fees</li>
                      <li>Maintenance and repairs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Mortgage Tips for Better Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Improve Your Credit</h4>
                    <p className="text-sm">A higher credit score can qualify you for better interest rates, potentially saving thousands over the loan term.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Save for Larger Down Payment</h4>
                    <p className="text-sm">20% down payment eliminates PMI and reduces monthly payments. Even 10-15% can make a significant difference.</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Shop Around</h4>
                    <p className="text-sm">Compare rates from multiple lenders. Even a 0.25% difference in interest rate can save thousands of pounds.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">What is included in my monthly payment?</h4>
                  <p className="text-sm text-muted-foreground">
                    This calculator shows your principal and interest payment only. Your actual monthly payment may also include 
                    property taxes, homeowners insurance, HOA fees, and PMI if your down payment is less than 20%.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How much should I put down as a deposit?</h4>
                  <p className="text-sm text-muted-foreground">
                    While 20% is ideal to avoid PMI, many lenders offer mortgages with 5-10% down. A larger down payment reduces your 
                    monthly payments and total interest paid, but consider keeping an emergency fund.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What's a good interest rate?</h4>
                  <p className="text-sm text-muted-foreground">
                    Interest rates vary based on market conditions, your credit score, and loan type. Check current rates with multiple 
                    lenders, as even a 0.25% difference can save thousands over the loan term.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Should I choose a 15-year or 30-year mortgage?</h4>
                  <p className="text-sm text-muted-foreground">
                    15-year mortgages have higher monthly payments but lower interest rates and significantly less total interest paid. 
                    30-year mortgages offer lower monthly payments but higher total interest. Choose based on your budget and goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How do extra payments help?</h4>
                  <p className="text-sm text-muted-foreground">
                    Extra payments go directly toward your principal, reducing the total interest paid and shortening your loan term. 
                    Even an extra £50-100 per month can save thousands in interest.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mt-8 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">Important Disclaimer</p>
                  <p className="text-amber-700 dark:text-amber-300">
                    This calculator provides estimates only and should not be considered financial advice. Actual mortgage terms, 
                    rates, and payments may vary. Consult with qualified mortgage professionals for accurate quotes and advice. 
                    <a href="/disclaimer" className="underline">Read our full disclaimer</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <RelatedTools currentPath="/uk-mortgage-payment-calculator-online" />

          {/* Mobile Ad Space */}
          <div className="mt-8 md:hidden">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border/20 rounded-lg p-4 text-center">
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MortgageCalculator;