import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, PoundSterling, Receipt, TrendingDown, Info } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PayPeriod {
  value: string;
  label: string;
  multiplier: number;
}

const payPeriods: PayPeriod[] = [
  { value: "yearly", label: "Yearly", multiplier: 1 },
  { value: "monthly", label: "Monthly", multiplier: 12 },
  { value: "weekly", label: "Weekly", multiplier: 52 },
  { value: "daily", label: "Daily", multiplier: 260 }, // Assuming 5 days/week, 52 weeks
];

const IncomeTaxCalculator = () => {
  const [grossSalary, setGrossSalary] = useState(35000);
  const [payPeriod, setPayPeriod] = useState("yearly");
  const [pensionContribution, setPensionContribution] = useState(0);
  const [studentLoan, setStudentLoan] = useState("none");
  const [results, setResults] = useState({
    grossAnnual: 0,
    incomeTax: 0,
    nationalInsurance: 0,
    studentLoanRepayment: 0,
    pension: 0,
    totalDeductions: 0,
    netAnnual: 0,
    netMonthly: 0,
    netWeekly: 0,
    effectiveRate: 0
  });

  // 2024/25 Tax Rates
  const personalAllowance = 12570;
  const basicRateThreshold = 50270;
  const higherRateThreshold = 125140;

  const calculateTax = () => {
    const selectedPeriod = payPeriods.find(p => p.value === payPeriod);
    const annualGross = grossSalary * (selectedPeriod?.multiplier || 1);
    const pensionAmount = (annualGross * pensionContribution) / 100;
    const taxableIncome = Math.max(0, annualGross - pensionAmount - personalAllowance);

    // Income Tax Calculation
    let incomeTax = 0;
    if (taxableIncome > 0) {
      if (taxableIncome <= (basicRateThreshold - personalAllowance)) {
        incomeTax = taxableIncome * 0.20; // Basic rate 20%
      } else if (taxableIncome <= (higherRateThreshold - personalAllowance)) {
        incomeTax = (basicRateThreshold - personalAllowance) * 0.20 + (taxableIncome - (basicRateThreshold - personalAllowance)) * 0.40; // Higher rate 40%
      } else {
        incomeTax = (basicRateThreshold - personalAllowance) * 0.20 + (higherRateThreshold - basicRateThreshold) * 0.40 + (taxableIncome - (higherRateThreshold - personalAllowance)) * 0.45; // Additional rate 45%
      }
    }

    // National Insurance Calculation (2024/25 rates)
    let nationalInsurance = 0;
    const niThreshold = 12570;
    const niUpperThreshold = 50270;
    
    if (annualGross > niThreshold) {
      if (annualGross <= niUpperThreshold) {
        nationalInsurance = (annualGross - niThreshold) * 0.12; // 12% rate
      } else {
        nationalInsurance = (niUpperThreshold - niThreshold) * 0.12 + (annualGross - niUpperThreshold) * 0.02; // 2% rate above upper threshold
      }
    }

    // Student Loan Repayment
    let studentLoanRepayment = 0;
    if (studentLoan !== "none") {
      const thresholds = {
        plan1: 22015,
        plan2: 27295,
        plan4: 31395,
        plan5: 25000
      };
      
      const threshold = thresholds[studentLoan as keyof typeof thresholds] || 0;
      if (annualGross > threshold) {
        studentLoanRepayment = (annualGross - threshold) * 0.09; // 9% above threshold
      }
    }

    const totalDeductions = incomeTax + nationalInsurance + studentLoanRepayment + pensionAmount;
    const netAnnual = annualGross - totalDeductions;
    const effectiveRate = (totalDeductions / annualGross) * 100;

    setResults({
      grossAnnual: annualGross,
      incomeTax,
      nationalInsurance,
      studentLoanRepayment,
      pension: pensionAmount,
      totalDeductions,
      netAnnual,
      netMonthly: netAnnual / 12,
      netWeekly: netAnnual / 52,
      effectiveRate
    });
  };

  useEffect(() => {
    calculateTax();
  }, [grossSalary, payPeriod, pensionContribution, studentLoan]);

  const chartData = {
    labels: ['Take Home', 'Income Tax', 'National Insurance', 'Student Loan', 'Pension'],
    datasets: [
      {
        data: [
          results.netAnnual,
          results.incomeTax,
          results.nationalInsurance,
          results.studentLoanRepayment,
          results.pension
        ].filter(val => val > 0),
        backgroundColor: [
          'hsl(var(--chart-1))',
          'hsl(var(--chart-2))',
          'hsl(var(--chart-3))',
          'hsl(var(--chart-4))',
          'hsl(var(--chart-5))'
        ],
        borderColor: [
          'hsl(var(--chart-1))',
          'hsl(var(--chart-2))',
          'hsl(var(--chart-3))',
          'hsl(var(--chart-4))',
          'hsl(var(--chart-5))'
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
            const percentage = ((value / results.grossAnnual) * 100).toFixed(1);
            return `${context.label}: £${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <Layout>
      <SEO 
        title="UK Income Tax Calculator 2024/25 - Free PAYE Tax Calculator"
        description="Calculate your UK income tax, National Insurance, and take-home pay with our free 2024/25 tax calculator. Includes student loan repayments and pension contributions."
        keywords="UK income tax calculator, PAYE calculator, National Insurance calculator, take home pay calculator, UK tax rates 2024"
        canonical="https://toolkit-pro.lovable.app/income-tax-calculator"
      />
      
      <div className="container py-12">
        {/* Ad Space */}
        <div className="w-full h-20 bg-muted/30 rounded-lg flex items-center justify-center mb-8 text-muted-foreground">
          Advertisement Space (728x90)
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <Receipt className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">UK Income Tax Calculator 2024/25</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your income tax, National Insurance, and take-home pay with the latest UK tax rates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <Card className="lg:sticky lg:top-24 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Your Income Details
                </CardTitle>
                <CardDescription>
                  Enter your salary details to calculate your tax
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="salary">Gross Salary</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
                    <Input
                      id="salary"
                      type="number"
                      value={grossSalary}
                      onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="35000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pay Period</Label>
                  <Select value={payPeriod} onValueChange={setPayPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {payPeriods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pension">Pension Contribution (%)</Label>
                  <Input
                    id="pension"
                    type="number"
                    value={pensionContribution}
                    onChange={(e) => setPensionContribution(Number(e.target.value) || 0)}
                    placeholder="5"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Student Loan Plan</Label>
                  <Select value={studentLoan} onValueChange={setStudentLoan}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Student Loan</SelectItem>
                      <SelectItem value="plan1">Plan 1 (Pre-2012)</SelectItem>
                      <SelectItem value="plan2">Plan 2 (Post-2012)</SelectItem>
                      <SelectItem value="plan4">Plan 4 (Scotland)</SelectItem>
                      <SelectItem value="plan5">Plan 5 (Post-2023)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">Tax Year 2024/25</p>
                      <p className="text-amber-700 dark:text-amber-300">
                        Calculations based on current UK tax rates. Personal allowance: £{personalAllowance.toLocaleString()}
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

              {/* Take Home Summary */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PoundSterling className="h-6 w-6 text-green-600 dark:text-green-400" />
                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Take Home Pay</h3>
                    </div>
                    <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">
                      £{results.netAnnual.toLocaleString()} per year
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-green-600 dark:text-green-400 font-medium">Monthly</div>
                        <div className="text-green-800 dark:text-green-200 font-semibold">£{results.netMonthly.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-green-600 dark:text-green-400 font-medium">Weekly</div>
                        <div className="text-green-800 dark:text-green-200 font-semibold">£{results.netWeekly.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Tax Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2">
                      <span>Gross Annual Salary</span>
                      <span className="font-semibold">£{results.grossAnnual.toLocaleString()}</span>
                    </div>
                    <hr className="border-muted" />
                    
                    {results.pension > 0 && (
                      <div className="flex justify-between py-1 text-sm">
                        <span className="text-muted-foreground">- Pension Contribution</span>
                        <span>£{results.pension.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-1 text-sm">
                      <span className="text-muted-foreground">- Income Tax</span>
                      <span>£{results.incomeTax.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between py-1 text-sm">
                      <span className="text-muted-foreground">- National Insurance</span>
                      <span>£{results.nationalInsurance.toLocaleString()}</span>
                    </div>
                    
                    {results.studentLoanRepayment > 0 && (
                      <div className="flex justify-between py-1 text-sm">
                        <span className="text-muted-foreground">- Student Loan</span>
                        <span>£{results.studentLoanRepayment.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <hr className="border-muted" />
                    <div className="flex justify-between py-2 font-semibold">
                      <span>Net Annual Salary</span>
                      <span>£{results.netAnnual.toLocaleString()}</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground text-center">
                      Effective tax rate: {results.effectiveRate.toFixed(1)}%
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Tax Breakdown Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Desktop Ad Space */}
              <div className="hidden lg:block w-full h-20 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground">
                Advertisement Space (728x90)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IncomeTaxCalculator;