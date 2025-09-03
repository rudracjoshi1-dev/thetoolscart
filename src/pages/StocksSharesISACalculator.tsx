import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, TrendingUp, Calculator, Info } from "lucide-react";
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

const StocksSharesISACalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState([5]);
  const [years, setYears] = useState([10]);
  const [results, setResults] = useState({
    totalInvested: 0,
    totalReturn: 0,
    finalValue: 0,
    yearlyData: [] as { year: number; invested: number; growth: number; total: number }[]
  });

  const currentISAAllowance = 20000;

  const calculateISA = () => {
    const monthlyRate = expectedReturn[0] / 100 / 12;
    const totalMonths = years[0] * 12;
    const yearlyData = [];
    
    let currentValue = initialInvestment;
    let totalInvested = initialInvestment;

    for (let year = 1; year <= years[0]; year++) {
      for (let month = 1; month <= 12; month++) {
        // Apply monthly growth
        currentValue = currentValue * (1 + monthlyRate);
        
        // Add monthly contribution (up to ISA allowance)
        const yearlyContributed = (year - 1) * 12 * monthlyContribution + month * monthlyContribution;
        const allowanceUsed = Math.min(yearlyContributed + initialInvestment, year * currentISAAllowance);
        
        if (totalInvested < allowanceUsed) {
          const contribution = Math.min(monthlyContribution, allowanceUsed - totalInvested);
          currentValue += contribution;
          totalInvested += contribution;
        }
      }
      
      yearlyData.push({
        year,
        invested: totalInvested,
        growth: currentValue - totalInvested,
        total: currentValue
      });
    }

    setResults({
      totalInvested,
      totalReturn: currentValue - totalInvested,
      finalValue: currentValue,
      yearlyData
    });
  };

  useEffect(() => {
    calculateISA();
  }, [initialInvestment, monthlyContribution, expectedReturn, years]);

  const chartData = {
    labels: results.yearlyData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Total Invested',
        data: results.yearlyData.map(d => d.invested),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        fill: true,
      },
      {
        label: 'Investment Growth',
        data: results.yearlyData.map(d => d.total),
        borderColor: 'hsl(var(--chart-2))',
        backgroundColor: 'hsl(var(--chart-2) / 0.1)',
        fill: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'ISA Growth Projection',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '£' + new Intl.NumberFormat('en-GB').format(value);
          }
        }
      }
    }
  };

  return (
    <Layout>
      <SEO 
        title="Stocks & Shares ISA Calculator - Free UK Investment Growth Calculator"
        description="Calculate your Stocks & Shares ISA potential returns with our free UK calculator. See how your investments could grow tax-free over time with compound interest."
        keywords="stocks shares ISA calculator, UK ISA calculator, investment calculator, tax-free investing UK, ISA growth calculator"
        canonical="https://toolkit-pro.lovable.app/stocks-shares-isa"
      />
      
      <div className="container py-12">
        {/* Ad Space */}
        <div className="w-full h-20 bg-muted/30 rounded-lg flex items-center justify-center mb-8 text-muted-foreground">
          Advertisement Space (728x90)
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <PiggyBank className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Stocks & Shares ISA Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calculate how your ISA investments could grow over time. See the power of tax-free compound growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <Card className="lg:sticky lg:top-24 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Investment Details
                </CardTitle>
                <CardDescription>
                  Enter your investment parameters to see projected growth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="initial">Initial Investment</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">£</span>
                    <Input
                      id="initial"
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Monthly Contribution: £{monthlyContribution.toLocaleString()}</Label>
                  <Slider
                    value={[monthlyContribution]}
                    onValueChange={(value) => setMonthlyContribution(value[0])}
                    max={1667}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>£0</span>
                    <span>£1,667/month</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Expected Annual Return: {expectedReturn[0]}%</Label>
                  <Slider
                    value={expectedReturn}
                    onValueChange={setExpectedReturn}
                    max={12}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1%</span>
                    <span>12%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Investment Period: {years[0]} years</Label>
                  <Slider
                    value={years}
                    onValueChange={setYears}
                    max={40}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1 year</span>
                    <span>40 years</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">ISA Allowance 2024/25</p>
                      <p className="text-blue-700 dark:text-blue-300">
                        You can invest up to £{currentISAAllowance.toLocaleString()} per tax year in a Stocks & Shares ISA.
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

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      £{results.totalInvested.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">Total Invested</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      £{results.totalReturn.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Investment Growth</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                      £{results.finalValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Final Value</div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Projection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line data={chartData} options={chartOptions} />
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

export default StocksSharesISACalculator;