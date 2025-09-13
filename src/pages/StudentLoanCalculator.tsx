import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, GraduationCap, TrendingDown, Share2, HelpCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const StudentLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(10);
  const [repaymentPlan, setRepaymentPlan] = useState<string>('standard');
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    let monthlyPayment: number;
    let totalInterest: number;
    let totalAmount: number;

    if (repaymentPlan === 'standard') {
      // Standard repayment calculation
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                      (Math.pow(1 + monthlyRate, numPayments) - 1);
      totalAmount = monthlyPayment * numPayments;
      totalInterest = totalAmount - loanAmount;
    } else if (repaymentPlan === 'extended') {
      // Extended repayment (25 years)
      const extendedPayments = 25 * 12;
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, extendedPayments)) / 
                      (Math.pow(1 + monthlyRate, extendedPayments) - 1);
      totalAmount = monthlyPayment * extendedPayments;
      totalInterest = totalAmount - loanAmount;
    } else {
      // Graduated repayment (starts lower, increases over time)
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                      (Math.pow(1 + monthlyRate, numPayments) - 1) * 0.75;
      totalAmount = monthlyPayment * numPayments * 1.3; // Approximation
      totalInterest = totalAmount - loanAmount;
    }

    setResults({
      monthlyPayment: monthlyPayment || 0,
      totalInterest: totalInterest || 0,
      totalAmount: totalAmount || 0,
      payoffDate: new Date(Date.now() + numPayments * 30 * 24 * 60 * 60 * 1000)
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, repaymentPlan]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(`Check out this Student Loan Calculator: ${url}`);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard.",
    });
  };

  return (
    <Layout>
      <SEO 
        title="UK Student Loan Repayment Calculator - Plan Your Education Finances"
        description="Calculate your student loan repayments with our free UK calculator. Understand monthly payments, total interest, and repayment strategies for your education debt."
        keywords="student loan calculator, UK student loans, education finance, loan repayment"
        canonical="/uk-student-loan-repayment-calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <Badge variant="secondary" className="text-sm font-medium">Most Popular</Badge>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Student Loan Repayment Calculator
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Plan your education finances with our comprehensive student loan calculator. 
                Understand your monthly payments and develop effective repayment strategies.
              </p>
              <Button onClick={handleShare} variant="outline" className="mt-4">
                <Share2 className="h-4 w-4 mr-2" />
                Share Calculator
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Input Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Loan Details
                  </CardTitle>
                  <CardDescription>
                    Enter your student loan information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (£)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      placeholder="25000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      placeholder="5.5"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Repayment Term (years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      placeholder="10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="repaymentPlan">Repayment Plan</Label>
                    <Select value={repaymentPlan} onValueChange={setRepaymentPlan}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Repayment</SelectItem>
                        <SelectItem value="extended">Extended Repayment</SelectItem>
                        <SelectItem value="graduated">Graduated Repayment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              {results && (
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      Repayment Summary
                    </CardTitle>
                    <CardDescription>
                      Your calculated loan repayment details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="text-2xl font-bold text-primary">
                          £{results.monthlyPayment.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Interest</p>
                        <p className="text-2xl font-bold text-destructive">
                          £{results.totalInterest.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Amount Paid</p>
                      <p className="text-3xl font-bold text-foreground">
                        £{results.totalAmount.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Payoff Date</p>
                      <p className="text-lg font-semibold">
                        {results.payoffDate.toLocaleDateString('en-GB', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
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
                  <CardTitle>What is a Student Loan?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Student loans are borrowed funds specifically designed to help cover the costs of higher education, 
                    including tuition fees, accommodation, and living expenses during your studies.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Tuition fee loans cover university course costs</li>
                    <li>• Maintenance loans help with living expenses</li>
                    <li>• Interest accrues from when you receive the loan</li>
                    <li>• Repayments typically start after graduation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Use This Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Enter your total loan amount</li>
                    <li>2. Input the interest rate on your loan</li>
                    <li>3. Choose your preferred repayment term</li>
                    <li>4. Select your repayment plan type</li>
                    <li>5. Review your monthly payment and total cost</li>
                  </ol>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Use different scenarios to find the most suitable repayment strategy for your financial situation.
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
                  <h4 className="font-semibold mb-2">When do I start repaying my student loan?</h4>
                  <p className="text-sm text-muted-foreground">
                    Typically, you start repaying your student loan once you've graduated and are earning above a certain threshold.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Can I pay off my loan early?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can make extra payments to reduce the total interest paid and pay off your loan faster.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">What happens if I can't make payments?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact your loan provider immediately to discuss deferment or income-driven repayment options.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-muted/50 border-amber-200">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Disclaimer:</strong> This calculator provides estimates based on the information you provide. 
                  Actual loan terms, payments, and costs may vary. These calculations are for educational purposes only 
                  and should not be considered as financial advice. Please consult with a qualified financial advisor 
                  for personalized guidance regarding your student loans.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentLoanCalculator;