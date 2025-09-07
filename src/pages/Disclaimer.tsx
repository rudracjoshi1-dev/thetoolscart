import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Scale, Shield, FileText } from "lucide-react";

const Disclaimer = () => {
  return (
    <Layout>
      <SEO 
        title="Disclaimer - Financial Calculator Terms and Conditions"
        description="Important disclaimer and legal information for our financial calculators and tools. Understand limitations and proper usage guidelines."
        keywords="financial calculator disclaimer, terms conditions, investment calculator limitations, financial advice disclaimer"
        canonical="https://toolkit-pro.lovable.app/disclaimer"
      />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Important information regarding the use of our financial calculators and tools
            </p>
          </div>

          <div className="space-y-6">
            {/* General Disclaimer */}
            <Card className="border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="h-5 w-5" />
                  General Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  The financial calculators and tools provided on this website are for informational and educational purposes only. 
                  They are designed to help you make preliminary financial calculations and should not be considered as professional 
                  financial, investment, tax, or legal advice.
                </p>
                <p className="text-sm leading-relaxed">
                  All calculations are estimates based on the information you provide and the assumptions built into our calculators. 
                  Actual results may vary significantly and could be higher or lower than the estimates provided.
                </p>
              </CardContent>
            </Card>

            {/* Not Financial Advice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Not Financial Advice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  <strong>Important:</strong> None of the content on this website constitutes financial advice. We are not licensed 
                  financial advisors, investment professionals, or tax experts. The calculators are educational tools only.
                </p>
                <p className="text-sm leading-relaxed">
                  Before making any financial decisions, you should consult with qualified professionals such as:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>Licensed financial advisors or planners</li>
                  <li>Qualified investment professionals</li>
                  <li>Certified public accountants (CPAs)</li>
                  <li>Tax professionals</li>
                  <li>Legal counsel when appropriate</li>
                </ul>
              </CardContent>
            </Card>

            {/* Accuracy and Limitations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Accuracy and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  While we strive to ensure our calculators are accurate and up-to-date, we make no warranties or representations 
                  about their accuracy, completeness, or suitability for any particular purpose.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Calculator Limitations:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Results are estimates based on simplified mathematical models</li>
                    <li>They do not account for all real-world variables and market conditions</li>
                    <li>Tax implications, fees, and changing regulations are not fully considered</li>
                    <li>Market volatility and economic changes can significantly impact actual outcomes</li>
                    <li>Personal circumstances may affect the applicability of results</li>
                  </ul>
                </div>

                <p className="text-sm leading-relaxed">
                  <strong>Investment Returns:</strong> Past performance does not guarantee future results. Investment values can 
                  go down as well as up, and you may receive back less than you invested. All investments carry risk.
                </p>
              </CardContent>
            </Card>

            {/* User Responsibility */}
            <Card>
              <CardHeader>
                <CardTitle>User Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  By using our calculators, you acknowledge that:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li>You understand the limitations and assumptions of each calculator</li>
                  <li>You will not rely solely on these tools for financial decisions</li>
                  <li>You will seek professional advice for significant financial matters</li>
                  <li>You are responsible for verifying all calculations and assumptions</li>
                  <li>You understand that results are estimates and may not reflect actual outcomes</li>
                </ul>
              </CardContent>
            </Card>

            {/* Liability Limitation */}
            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  To the fullest extent permitted by law, we disclaim all liability for any direct, indirect, incidental, 
                  consequential, or special damages arising from or in connection with your use of our calculators or 
                  reliance on their results. This includes, but is not limited to, any financial losses or missed opportunities.
                </p>
              </CardContent>
            </Card>

            {/* Updates and Changes */}
            <Card>
              <CardHeader>
                <CardTitle>Updates and Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  We reserve the right to modify, update, or discontinue any calculator or its underlying assumptions at any time 
                  without notice. Tax rates, regulations, and financial markets change frequently, and our calculators may not 
                  always reflect the most current information.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300">Questions or Concerns?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-blue-700 dark:text-blue-300">
                  If you have questions about this disclaimer or our calculators, please contact us through our 
                  <a href="/contact" className="underline ml-1">contact page</a>. 
                  For specific financial advice, please consult with qualified professionals.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Last updated: December 2024</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Disclaimer;