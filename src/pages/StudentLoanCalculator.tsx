import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, Calculator, Share, TrendingUp, Clock, PoundSterling, Target, BarChart3, LineChart, Info } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { CompareToggle } from "@/components/CompareToggle";
import { MaximizeChart } from "@/components/MaximizeChart";
import { RelatedTools } from "@/components/RelatedTools";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(40000);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);
  const [repaymentPlan, setRepaymentPlan] = useState("plan2");
  const [currentSalary, setCurrentSalary] = useState(25000);
  const [salaryGrowthRate, setSalaryGrowthRate] = useState(3);
  const [courseStartYear, setCourseStartYear] = useState(2023);
  const [courseDuration, setCourseDuration] = useState(3);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    payoffDate: "",
    totalAmount: 0,
    yearlyBreakdown: [] as Array<{year: number, balance: number, payment: number, interest: number, salary: number}>
  });

  const calculateLoan = () => {
    const thresholds = {
      plan1: 22015,
      plan2: 27295,
      plan4: 27660,
      plan5: 25000,
      postgrad: 21000
    };

    const rates = {
      plan1: 9,
      plan2: 9,
      plan4: 9,
      plan5: 9,
      postgrad: 6
    };

    const threshold = thresholds[repaymentPlan as keyof typeof thresholds];
    const rate = rates[repaymentPlan as keyof typeof rates];

    let currentBalance = loanAmount;
    let totalInterestPaid = 0;
    let currentSalaryAmount = currentSalary;
    let years = 0;
    const yearlyBreakdown = [];

    // Simulate repayment year by year
    while (currentBalance > 0 && years < loanTerm) {
      const yearStart = currentBalance;
      let annualPayment = 0;
      
      if (currentSalaryAmount > threshold) {
        annualPayment = (currentSalaryAmount - threshold) * (rate / 100);
      }

      const annualInterest = currentBalance * (interestRate / 100);
      totalInterestPaid += annualInterest;
      
      if (annualPayment > annualInterest) {
        currentBalance = Math.max(0, currentBalance + annualInterest - annualPayment);
      } else {
        currentBalance += annualInterest;
      }

      yearlyBreakdown.push({
        year: new Date().getFullYear() + years,
        balance: currentBalance,
        payment: annualPayment,
        interest: annualInterest,
        salary: currentSalaryAmount
      });

      // Apply salary growth
      currentSalaryAmount *= (1 + salaryGrowthRate / 100);
      years++;
    }

    const payoffDate = new Date();
    payoffDate.setFullYear(payoffDate.getFullYear() + Math.ceil(years));

    const monthlyPayment = currentSalary > threshold ? 
      ((currentSalary - threshold) * (rate / 100)) / 12 : 0;

    setResults({
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterestPaid,
      payoffDate: years < loanTerm ? payoffDate.toLocaleDateString() : "Loan forgiven after 30 years",
      totalAmount: loanAmount + totalInterestPaid,
      yearlyBreakdown: yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, repaymentPlan, currentSalary, salaryGrowthRate]);

  // Chart data for loan balance over time
  const balanceOverTimeData = {
    labels: results.yearlyBreakdown.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Loan Balance',
        data: results.yearlyBreakdown.map(item => item.balance),
        borderColor: 'hsl(221, 83%, 53%)',
        backgroundColor: 'hsla(221, 83%, 53%, 0.1)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  // Chart data for payments vs interest
  const paymentBreakdownData = {
    labels: results.yearlyBreakdown.map(item => item.year.toString()),
    datasets: [
      {
        label: 'Annual Payment',
        data: results.yearlyBreakdown.map(item => item.payment),
        backgroundColor: 'hsl(142, 76%, 36%)',
        borderColor: 'hsl(142, 76%, 36%)',
      },
      {
        label: 'Annual Interest',
        data: results.yearlyBreakdown.map(item => item.interest),
        backgroundColor: 'hsl(0, 84%, 60%)',
        borderColor: 'hsl(0, 84%, 60%)',
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
            const value = context.parsed.y || context.parsed;
            return `${context.dataset.label}: £${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '£' + Number(value).toLocaleString();
          }
        }
      }
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/uk-student-loan-repayment-calculator`;
    navigator.clipboard.writeText(shareUrl);
    toast("Share link copied to clipboard!");
  };

  return (
    <Layout>
      <SEO 
        title="Student Loan Repayment Calculator - UK Plans 1, 2, 4, 5 & Postgraduate"
        description="Calculate your UK student loan repayments with our comprehensive calculator. Supports all loan plans with detailed projections and charts."
        keywords="student loan calculator, UK student loan, repayment calculator, Plan 1, Plan 2, loan repayment"
        canonical="https://toolkit-pro.lovable.app/uk-student-loan-repayment-calculator"
      />
      
      <div className="container py-12">

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Student Loan Repayment Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate your UK student loan repayments with detailed projections and charts. Supports all loan plans with advanced options.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <Card className="lg:sticky lg:top-24 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Your Loan Details
                </CardTitle>
                <CardDescription>
                  Enter your student loan information for accurate calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Total Loan Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
                    <Input
                      id="amount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="40000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    placeholder="6.25"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Current Annual Salary</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
                    <Input
                      id="salary"
                      type="number"
                      value={currentSalary}
                      onChange={(e) => setCurrentSalary(Number(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="25000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan">Repayment Plan</Label>
                  <Select value={repaymentPlan} onValueChange={setRepaymentPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plan1">Plan 1 (Pre-2012)</SelectItem>
                      <SelectItem value="plan2">Plan 2 (2012+)</SelectItem>
                      <SelectItem value="plan4">Plan 4 (Scotland)</SelectItem>
                      <SelectItem value="plan5">Plan 5 (2023+)</SelectItem>
                      <SelectItem value="postgrad">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Advanced Options Toggle */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="advanced" 
                    checked={showAdvanced}
                    onCheckedChange={(checked) => setShowAdvanced(checked === true)}
                  />
                  <Label htmlFor="advanced">Show Advanced Options</Label>
                </div>

                {showAdvanced && (
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
                    <div className="space-y-2">
                      <Label htmlFor="growth">Annual Salary Growth Rate (%)</Label>
                      <Input
                        id="growth"
                        type="number"
                        value={salaryGrowthRate}
                        onChange={(e) => setSalaryGrowthRate(Number(e.target.value) || 0)}
                        placeholder="3"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startYear">Course Start Year</Label>
                      <Input
                        id="startYear"
                        type="number"
                        value={courseStartYear}
                        onChange={(e) => setCourseStartYear(Number(e.target.value) || 0)}
                        placeholder="2023"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Course Duration (years)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(Number(e.target.value) || 0)}
                        placeholder="3"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="term">Loan Term (years)</Label>
                      <Input
                        id="term"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value) || 0)}
                        placeholder="30"
                      />
                    </div>
                  </div>
                )}

                <Button onClick={handleShare} variant="outline" className="w-full">
                  <Share className="h-4 w-4 mr-2" />
                  Share Calculator
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Mobile Ad Space */}
              <div className="lg:hidden w-full h-16 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                Mobile Ad Space (320x50)
              </div>

              {/* Repayment Summary */}
              {results.monthlyPayment >= 0 && (
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Repayment Summary</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <div className="text-blue-600 dark:text-blue-400 font-medium">Monthly Payment</div>
                          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                            £{results.monthlyPayment.toFixed(0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-600 dark:text-blue-400 font-medium">Payoff Date</div>
                          <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                            {results.payoffDate}
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-600 dark:text-blue-400 font-medium">Total Interest</div>
                          <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                            £{results.totalInterest.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-blue-600 dark:text-blue-400 font-medium">Total Amount</div>
                          <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                            £{results.totalAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Charts */}
              {results.yearlyBreakdown.length > 0 && (
                <Tabs defaultValue="balance" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="balance">Loan Balance Over Time</TabsTrigger>
                    <TabsTrigger value="payments">Payment Breakdown</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="balance">
                    <Card className="relative">
                      <MaximizeChart title="Loan Balance Projection">
                        <div className="h-full">
                          <Line data={balanceOverTimeData} options={chartOptions} />
                        </div>
                      </MaximizeChart>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <LineChart className="h-5 w-5" />
                          Loan Balance Projection
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <Line data={balanceOverTimeData} options={chartOptions} />
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            This chart shows how your loan balance changes over time based on your current salary and expected growth.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payments">
                    <Card className="relative">
                      <MaximizeChart title="Annual Payments vs Interest">
                        <div className="h-full">
                          <Bar data={paymentBreakdownData} options={chartOptions} />
                        </div>
                      </MaximizeChart>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Annual Payments vs Interest
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <Bar data={paymentBreakdownData} options={chartOptions} />
                        </div>
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                          <p className="text-sm text-green-700 dark:text-green-300">
                            Green bars show your annual payments, red bars show the interest accrued each year.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}

            </div>
          </div>

          {/* How it Works Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>How Student Loan Repayments Work</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Repayment Plans</h3>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Plan 1:</strong> Pre-2012 students (£22,015 threshold)</li>
                    <li><strong>Plan 2:</strong> 2012+ English & Welsh students (£27,295 threshold)</li>
                    <li><strong>Plan 4:</strong> Scottish students (£27,660 threshold)</li>
                    <li><strong>Plan 5:</strong> 2023+ students (£25,000 threshold)</li>
                    <li><strong>Postgraduate:</strong> Masters/PhD loans (£21,000 threshold)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">How Payments Are Calculated</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• You only pay when earning above the threshold</li>
                    <li>• Payments are 9% of income above threshold (6% for postgrad)</li>
                    <li>• Deducted automatically through PAYE</li>
                    <li>• Interest is charged on the outstanding balance</li>
                    <li>• Loans are written off after 30 years</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">When do I start repaying my student loan?</h4>
                <p className="text-sm text-muted-foreground">
                  You start repaying once your income exceeds the threshold for your repayment plan, typically in the April after you graduate.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What happens if I don't earn enough to make payments?</h4>
                <p className="text-sm text-muted-foreground">
                  If your income is below the threshold, you don't make any payments. However, interest still accrues on your loan balance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I pay off my loan early?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can make voluntary repayments at any time. However, consider whether this is the best use of your money given the loan terms.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What if I move abroad?</h4>
                <p className="text-sm text-muted-foreground">
                  You're still liable for repayments if you move overseas. Different threshold rates may apply based on your country of residence.
                </p>
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
                  <h4 className="font-semibold mb-1">When do I start repaying my student loan?</h4>
                  <p className="text-sm text-muted-foreground">
                    Repayments begin from April after you finish or leave your course, but only if you're earning above the threshold. 
                    For Plan 2 loans, the threshold is currently £27,295 per year. If you earn below this, you don't pay anything.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What's the difference between Plan 1, Plan 2, and Plan 5?</h4>
                  <p className="text-sm text-muted-foreground">
                    Plan 1 (pre-2012 England, current Scotland/NI) has a lower threshold (£22,015) but often lower interest. Plan 2 
                    (2012-2023 England/Wales) has higher threshold (£27,295) and RPI+3% interest. Plan 5 (post-2023 England) has similar 
                    terms to Plan 2 but different write-off period.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Will I ever pay off my student loan?</h4>
                  <p className="text-sm text-muted-foreground">
                    Many graduates won't pay off their full loan before it's written off (30 years for Plan 2, 40 years for Plan 5). 
                    This is normal and by design. Only high earners typically pay off the full amount. It works more like a graduate tax.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Should I pay off my student loan early?</h4>
                  <p className="text-sm text-muted-foreground">
                    Usually not. Student loan interest is often lower than other debt, and many won't pay the full amount anyway due to 
                    the 30-year write-off. It's typically better to pay off credit cards, build emergency savings, or invest instead.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How does student loan repayment affect my take-home pay?</h4>
                  <p className="text-sm text-muted-foreground">
                    Student loan repayments are deducted automatically through PAYE, like tax and National Insurance. You repay 9% of 
                    income above the threshold. So if you earn £30,295 on Plan 2, you'd pay 9% of £3,000 = £270/year (£22.50/month).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mt-8 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Important Disclaimer</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This calculator provides estimates based on current thresholds and rates, which may change. Actual repayments 
                may vary due to changes in government policy, interest rates, or your personal circumstances. This tool is for 
                educational purposes only and does not constitute financial advice. For official information, always refer to 
                the Student Loans Company or seek professional advice.
              </p>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <RelatedTools currentPath="/uk-student-loan-repayment-calculator" />
        </div>
      </div>
    </Layout>
  );
};

export default StudentLoanCalculator;