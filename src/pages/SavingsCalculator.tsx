import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PiggyBank, Calculator, TrendingUp, Target, Info, Clock, DollarSign } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SavingsCalculator = () => {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(100);
  const [interestRate, setInterestRate] = useState(3);
  const [savingsGoal, setSavingsGoal] = useState(10000);
  const [timeHorizon, setTimeHorizon] = useState(5);

  const calculations = useCallback(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = timeHorizon * 12;
    let balance = initialAmount;
    const yearlyData = [];
    
    // Calculate compound interest with monthly deposits
    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit;
      
      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          balance: Math.round(balance),
          totalDeposited: initialAmount + (monthlyDeposit * month),
          interestEarned: Math.round(balance - (initialAmount + monthlyDeposit * month))
        });
      }
    }

    const finalBalance = Math.round(balance);
    const totalDeposited = initialAmount + (monthlyDeposit * totalMonths);
    const totalInterest = finalBalance - totalDeposited;
    
    // Calculate time to reach savings goal
    let monthsToGoal = 0;
    let goalBalance = initialAmount;
    while (goalBalance < savingsGoal && monthsToGoal < 600) { // 50 years max
      goalBalance = goalBalance * (1 + monthlyRate) + monthlyDeposit;
      monthsToGoal++;
    }
    
    const yearsToGoal = monthsToGoal / 12;

    return {
      finalBalance,
      totalDeposited,
      totalInterest,
      yearlyData,
      yearsToGoal: goalBalance >= savingsGoal ? yearsToGoal : null
    };
  }, [initialAmount, monthlyDeposit, interestRate, timeHorizon, savingsGoal]);

  const results = calculations();

  const chartData = {
    labels: results.yearlyData.map(data => `Year ${data.year}`),
    datasets: [
      {
        label: "Total Balance",
        data: results.yearlyData.map(data => data.balance),
        borderColor: "hsl(220, 70%, 50%)",
        backgroundColor: "hsl(220, 70%, 50%, 0.1)",
        tension: 0.1,
        fill: true,
        borderWidth: 3
      },
      {
        label: "Total Deposited",
        data: results.yearlyData.map(data => data.totalDeposited),
        borderColor: "hsl(280, 65%, 60%)",
        backgroundColor: "hsl(280, 65%, 60%, 0.1)",
        tension: 0.1,
        borderDash: [5, 5],
        borderWidth: 3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Savings Growth Over Time"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '£' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <Layout>
      <SEO
        title="Savings Calculator - Plan Your Financial Future | Financial Tools"
        description="Calculate how your savings could grow over time with compound interest. Plan your financial goals with our professional savings calculator."
        keywords="savings calculator, compound interest, financial planning, savings growth, investment calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <PiggyBank className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Savings Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plan your financial future by calculating how your savings could grow over time with compound interest
            </p>
          </div>

          {/* Ad Space */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-3xl h-24 bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Advertisement Space</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Inputs */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Calculator Settings
                  </CardTitle>
                  <CardDescription>
                    Enter your savings details to see projections
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Initial Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="initial-amount" className="text-sm font-medium">
                      Initial Amount
                    </Label>
                    <div className="space-y-2">
                      <Input
                        id="initial-amount"
                        type="number"
                        value={initialAmount}
                        onChange={(e) => setInitialAmount(Number(e.target.value))}
                        className="text-lg"
                      />
                      <Slider
                        value={[initialAmount]}
                        onValueChange={(value) => setInitialAmount(value[0])}
                        max={50000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>£0</span>
                        <span>£50,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Deposit */}
                  <div className="space-y-2">
                    <Label htmlFor="monthly-deposit" className="text-sm font-medium">
                      Monthly Deposit
                    </Label>
                    <div className="space-y-2">
                      <Input
                        id="monthly-deposit"
                        type="number"
                        value={monthlyDeposit}
                        onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                        className="text-lg"
                      />
                      <Slider
                        value={[monthlyDeposit]}
                        onValueChange={(value) => setMonthlyDeposit(value[0])}
                        max={2000}
                        min={0}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>£0</span>
                        <span>£2,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <Label htmlFor="interest-rate" className="text-sm font-medium">
                      Annual Interest Rate (%)
                    </Label>
                    <div className="space-y-2">
                      <Input
                        id="interest-rate"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="text-lg"
                      />
                      <Slider
                        value={[interestRate]}
                        onValueChange={(value) => setInterestRate(value[0])}
                        max={10}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Horizon */}
                  <div className="space-y-2">
                    <Label htmlFor="time-horizon" className="text-sm font-medium">
                      Savings Period (Years)
                    </Label>
                    <div className="space-y-2">
                      <Input
                        id="time-horizon"
                        type="number"
                        value={timeHorizon}
                        onChange={(e) => setTimeHorizon(Number(e.target.value))}
                        className="text-lg"
                      />
                      <Slider
                        value={[timeHorizon]}
                        onValueChange={(value) => setTimeHorizon(value[0])}
                        max={40}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 year</span>
                        <span>40 years</span>
                      </div>
                    </div>
                  </div>

                  {/* Savings Goal */}
                  <div className="space-y-2">
                    <Label htmlFor="savings-goal" className="text-sm font-medium">
                      Savings Goal (Optional)
                    </Label>
                    <div className="space-y-2">
                      <Input
                        id="savings-goal"
                        type="number"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(Number(e.target.value))}
                        className="text-lg"
                      />
                      <Slider
                        value={[savingsGoal]}
                        onValueChange={(value) => setSavingsGoal(value[0])}
                        max={100000}
                        min={1000}
                        step={1000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>£1,000</span>
                        <span>£100,000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Final Balance</p>
                        <p className="text-2xl font-bold text-primary">
                          £{results.finalBalance.toLocaleString()}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Deposited</p>
                        <p className="text-2xl font-bold text-secondary">
                          £{results.totalDeposited.toLocaleString()}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-secondary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Interest Earned</p>
                        <p className="text-2xl font-bold text-green-600">
                          £{results.totalInterest.toLocaleString()}
                        </p>
                      </div>
                      <PiggyBank className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Goal Achievement */}
              {results.yearsToGoal && (
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Target className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Time to Reach Goal</p>
                        <p className="text-xl font-bold">
                          {results.yearsToGoal.toFixed(1)} years to reach £{savingsGoal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Savings Growth Projection</CardTitle>
                  <CardDescription>
                    See how your savings grow over time with compound interest
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <div className="flex justify-center">
                <div className="w-full h-24 bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Advertisement Space</span>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mt-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  How to Use This Savings Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">1. Enter Your Starting Amount</h3>
                    <p className="text-muted-foreground">Input how much money you already have saved or plan to start with.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">2. Set Monthly Deposits</h3>
                    <p className="text-muted-foreground">Enter how much you plan to save each month consistently.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">3. Choose Interest Rate</h3>
                    <p className="text-muted-foreground">Enter the annual interest rate your savings account or investment offers.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">4. Set Your Goal</h3>
                    <p className="text-muted-foreground">Optional: Set a savings target to see when you'll reach it.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What is Savings Section */}
          <div className="mt-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Understanding Savings and Compound Interest
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">What are Savings?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Savings refer to money that you set aside from your income for future use. Unlike spending, 
                    saving involves putting money away in secure accounts where it can grow over time through interest.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">How Compound Interest Works</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Compound interest is the addition of interest to the principal sum of a loan or deposit. 
                    It's "interest on interest" - you earn interest not only on your original savings but also 
                    on the interest that has been added to your account.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Example:</strong> If you save £100 with 5% annual interest, after one year you'll have £105. 
                      In year two, you'll earn 5% on the full £105, not just the original £100.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">Types of Savings Accounts</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Badge variant="outline">Regular Savings</Badge>
                      <span className="text-muted-foreground">Standard savings accounts with variable interest rates</span>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="outline">Fixed Rate Bonds</Badge>
                      <span className="text-muted-foreground">Fixed interest rate for a specific term</span>
                    </div>
                    <div className="flex gap-3">
                      <Badge variant="outline">ISAs</Badge>
                      <span className="text-muted-foreground">Tax-free savings up to annual allowance</span>
                    </div>
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
                    <h4 className="font-semibold mb-1">How much should I save each month?</h4>
                    <p className="text-sm text-muted-foreground">
                      Financial experts recommend saving 10-20% of your income. Start with what you can afford and gradually increase. 
                      Even small, consistent contributions grow significantly over time due to compound interest.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">What's the difference between savings and investments?</h4>
                    <p className="text-sm text-muted-foreground">
                      Savings accounts are low-risk with guaranteed returns but lower interest rates (1-5%). Investments like stocks 
                      have higher potential returns (7-10%) but carry more risk. Use savings for short-term goals and emergencies.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Should I save or pay off debt first?</h4>
                    <p className="text-sm text-muted-foreground">
                      Generally, prioritize high-interest debt (credit cards over 15%) while building a small emergency fund. 
                      For lower-interest debt (mortgages under 5%), you can often benefit more from saving and investing simultaneously.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">How much should I have in emergency savings?</h4>
                    <p className="text-sm text-muted-foreground">
                      Aim for 3-6 months of living expenses in an easily accessible savings account. This provides a financial cushion 
                      for unexpected expenses or job loss without needing to rely on credit cards.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Are my savings protected?</h4>
                    <p className="text-sm text-muted-foreground">
                      In the UK, the FSCS protects up to £85,000 per person, per financial institution. In the US, FDIC insurance 
                      protects up to $250,000. Spread larger amounts across multiple institutions for full protection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavingsCalculator;