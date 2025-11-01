import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, PoundSterling, Calendar, Target, AlertTriangle } from "lucide-react";
import { CompareToggle } from "@/components/CompareToggle";
import { MaximizeChart } from "@/components/MaximizeChart";
import { RelatedTools } from "@/components/RelatedTools";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompoundInterestCalculator = () => {
  const [isComparing, setIsComparing] = useState(false);
  
  // Scenario 1
  const [initialDeposit, setInitialDeposit] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualInterestRate, setAnnualInterestRate] = useState("7");
  const [years, setYears] = useState("20");
  
  // Scenario 2
  const [initialDeposit2, setInitialDeposit2] = useState("10000");
  const [monthlyContribution2, setMonthlyContribution2] = useState("500");
  const [annualInterestRate2, setAnnualInterestRate2] = useState("8");
  const [years2, setYears2] = useState("20");

  const calculations = useCallback(() => {
    const principal = parseFloat(initialDeposit) || 0;
    const monthlyDeposit = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(annualInterestRate) || 0) / 100 / 12;
    const numYears = parseInt(years) || 1;
    const months = numYears * 12;

    if (rate === 0) {
      const finalBalance = principal + (monthlyDeposit * months);
      return {
        finalBalance,
        totalContributions: principal + (monthlyDeposit * months),
        totalInterest: 0,
        yearlyData: Array.from({ length: numYears }, (_, i) => ({
          year: i + 1,
          balance: principal + (monthlyDeposit * (i + 1) * 12),
          contributions: principal + (monthlyDeposit * (i + 1) * 12),
          interest: 0
        }))
      };
    }

    let balance = principal;
    const yearlyData = [];
    let totalContributions = principal;

    for (let year = 1; year <= numYears; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + rate) + monthlyDeposit;
        if (month === 12) {
          totalContributions += monthlyDeposit * 12;
        }
      }
      
      yearlyData.push({
        year,
        balance,
        contributions: principal + (monthlyDeposit * year * 12),
        interest: balance - (principal + (monthlyDeposit * year * 12))
      });
    }

    return {
      finalBalance: balance,
      totalContributions: principal + (monthlyDeposit * months),
      totalInterest: balance - (principal + (monthlyDeposit * months)),
      yearlyData
    };
  }, [initialDeposit, monthlyContribution, annualInterestRate, years]);

  const results = calculations();
  
  const calculations2 = useCallback(() => {
    const principal = parseFloat(initialDeposit2) || 0;
    const monthlyDeposit = parseFloat(monthlyContribution2) || 0;
    const rate = (parseFloat(annualInterestRate2) || 0) / 100 / 12;
    const numYears = parseInt(years2) || 1;
    const months = numYears * 12;

    if (rate === 0) {
      const finalBalance = principal + (monthlyDeposit * months);
      return {
        finalBalance,
        totalContributions: principal + (monthlyDeposit * months),
        totalInterest: 0,
        yearlyData: Array.from({ length: numYears }, (_, i) => ({
          year: i + 1,
          balance: principal + (monthlyDeposit * (i + 1) * 12),
          contributions: principal + (monthlyDeposit * (i + 1) * 12),
          interest: 0
        }))
      };
    }

    let balance = principal;
    const yearlyData = [];
    let totalContributions = principal;

    for (let year = 1; year <= numYears; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + rate) + monthlyDeposit;
        if (month === 12) {
          totalContributions += monthlyDeposit * 12;
        }
      }
      
      yearlyData.push({
        year,
        balance,
        contributions: principal + (monthlyDeposit * year * 12),
        interest: balance - (principal + (monthlyDeposit * year * 12))
      });
    }

    return {
      finalBalance: balance,
      totalContributions: principal + (monthlyDeposit * months),
      totalInterest: balance - (principal + (monthlyDeposit * months)),
      yearlyData
    };
  }, [initialDeposit2, monthlyContribution2, annualInterestRate2, years2]);

  const results2 = calculations2();

  const chartData = {
    labels: results.yearlyData.map(data => `Year ${data.year}`),
    datasets: isComparing && results2
      ? [
          {
            label: 'Scenario 1 Balance',
            data: results.yearlyData.map(data => data.balance),
            borderColor: 'hsl(221.2, 83.2%, 53.3%)',
            backgroundColor: 'hsl(221.2, 83.2%, 53.3%, 0.1)',
            tension: 0.1,
          },
          {
            label: 'Scenario 1 Contributions',
            data: results.yearlyData.map(data => data.contributions),
            borderColor: 'hsl(262.1, 83.3%, 57.8%)',
            backgroundColor: 'hsl(262.1, 83.3%, 57.8%, 0.1)',
            tension: 0.1,
          },
          {
            label: 'Scenario 2 Balance',
            data: results2.yearlyData.map(data => data.balance),
            borderColor: 'hsl(142, 71%, 45%)',
            backgroundColor: 'hsl(142, 71%, 45%, 0.1)',
            tension: 0.1,
          },
          {
            label: 'Scenario 2 Contributions',
            data: results2.yearlyData.map(data => data.contributions),
            borderColor: 'hsl(25, 95%, 53%)',
            backgroundColor: 'hsl(25, 95%, 53%, 0.1)',
            tension: 0.1,
          },
        ]
      : [
          {
            label: 'Total Balance',
            data: results.yearlyData.map(data => data.balance),
            borderColor: 'hsl(221.2, 83.2%, 53.3%)',
            backgroundColor: 'hsl(221.2, 83.2%, 53.3%, 0.1)',
            tension: 0.1,
          },
          {
            label: 'Total Contributions',
            data: results.yearlyData.map(data => data.contributions),
            borderColor: 'hsl(262.1, 83.3%, 57.8%)',
            backgroundColor: 'hsl(262.1, 83.3%, 57.8%, 0.1)',
            tension: 0.1,
          },
        ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: window.innerWidth < 768 ? 1 : 2,
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
      title: {
        display: true,
        text: 'Investment Growth Over Time',
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
        },
        padding: {
          top: 10,
          bottom: window.innerWidth < 768 ? 15 : 20
        }
      },
      tooltip: {
        padding: window.innerWidth < 768 ? 8 : 12,
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13
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
        beginAtZero: true,
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
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Compound Interest Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "GBP"
    },
    "description": "Calculate compound interest on investments with monthly contributions. Free UK compound interest calculator with visual growth charts."
  };

  return (
    <Layout>
      <SEO
        title="Compound Interest Calculator | Free Online Financial Calculator"
        description="Calculate compound interest on your investments with monthly contributions. See how your money grows over time with our free UK compound interest calculator and visual charts."
        keywords="compound interest calculator, investment calculator, savings growth, compound interest UK, investment growth calculator"
        canonical="https://toolkit-pro.lovable.app/uk-compound-interest-calculator-online"
        structuredData={structuredData}
      />
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Compound Interest Calculator</h1>
            <p className="text-lg text-muted-foreground">
              See how your investments can grow over time with compound interest.
            </p>
          </div>

          <CompareToggle isComparing={isComparing} onToggle={() => setIsComparing(!isComparing)} />

          <div className={`grid grid-cols-1 ${isComparing ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PoundSterling className="h-5 w-5" />
                    Investment Details
                  </CardTitle>
                  <CardDescription>
                    Enter your investment parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="initialDeposit">Initial Deposit</Label>
                    <Input
                      id="initialDeposit"
                      type="number"
                      value={initialDeposit}
                      onChange={(e) => setInitialDeposit(e.target.value)}
                      placeholder="10000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annualInterestRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="annualInterestRate"
                      type="number"
                      step="0.1"
                      value={annualInterestRate}
                      onChange={(e) => setAnnualInterestRate(e.target.value)}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years">Investment Period (Years)</Label>
                    <Input
                      id="years"
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      placeholder="20"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Results Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-3 sm:p-4 bg-primary/10 rounded-lg">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-primary break-words">
                        £{results.finalBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Final Balance</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-accent/10 rounded-lg">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-accent break-words">
                        £{results.totalContributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Total Contributions</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-green-500/10 rounded-lg">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-green-500 break-words">
                        £{results.totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Interest Earned</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between">
                      <span>Return on Investment:</span>
                      <span className="font-semibold text-green-500">
                        {results.totalContributions > 0 
                          ? ((results.totalInterest / results.totalContributions) * 100).toFixed(1)
                          : 0
                        }%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Growth:</span>
                      <span className="font-semibold">
                        {results.totalContributions > 0 
                          ? ((results.finalBalance / results.totalContributions) * 100).toFixed(1)
                          : 0
                        }%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {isComparing && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PoundSterling className="h-5 w-5" />
                      Scenario 2 - Investment Details
                    </CardTitle>
                    <CardDescription>
                      Enter comparison investment parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="initialDeposit2">Initial Deposit</Label>
                      <Input
                        id="initialDeposit2"
                        type="number"
                        value={initialDeposit2}
                        onChange={(e) => setInitialDeposit2(e.target.value)}
                        placeholder="10000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution2">Monthly Contribution</Label>
                      <Input
                        id="monthlyContribution2"
                        type="number"
                        value={monthlyContribution2}
                        onChange={(e) => setMonthlyContribution2(e.target.value)}
                        placeholder="500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annualInterestRate2">Annual Interest Rate (%)</Label>
                      <Input
                        id="annualInterestRate2"
                        type="number"
                        step="0.1"
                        value={annualInterestRate2}
                        onChange={(e) => setAnnualInterestRate2(e.target.value)}
                        placeholder="7"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="years2">Investment Period (Years)</Label>
                      <Input
                        id="years2"
                        type="number"
                        value={years2}
                        onChange={(e) => setYears2(e.target.value)}
                        placeholder="20"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Scenario 2 - Results Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-3 sm:p-4 bg-green-500/10 rounded-lg">
                        <div className="text-base sm:text-lg md:text-xl font-bold break-words" style={{color: 'hsl(142, 71%, 45%)'}}>
                          £{results2.finalBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Final Balance</div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-orange-500/10 rounded-lg">
                        <div className="text-base sm:text-lg md:text-xl font-bold break-words" style={{color: 'hsl(25, 95%, 53%)'}}>
                          £{results2.totalContributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Total Contributions</div>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-emerald-500/10 rounded-lg">
                        <div className="text-base sm:text-lg md:text-xl font-bold text-emerald-500 break-words">
                          £{results2.totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Interest Earned</div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between">
                        <span>Return on Investment:</span>
                        <span className="font-semibold text-emerald-500">
                          {results2.totalContributions > 0 
                            ? ((results2.totalInterest / results2.totalContributions) * 100).toFixed(1)
                            : 0
                          }%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Growth:</span>
                        <span className="font-semibold">
                          {results2.totalContributions > 0 
                            ? ((results2.finalBalance / results2.totalContributions) * 100).toFixed(1)
                            : 0
                          }%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div>
              <Card className="relative">
                <MaximizeChart title="Growth Chart">
                  <div className="h-full">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </MaximizeChart>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Chart
                  </CardTitle>
                  <CardDescription>
                    Visualize your investment growth over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-6">
                  <div className="h-[400px] sm:h-80 w-full">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Yearly Breakdown Tables */}
          <div className={`grid grid-cols-1 ${isComparing ? 'lg:grid-cols-2' : ''} gap-8 mt-8`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {isComparing ? 'Scenario 1 - ' : ''}Year-by-Year Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Balance</th>
                        <th className="text-right p-2">Contributions</th>
                        <th className="text-right p-2">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlyData.slice(0, 10).map((data) => (
                        <tr key={data.year} className="border-b">
                          <td className="p-2">{data.year}</td>
                          <td className="text-right p-2">£{data.balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          <td className="text-right p-2">£{data.contributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          <td className="text-right p-2 text-green-500">£{data.interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {results.yearlyData.length > 10 && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Showing first 10 years. Full breakdown available in the chart above.
                  </p>
                )}
              </CardContent>
            </Card>

            {isComparing && results2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Scenario 2 - Year-by-Year Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Year</th>
                          <th className="text-right p-2">Balance</th>
                          <th className="text-right p-2">Contributions</th>
                          <th className="text-right p-2">Interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results2.yearlyData.slice(0, 10).map((data) => (
                          <tr key={data.year} className="border-b">
                            <td className="p-2">{data.year}</td>
                            <td className="text-right p-2">£{data.balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td className="text-right p-2">£{data.contributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td className="text-right p-2 text-emerald-500">£{data.interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {results2.yearlyData.length > 10 && (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Showing first 10 years. Full breakdown available in the chart above.
                    </p>
                  )}
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
                <CardTitle>How to Use the Compound Interest Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Step-by-Step Instructions:</h4>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                      <li>Enter your starting investment amount (initial deposit)</li>
                      <li>Set your planned monthly contribution</li>
                      <li>Input the expected annual interest rate</li>
                      <li>Choose your investment time horizon</li>
                      <li>Review the growth projection and year-by-year breakdown</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Understanding the Output:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Final Balance:</strong> Total value after compound growth</li>
                      <li><strong>Total Contributions:</strong> All money you put in</li>
                      <li><strong>Interest Earned:</strong> Money made from compound growth</li>
                      <li><strong>Growth Chart:</strong> Visual timeline of your investment</li>
                      <li><strong>Year-by-Year Table:</strong> Detailed annual breakdown</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* What is Compound Interest */}
            <Card>
              <CardHeader>
                <CardTitle>Understanding Compound Interest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  Compound interest is often called "the eighth wonder of the world" because it's the process where your money 
                  earns returns, and those returns then earn returns themselves. It's the key to building long-term wealth.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">How It Works:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Year 1:</strong> £1,000 @ 7% = £1,070</li>
                      <li><strong>Year 2:</strong> £1,070 @ 7% = £1,145 (earning on the £70 gain too)</li>
                      <li><strong>Year 3:</strong> £1,145 @ 7% = £1,225 (compound effect grows)</li>
                      <li>This accelerating growth continues exponentially</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Factors:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Principal:</strong> Your initial investment amount</li>
                      <li><strong>Interest Rate:</strong> Annual percentage return</li>
                      <li><strong>Time:</strong> How long you leave money invested</li>
                      <li><strong>Frequency:</strong> How often interest compounds (monthly, annually)</li>
                      <li><strong>Additional Contributions:</strong> Regular deposits accelerate growth</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* The Power of Time */}
            <Card>
              <CardHeader>
                <CardTitle>The Power of Starting Early</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Example: Two Investors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Sarah (Starts at 25)</h5>
                      <ul className="text-sm space-y-1">
                        <li>Invests £200/month for 10 years</li>
                        <li>Total contributions: £24,000</li>
                        <li>Stops at 35, lets it grow until 65</li>
                        <li>Final value at 7%: ~£367,000</li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">John (Starts at 35)</h5>
                      <ul className="text-sm space-y-1">
                        <li>Invests £200/month for 30 years</li>
                        <li>Total contributions: £72,000</li>
                        <li>Invests until 65</li>
                        <li>Final value at 7%: ~£245,000</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm mt-4 font-medium text-center">
                    Sarah invested £48,000 less but ended up with £122,000 more! That's the power of starting early.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Investment Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Maximizing Compound Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">Start Now</h4>
                    <p className="text-sm">Even small amounts matter. Starting with £50/month is better than waiting to invest £500/month later.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Stay Consistent</h4>
                    <p className="text-sm">Regular contributions create momentum. Automate investments to ensure consistency.</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Be Patient</h4>
                    <p className="text-sm">Compound interest accelerates over time. The biggest gains often come in the later years.</p>
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
                  <h4 className="font-semibold mb-1">What is compound interest?</h4>
                  <p className="text-sm text-muted-foreground">
                    Compound interest is when you earn interest on both your original investment and previously earned interest. 
                    It's often called "interest on interest" and causes your wealth to grow exponentially over time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What's a realistic rate of return?</h4>
                  <p className="text-sm text-muted-foreground">
                    Historical stock market averages are around 7-10% annually. Savings accounts typically offer 1-5%. 
                    Conservative investments might return 3-5%, while aggressive portfolios could aim for 8-12%. Always account for inflation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How often does interest compound?</h4>
                  <p className="text-sm text-muted-foreground">
                    This calculator uses monthly compounding, which is common for savings accounts and investments. Some accounts compound 
                    daily or annually. More frequent compounding results in slightly higher returns.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Should I invest a lump sum or make regular contributions?</h4>
                  <p className="text-sm text-muted-foreground">
                    Regular contributions (dollar-cost averaging) reduce risk by spreading investments over time. Lump sums can benefit from 
                    more time in the market. The best approach depends on your financial situation and risk tolerance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How does this differ from simple interest?</h4>
                  <p className="text-sm text-muted-foreground">
                    Simple interest only calculates interest on the original principal. Compound interest calculates interest on the 
                    principal plus all accumulated interest, resulting in significantly higher returns over time.
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
                    This calculator provides estimates based on mathematical models and should not be considered financial advice. 
                    Actual investment returns may vary significantly due to market conditions, fees, and other factors. 
                    <a href="/disclaimer" className="underline">Read our full disclaimer</a>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <RelatedTools currentPath="/uk-compound-interest-calculator-online" />

      </div>
    </Layout>
  );
};

export default CompoundInterestCalculator;