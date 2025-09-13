import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, Share2, HelpCircle, Plus, Minus } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';

interface AssetItem {
  name: string;
  value: number;
}

interface LiabilityItem {
  name: string;
  value: number;
}

const NetWorthCalculator = () => {
  const [assets, setAssets] = useState<AssetItem[]>([
    { name: 'Home Value', value: 250000 },
    { name: 'Savings Account', value: 15000 },
    { name: 'Investments', value: 25000 },
    { name: 'Car', value: 12000 }
  ]);

  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([
    { name: 'Mortgage', value: 180000 },
    { name: 'Credit Cards', value: 5000 },
    { name: 'Car Loan', value: 8000 }
  ]);

  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0);
    const netWorth = totalAssets - totalLiabilities;

    setResults({
      totalAssets,
      totalLiabilities,
      netWorth
    });
  };

  useEffect(() => {
    calculateNetWorth();
  }, [assets, liabilities]);

  const updateAsset = (index: number, field: 'name' | 'value', value: string | number) => {
    const updatedAssets = [...assets];
    updatedAssets[index] = { ...updatedAssets[index], [field]: value };
    setAssets(updatedAssets);
  };

  const updateLiability = (index: number, field: 'name' | 'value', value: string | number) => {
    const updatedLiabilities = [...liabilities];
    updatedLiabilities[index] = { ...updatedLiabilities[index], [field]: value };
    setLiabilities(updatedLiabilities);
  };

  const addAsset = () => {
    setAssets([...assets, { name: 'New Asset', value: 0 }]);
  };

  const removeAsset = (index: number) => {
    if (assets.length > 1) {
      setAssets(assets.filter((_, i) => i !== index));
    }
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { name: 'New Liability', value: 0 }]);
  };

  const removeLiability = (index: number) => {
    if (liabilities.length > 1) {
      setLiabilities(liabilities.filter((_, i) => i !== index));
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(`Calculate your net worth: ${url}`);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard.",
    });
  };

  return (
    <Layout>
      <SEO 
        title="Net Worth Calculator - Track Your Financial Health"
        description="Calculate your net worth by tracking assets and liabilities. Free online tool to monitor your financial progress and build wealth over time."
        keywords="net worth calculator, financial health, wealth tracking, assets, liabilities"
        canonical="/net-worth-calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Net Worth Calculator
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Track your financial health by calculating your net worth. 
                Monitor your assets and liabilities to build long-term wealth.
              </p>
              <Button onClick={handleShare} variant="outline" className="mt-4">
                <Share2 className="h-4 w-4 mr-2" />
                Share Calculator
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Assets Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-green-600" />
                      Assets
                    </span>
                    <Button onClick={addAsset} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Things you own that have value
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assets.map((asset, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={asset.name}
                          onChange={(e) => updateAsset(index, 'name', e.target.value)}
                          placeholder="Asset name"
                          className="flex-1"
                        />
                        <Button
                          onClick={() => removeAsset(index)}
                          size="sm"
                          variant="outline"
                          disabled={assets.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        type="number"
                        value={asset.value}
                        onChange={(e) => updateAsset(index, 'value', Number(e.target.value))}
                        placeholder="0"
                        className="text-right"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Liabilities Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Minus className="h-5 w-5 text-red-600" />
                      Liabilities
                    </span>
                    <Button onClick={addLiability} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Debts and money you owe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {liabilities.map((liability, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={liability.name}
                          onChange={(e) => updateLiability(index, 'name', e.target.value)}
                          placeholder="Liability name"
                          className="flex-1"
                        />
                        <Button
                          onClick={() => removeLiability(index)}
                          size="sm"
                          variant="outline"
                          disabled={liabilities.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        type="number"
                        value={liability.value}
                        onChange={(e) => updateLiability(index, 'value', Number(e.target.value))}
                        placeholder="0"
                        className="text-right"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Results Section */}
              {results && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Your Net Worth
                    </CardTitle>
                    <CardDescription>
                      Assets minus liabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-sm font-medium">Total Assets</span>
                        <span className="font-bold text-green-600">
                          £{results.totalAssets.toLocaleString('en-GB')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-sm font-medium">Total Liabilities</span>
                        <span className="font-bold text-red-600">
                          £{results.totalLiabilities.toLocaleString('en-GB')}
                        </span>
                      </div>
                      
                      <Separator />
                      
                      <div className={`text-center p-4 rounded-lg ${
                        results.netWorth >= 0 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-destructive/10 border border-destructive/20'
                      }`}>
                        <p className="text-sm text-muted-foreground mb-2">Net Worth</p>
                        <p className={`text-3xl font-bold ${
                          results.netWorth >= 0 ? 'text-primary' : 'text-destructive'
                        }`}>
                          £{results.netWorth.toLocaleString('en-GB')}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {results.netWorth >= 0 ? 'Positive Net Worth' : 'Negative Net Worth'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Advertisement Space */}
            <Card className="mb-8 bg-muted/20 border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Advertisement Space</p>
              </CardContent>
            </Card>

            {/* Educational Content */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>What is Net Worth?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Net worth is the total value of your assets minus your liabilities. It's a snapshot 
                    of your overall financial health and a key measure of wealth building progress.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Assets include property, savings, investments, and valuables</li>
                    <li>• Liabilities include mortgages, loans, and credit card debt</li>
                    <li>• A positive net worth means you own more than you owe</li>
                    <li>• Track changes over time to monitor financial progress</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Use This Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. List all your assets and their current values</li>
                    <li>2. Add all your debts and liabilities</li>
                    <li>3. Use current market values where possible</li>
                    <li>4. Include all significant assets and debts</li>
                    <li>5. Review and update regularly to track progress</li>
                  </ol>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Calculate your net worth quarterly or annually to monitor your financial growth.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Advertisement Space */}
            <Card className="mb-8 bg-muted/20 border-dashed">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Advertisement Space</p>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Should I include my home in my net worth?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, include your home's current market value as an asset and any outstanding mortgage as a liability.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">How often should I calculate my net worth?</h4>
                  <p className="text-sm text-muted-foreground">
                    Review your net worth quarterly or annually to track your financial progress over time.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">What if my net worth is negative?</h4>
                  <p className="text-sm text-muted-foreground">
                    A negative net worth is common early in life. Focus on paying down debt and building assets to improve it over time.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-muted/50 border-amber-200">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Disclaimer:</strong> This calculator provides estimates based on the information you provide. 
                  Asset values may fluctuate, and actual net worth calculations may vary. These calculations are for 
                  educational purposes only and should not be considered as financial advice. Please consult with a 
                  qualified financial advisor for personalized guidance regarding your financial planning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NetWorthCalculator;