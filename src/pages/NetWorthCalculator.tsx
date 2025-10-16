import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Calculator, Plus, Minus, TrendingUp, TrendingDown, PiggyBank, Home, Car, Building, CreditCard, Target, Share, BarChart3, Info } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { CompareToggle } from "@/components/CompareToggle";
import { MaximizeChart } from "@/components/MaximizeChart";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface AssetItem {
  name: string;
  value: number;
  category: string;
}

interface LiabilityItem {
  name: string;
  value: number;
  category: string;
}

const NetWorthCalculator = () => {
  const [assets, setAssets] = useState<AssetItem[]>([
    { name: "Current Account", value: 5000, category: "Cash & Savings" },
    { name: "Savings Account", value: 15000, category: "Cash & Savings" },
    { name: "Home Value", value: 250000, category: "Property" },
    { name: "Car", value: 12000, category: "Vehicles" },
    { name: "Pension", value: 45000, category: "Investments" },
  ]);
  
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([
    { name: "Mortgage", value: 180000, category: "Property Loans" },
    { name: "Credit Card", value: 3000, category: "Credit Cards" },
    { name: "Car Loan", value: 8000, category: "Vehicle Loans" },
  ]);

  const [results, setResults] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    netWorth: 0,
  });

  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
    const netWorth = totalAssets - totalLiabilities;

    setResults({
      totalAssets,
      totalLiabilities,
      netWorth,
    });
  };

  useEffect(() => {
    calculateNetWorth();
  }, [assets, liabilities]);

  const updateAsset = (index: number, field: 'name' | 'value' | 'category', value: string | number) => {
    const updatedAssets = [...assets];
    updatedAssets[index] = { ...updatedAssets[index], [field]: value };
    setAssets(updatedAssets);
  };

  const removeAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const updateLiability = (index: number, field: 'name' | 'value' | 'category', value: string | number) => {
    const updatedLiabilities = [...liabilities];
    updatedLiabilities[index] = { ...updatedLiabilities[index], [field]: value };
    setLiabilities(updatedLiabilities);
  };

  const removeLiability = (index: number) => {
    setLiabilities(liabilities.filter((_, i) => i !== index));
  };

  const addAsset = () => {
    setAssets([...assets, { name: "", value: 0, category: "Cash & Savings" }]);
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { name: "", value: 0, category: "Credit Cards" }]);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/net-worth-calculator`;
    navigator.clipboard.writeText(shareUrl);
    toast("Share link copied to clipboard!");
  };

  // Chart data for assets vs liabilities
  const assetLiabilityData = {
    labels: ['Assets', 'Liabilities'],
    datasets: [
      {
        data: [results.totalAssets, results.totalLiabilities],
        backgroundColor: [
          'hsl(142, 76%, 36%)', // Green for assets
          'hsl(0, 84%, 60%)',   // Red for liabilities
        ],
        borderColor: [
          'hsl(142, 76%, 36%)',
          'hsl(0, 84%, 60%)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart data for asset breakdown by category
  const assetCategories = assets.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + asset.value;
    return acc;
  }, {} as Record<string, number>);

  const assetBreakdownData = {
    labels: Object.keys(assetCategories),
    datasets: [
      {
        data: Object.values(assetCategories),
        backgroundColor: [
          'hsl(142, 76%, 36%)', // Cash & Savings
          'hsl(221, 83%, 53%)', // Property
          'hsl(262, 83%, 58%)', // Vehicles
          'hsl(48, 96%, 53%)',  // Investments
          'hsl(173, 58%, 39%)', // Other
        ],
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data for comparison
  const comparisonData = {
    labels: ['Your Net Worth'],
    datasets: [
      {
        label: 'Assets',
        data: [results.totalAssets],
        backgroundColor: 'hsl(142, 76%, 36%)',
        borderColor: 'hsl(142, 76%, 36%)',
        borderWidth: 2,
      },
      {
        label: 'Liabilities',
        data: [results.totalLiabilities],
        backgroundColor: 'hsl(0, 84%, 60%)',
        borderColor: 'hsl(0, 84%, 60%)',
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
            const value = context.parsed || context.parsed.y || context.parsed;
            return `${context.label}: £${typeof value === 'number' ? value.toLocaleString() : value}`;
          }
        }
      }
    },
  };

  const assetCategoryOptions = ["Cash & Savings", "Property", "Vehicles", "Investments", "Other"];
  const liabilityCategoryOptions = ["Property Loans", "Credit Cards", "Vehicle Loans", "Personal Loans", "Other"];

  return (
    <Layout>
      <SEO 
        title="Net Worth Calculator - Track Your Financial Health | Free UK Calculator"
        description="Calculate your net worth by tracking assets and liabilities. Free UK net worth calculator with visual charts and financial health insights."
        keywords="net worth calculator, financial health, assets, liabilities, wealth tracker, UK calculator"
        canonical="https://toolkit-pro.lovable.app/net-worth-calculator"
      />
      
      <div className="container py-12">

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Net Worth Calculator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your financial health by calculating your net worth. Add your assets and liabilities to get a complete picture of your financial position.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="space-y-6">
              {/* Assets Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                    Assets (What You Own)
                  </CardTitle>
                  <CardDescription>
                    List all your valuable possessions and investments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assets.map((asset, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <div>
                        <Label>Asset Name</Label>
                        <Input
                          value={asset.name}
                          onChange={(e) => updateAsset(index, 'name', e.target.value)}
                          placeholder="e.g., Home, Car, Savings"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={asset.category} onValueChange={(value) => updateAsset(index, 'category', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {assetCategoryOptions.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label>Value (£)</Label>
                          <Input
                            type="number"
                            value={asset.value}
                            onChange={(e) => updateAsset(index, 'value', Number(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAsset(index)}
                          className="mt-6"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addAsset} variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Asset
                  </Button>
                </CardContent>
              </Card>

              {/* Liabilities Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <TrendingDown className="h-5 w-5" />
                    Liabilities (What You Owe)
                  </CardTitle>
                  <CardDescription>
                    List all your debts and financial obligations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {liabilities.map((liability, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                      <div>
                        <Label>Liability Name</Label>
                        <Input
                          value={liability.name}
                          onChange={(e) => updateLiability(index, 'name', e.target.value)}
                          placeholder="e.g., Mortgage, Credit Card"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={liability.category} onValueChange={(value) => updateLiability(index, 'category', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {liabilityCategoryOptions.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Label>Amount Owed (£)</Label>
                          <Input
                            type="number"
                            value={liability.value}
                            onChange={(e) => updateLiability(index, 'value', Number(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeLiability(index)}
                          className="mt-6"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addLiability} variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Liability
                  </Button>
                </CardContent>
              </Card>

              {/* Share Button */}
              <Button onClick={handleShare} variant="outline" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Share Calculator
              </Button>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Mobile Ad Space */}
              <div className="lg:hidden w-full h-16 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                Mobile Ad Space (320x50)
              </div>

              {/* Results Summary */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Your Net Worth</h3>
                    </div>
                    <div className={`text-3xl font-bold mb-4 ${results.netWorth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {results.netWorth >= 0 ? '+' : ''}£{results.netWorth.toLocaleString()}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-blue-600 dark:text-blue-400 font-medium">Total Assets</div>
                        <div className="text-blue-800 dark:text-blue-200 font-semibold">
                          £{results.totalAssets.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-blue-600 dark:text-blue-400 font-medium">Total Liabilities</div>
                        <div className="text-blue-800 dark:text-blue-200 font-semibold">
                          £{results.totalLiabilities.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Charts */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="assets">Asset Breakdown</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <Card className="relative">
                    <MaximizeChart title="Assets vs Liabilities">
                      <div className="h-full">
                        <Doughnut data={assetLiabilityData} options={chartOptions} />
                      </div>
                    </MaximizeChart>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Assets vs Liabilities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <Doughnut data={assetLiabilityData} options={chartOptions} />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                          <div className="text-sm text-green-600 dark:text-green-400 font-medium">Assets</div>
                          <div className="text-xl font-bold text-green-700 dark:text-green-300">
                            £{results.totalAssets.toLocaleString()}
                          </div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                          <div className="text-sm text-red-600 dark:text-red-400 font-medium">Liabilities</div>
                          <div className="text-xl font-bold text-red-700 dark:text-red-300">
                            £{results.totalLiabilities.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="assets">
                  <Card className="relative">
                    <MaximizeChart title="Asset Distribution">
                      <div className="h-full">
                        <Doughnut data={assetBreakdownData} options={chartOptions} />
                      </div>
                    </MaximizeChart>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PiggyBank className="h-5 w-5" />
                        Asset Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <Doughnut data={assetBreakdownData} options={chartOptions} />
                      </div>
                      <div className="mt-4 space-y-2">
                        {Object.entries(assetCategories).map(([category, value], index) => (
                          <div key={category} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-sm font-medium">{category}</span>
                            <span className="text-sm font-semibold">£{value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comparison">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Financial Position
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <Bar data={comparisonData} options={{
                          ...chartOptions,
                          scales: {
                            y: {
                              beginAtZero: true,
                              ticks: {
                                callback: function(value) {
                                  return '£' + Number(value).toLocaleString();
                                }
                              }
                            }
                          }
                        }} />
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Financial Health Score</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${results.netWorth > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.min(100, Math.max(10, (results.netWorth / results.totalAssets) * 100 + 50))}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {results.netWorth > 0 ? 'Positive' : 'Negative'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

            </div>
          </div>

          {/* What is Net Worth Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>What is Net Worth?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground">
                    Net worth is a key indicator of your financial health. It's calculated by subtracting your total liabilities 
                    (what you owe) from your total assets (what you own). A positive net worth means you own more than you owe, 
                    while a negative net worth indicates you owe more than you own.
                  </p>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Why Track Your Net Worth?</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Monitor your financial progress over time</li>
                    <li>• Make informed financial decisions</li>
                    <li>• Set realistic financial goals</li>
                    <li>• Identify areas for improvement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tips to Improve Your Net Worth</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Increase your income through career development</li>
                    <li>• Reduce unnecessary expenses and debt</li>
                    <li>• Invest in appreciating assets</li>
                    <li>• Pay down high-interest debt first</li>
                    <li>• Build an emergency fund</li>
                    <li>• Review and update regularly</li>
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
                <h4 className="font-semibold mb-2">How often should I calculate my net worth?</h4>
                <p className="text-sm text-muted-foreground">
                  It's recommended to calculate your net worth at least annually, though quarterly reviews can help you stay on track with your financial goals.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What counts as an asset?</h4>
                <p className="text-sm text-muted-foreground">
                  Assets include cash, savings accounts, investments, real estate, vehicles, jewelry, and other valuable possessions that could be sold for money.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Should I include my home as an asset?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, your home should be included at its current market value. However, remember to also include your mortgage as a liability.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is it normal to have a negative net worth?</h4>
                <p className="text-sm text-muted-foreground">
                  A negative net worth is common, especially for young adults with student loans or those who recently purchased a home. Focus on improving it over time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">What is net worth and why is it important?</h4>
                  <p className="text-sm text-muted-foreground">
                    Net worth is your total assets minus total liabilities - essentially what you'd have if you sold everything and paid 
                    off all debts. It's the best single measure of financial health and progress, more meaningful than income alone.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What should I include as assets?</h4>
                  <p className="text-sm text-muted-foreground">
                    Include cash, savings, investments, pensions, property (market value), vehicles, and valuable possessions (jewelry, 
                    art). Be realistic with valuations - use current market value, not what you paid. Don't include items worth under £1,000.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Should I include my home in net worth?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, include your home's current market value as an asset and mortgage balance as a liability. While you live in it, 
                    it's still part of your net worth. Some prefer tracking "liquid net worth" (excluding primary residence) separately.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What is a good net worth for my age?</h4>
                  <p className="text-sm text-muted-foreground">
                    A rough guideline: your net worth should equal your age multiplied by your annual income, divided by 10. So at age 30 
                    earning £40,000, aim for £120,000. But these are just guidelines - focus on consistent growth, not arbitrary targets.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How often should I calculate my net worth?</h4>
                  <p className="text-sm text-muted-foreground">
                    Monthly or quarterly tracking helps you monitor progress without obsessing over daily fluctuations. Annual reviews are 
                    minimum. Regular tracking helps identify trends and motivates positive financial behaviors.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Is negative net worth bad?</h4>
                  <p className="text-sm text-muted-foreground">
                    Negative net worth is common early in life, especially with student loans or a new mortgage. What matters is the 
                    trajectory - if it's improving each year, you're on the right track. Focus on reducing liabilities and building assets.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Important Disclaimer</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                This calculator provides estimates for educational purposes only and should not be considered as financial advice. 
                Net worth calculations are based on the values you input and may not reflect actual market values. For professional 
                financial planning, please consult with a qualified financial advisor. Asset values can fluctuate, and this tool 
                does not account for market volatility, taxes, or transaction costs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NetWorthCalculator;