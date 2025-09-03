import { useState, useCallback, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Home, PoundSterling, Calendar, PieChart } from "lucide-react";
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
  const [loanAmount, setLoanAmount] = useState("250000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState([25]);
  const [downPayment, setDownPayment] = useState("50000");
  const [extraPayment, setExtraPayment] = useState("0");

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

  const pieData = results ? {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [results.principal, results.totalInterest],
        backgroundColor: [
          'hsl(221.2, 83.2%, 53.3%)',
          'hsl(262.1, 83.3%, 57.8%)',
        ],
        borderColor: [
          'hsl(221.2, 83.2%, 53.3%)',
          'hsl(262.1, 83.3%, 57.8%)',
        ],
        borderWidth: 1,
      },
    ],
  } : null;

  const barData = results ? {
    labels: results.schedule.map(item => `Month ${item.month}`),
    datasets: [
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          £{results.monthlyPayment.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">Monthly Payment</div>
                      </div>
                      <div className="text-center p-4 bg-accent/10 rounded-lg">
                        <div className="text-2xl font-bold text-accent">
                          £{results.totalInterest.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Interest</div>
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

            <div className="space-y-6">
              {results && pieData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Principal vs Interest
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <Pie data={pieData} options={chartOptions} />
                    </div>
                  </CardContent>
                </Card>
              )}

              {results && barData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      First Year Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <Bar data={barData} options={chartOptions} />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Mobile Ad Space */}
          <div className="mt-8 md:hidden">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border/20 rounded-lg p-4 text-center">
              <div className="h-16 flex items-center justify-center text-muted-foreground text-sm">
                Advertisement Space (Mobile)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MortgageCalculator;