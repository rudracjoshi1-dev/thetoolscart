import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, DollarSign, Calendar, Target } from "lucide-react";
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
  const [initialDeposit, setInitialDeposit] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualInterestRate, setAnnualInterestRate] = useState("7");
  const [years, setYears] = useState("20");

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

  const chartData = {
    labels: results.yearlyData.map(data => `Year ${data.year}`),
    datasets: [
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Investment Growth Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Compound Interest Calculator</h1>
            <p className="text-lg text-muted-foreground">
              See how your investments can grow over time with compound interest.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
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
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-xl font-bold text-primary">
                        ${results.finalBalance.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Final Balance</div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-xl font-bold text-accent">
                        ${results.totalContributions.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Contributions</div>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <div className="text-xl font-bold text-green-500">
                        ${results.totalInterest.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Interest Earned</div>
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

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Chart
                  </CardTitle>
                  <CardDescription>
                    Visualize your investment growth over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Yearly Breakdown Table */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Year-by-Year Breakdown
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
                        <td className="text-right p-2">${data.balance.toLocaleString()}</td>
                        <td className="text-right p-2">${data.contributions.toLocaleString()}</td>
                        <td className="text-right p-2 text-green-500">${data.interest.toLocaleString()}</td>
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
        </div>
      </div>
    </Layout>
  );
};

export default CompoundInterestCalculator;