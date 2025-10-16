import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PiggyBank, TrendingUp, Calculator, Info, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { CompareToggle } from "@/components/CompareToggle";
import { MaximizeChart } from "@/components/MaximizeChart";
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
  const [isComparing, setIsComparing] = useState(false);
  
  // Scenario 1
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState([5]);
  const [years, setYears] = useState([10]);
  
  // Scenario 2
  const [initialInvestment2, setInitialInvestment2] = useState(1000);
  const [monthlyContribution2, setMonthlyContribution2] = useState(750);
  const [expectedReturn2, setExpectedReturn2] = useState([7]);
  const [years2, setYears2] = useState([10]);
  
  const [results, setResults] = useState({
    totalInvested: 0,
    totalReturn: 0,
    finalValue: 0,
    yearlyData: [] as { year: number; invested: number; growth: number; total: number }[]
  });
  
  const [results2, setResults2] = useState({
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

  const calculateISA2 = () => {
    const monthlyRate = expectedReturn2[0] / 100 / 12;
    const totalMonths = years2[0] * 12;
    const yearlyData = [];
    
    let currentValue = initialInvestment2;
    let totalInvested = initialInvestment2;

    for (let year = 1; year <= years2[0]; year++) {
      for (let month = 1; month <= 12; month++) {
        currentValue = currentValue * (1 + monthlyRate);
        
        const yearlyContributed = (year - 1) * 12 * monthlyContribution2 + month * monthlyContribution2;
        const allowanceUsed = Math.min(yearlyContributed + initialInvestment2, year * currentISAAllowance);
        
        if (totalInvested < allowanceUsed) {
          const contribution = Math.min(monthlyContribution2, allowanceUsed - totalInvested);
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

    setResults2({
      totalInvested,
      totalReturn: currentValue - totalInvested,
      finalValue: currentValue,
      yearlyData
    });
  };

  useEffect(() => {
    calculateISA();
    calculateISA2();
  }, [initialInvestment, monthlyContribution, expectedReturn, years, initialInvestment2, monthlyContribution2, expectedReturn2, years2]);

  const chartData = {
    labels: results.yearlyData.map(d => `Year ${d.year}`),
    datasets: isComparing ? [
      {
        label: 'Scenario 1 - Total Invested',
        data: results.yearlyData.map(d => d.invested),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Scenario 1 - Investment Growth',
        data: results.yearlyData.map(d => d.total),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Scenario 2 - Total Invested',
        data: results2.yearlyData.map(d => d.invested),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Scenario 2 - Investment Growth',
        data: results2.yearlyData.map(d => d.total),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 2,
        fill: false,
      }
    ] : [
      {
        label: 'Total Invested',
        data: results.yearlyData.map(d => d.invested),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Investment Growth',
        data: results.yearlyData.map(d => d.total),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
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

          <CompareToggle isComparing={isComparing} onToggle={() => setIsComparing(!isComparing)} />

          <div className={`grid grid-cols-1 ${isComparing ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
            {/* Input Panel - Scenario 1 */}
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
              <Card className="relative">
                <MaximizeChart title="ISA Growth Projection">
                  <div className="h-full">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </MaximizeChart>
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

            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-12 space-y-8">
            {/* How to Use */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use the Stocks & Shares ISA Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Getting Started:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Enter your initial lump sum investment (if any)</li>
                      <li>Set your planned monthly contribution amount</li>
                      <li>Choose a realistic expected annual return (5-7% is historical average)</li>
                      <li>Select your investment timeframe</li>
                      <li>Review the growth projection and yearly breakdown</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Reading Your Results:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Total Invested:</strong> Your contributions over time</li>
                      <li><strong>Investment Growth:</strong> Returns generated by compound growth</li>
                      <li><strong>Final Value:</strong> Total ISA value at the end of the period</li>
                      <li><strong>Growth Chart:</strong> Visual representation of your investment journey</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* What is a Stocks & Shares ISA */}
            <Card>
              <CardHeader>
                <CardTitle>Understanding Stocks & Shares ISAs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  A Stocks & Shares ISA is a tax-efficient investment account that allows UK residents to invest up to 
                  £{currentISAAllowance.toLocaleString()} per tax year (2024/25) without paying tax on any gains, dividends, or interest earned.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Benefits:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Tax-free growth:</strong> No capital gains tax on profits</li>
                      <li><strong>Tax-free income:</strong> No tax on dividends or interest</li>
                      <li><strong>Flexible access:</strong> Withdraw money anytime (but you lose that year's allowance)</li>
                      <li><strong>Annual allowance:</strong> Fresh £{(currentISAAllowance/1000)}k allowance each tax year</li>
                      <li><strong>No time limits:</strong> Keep your ISA as long as you want</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Investment Options:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Individual stocks and shares</li>
                      <li>Index funds and ETFs</li>
                      <li>Actively managed funds</li>
                      <li>Investment trusts</li>
                      <li>Government and corporate bonds</li>
                      <li>Cash (though Cash ISAs may offer better rates)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Strategy Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Strategy Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Start Early</h4>
                    <p className="text-sm">Time is your biggest advantage. Starting 10 years earlier can double your final pot due to compound growth.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Diversify</h4>
                    <p className="text-sm">Spread risk across different assets, sectors, and geographies. Index funds offer instant diversification.</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Stay Consistent</h4>
                    <p className="text-sm">Regular monthly contributions help smooth out market volatility and build wealth systematically.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Warning */}
            <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-300">Investment Risk Warning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                  <strong>Remember:</strong> Investment values can go down as well as up, and you may get back less than you invested. 
                  Past performance doesn't guarantee future returns. Only invest money you can afford to lose and don't need immediate access to.
                </p>
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
                  <h4 className="font-semibold mb-1">What's the difference between a Cash ISA and Stocks & Shares ISA?</h4>
                  <p className="text-sm text-muted-foreground">
                    Cash ISAs are like savings accounts with guaranteed returns but lower interest (1-5%). Stocks & Shares ISAs invest 
                    in markets with higher potential returns (7-10% historically) but with risk of losing money. Both are tax-free.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Can I lose money in a Stocks & Shares ISA?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes. Investment values can go down as well as up. However, historically, diversified investments held for 5+ years 
                    have shown positive returns. Only invest money you won't need in the short term.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What happens if I exceed the £20,000 ISA allowance?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contributions over £20,000 in a tax year may be rejected or subject to tax penalties. The allowance resets each April. 
                    You can split the £20,000 between different ISA types (Cash, Stocks & Shares, Lifetime, Innovative Finance).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Can I withdraw money from my ISA?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can withdraw anytime from most ISAs. However, withdrawals don't restore your annual allowance (except with 
                    Flexible ISAs). Consider keeping funds invested long-term for maximum compound growth benefits.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What's a realistic expected return?</h4>
                  <p className="text-sm text-muted-foreground">
                    Historical stock market averages are 7-10% annually before fees. Conservative portfolios might return 4-6%, while 
                    aggressive ones could aim for 8-12%. Remember, past performance doesn't guarantee future results.
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
                    This calculator provides estimates based on assumptions and should not be considered financial or investment advice. 
                    Actual returns may vary significantly. Past performance does not guarantee future results. 
                    <a href="/disclaimer" className="underline">Read our full disclaimer</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StocksSharesISACalculator;