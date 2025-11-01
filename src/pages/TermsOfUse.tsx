import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Scale, Shield } from "lucide-react";

const TermsOfUse = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Use - Financialtoolz.com | Important Legal Information"
        description="Read our terms of use and disclaimer. Our financial calculators provide information only and are not financial advice."
        keywords="terms of use, disclaimer, financial information, legal notice"
        canonical="https://Financialtoolz.lovable.app/terms"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Terms of Use
              </h1>
              <p className="text-xl text-muted-foreground">
                Important legal information and disclaimers
              </p>
            </div>

            {/* Important Disclaimer */}
            <Card className="mb-8 border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                  <AlertTriangle className="h-5 w-5" />
                  Important Financial Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 dark:text-orange-300 font-medium">
                  This website provides financial calculators and tools for informational purposes only. 
                  The results and information provided are NOT financial advice and should not be considered 
                  as professional financial, investment, or tax advice.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {/* Terms of Use */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    By accessing and using this website, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please 
                    do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Nature of Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    All financial calculators, tools, and information provided on this website are for 
                    educational and informational purposes only. The calculations are based on the 
                    information you provide and standard mathematical formulas.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Results are estimates and may not reflect actual outcomes</li>
                    <li>Interest rates, fees, and terms can vary between financial institutions</li>
                    <li>Tax implications and regulations may affect your actual results</li>
                    <li>Economic conditions can impact investment returns and savings growth</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Not Financial Advice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The information provided by our calculators and tools does not constitute financial, 
                    investment, tax, or legal advice. We strongly recommend that you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Consult with qualified financial advisors for personalized advice</li>
                    <li>Verify calculations with financial institutions</li>
                    <li>Consider your personal financial situation and goals</li>
                    <li>Understand the risks associated with any financial decisions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Accuracy and Reliability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    While we strive to ensure the accuracy of our calculators and information, we make 
                    no warranties or representations as to the accuracy, completeness, or reliability 
                    of the information provided.
                  </p>
                  <p className="text-muted-foreground">
                    Users are responsible for verifying all calculations and information with appropriate 
                    financial institutions or professionals before making any financial decisions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    In no event shall this website or its operators be liable for any direct, indirect, 
                    incidental, special, or consequential damages arising out of or in connection with 
                    the use of this website or reliance on the information provided.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Use of Calculators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our financial calculators are provided as a convenience and educational tool. 
                    By using these calculators, you acknowledge that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Results are based on the information you input</li>
                    <li>Calculations use standard formulas and may not account for all variables</li>
                    <li>Actual results may vary significantly from calculated estimates</li>
                    <li>You should not make financial decisions based solely on these calculations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Privacy and Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We do not store or collect any personal financial information you enter into our 
                    calculators. All calculations are performed locally in your browser. However, 
                    we may use analytics cookies to improve our website performance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    We reserve the right to update these terms of use at any time. Changes will be 
                    effective immediately upon posting on this website. Your continued use of the 
                    website constitutes acceptance of any changes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    If you have any questions about these terms of use or need clarification about 
                    our calculators, please contact us through our contact page.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Final Disclaimer */}
            <Card className="mt-8 border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Shield className="h-5 w-5" />
                  Remember
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 dark:text-blue-300">
                  Always seek professional financial advice for important financial decisions. 
                  Our tools are designed to help you understand financial concepts and explore 
                  different scenarios, but they cannot replace professional guidance tailored to 
                  your specific situation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
