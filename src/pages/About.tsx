import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Target, Shield, Users, TrendingUp, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <SEO
        title="About Us - Financial Tools & Calculators | Our Mission"
        description="Learn about our mission to provide free, accurate financial calculators and tools to help you make informed financial decisions."
        keywords="about us, financial tools, mission, financial education"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                About Financial Tools
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Empowering individuals with free, professional-grade financial calculators 
                and educational resources to make informed financial decisions.
              </p>
            </div>

            {/* Mission Statement */}
            <Card className="mb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  We believe that everyone deserves access to the tools and knowledge needed to 
                  understand their financial situation. Our mission is to provide accurate, 
                  easy-to-use financial calculators that help people plan for their future, 
                  make informed decisions, and achieve their financial goals.
                </p>
              </CardContent>
            </Card>

            {/* What We Offer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calculator className="h-5 w-5" />
                      Financial Calculators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Professional-grade calculators for savings, mortgages, credit cards, 
                      investments, and more.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lightbulb className="h-5 w-5" />
                      Educational Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Clear explanations of financial concepts to help you understand 
                      how different calculations work.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5" />
                      Visual Projections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Interactive charts and graphs to visualize your financial 
                      projections and scenarios.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Our Tools */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Our Financial Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Badge variant="secondary" className="justify-center p-2">Savings Calculator</Badge>
                  <Badge variant="secondary" className="justify-center p-2">Mortgage Calculator</Badge>
                  <Badge variant="secondary" className="justify-center p-2">Compound Interest</Badge>
                  <Badge variant="secondary" className="justify-center p-2">Stocks & Shares ISA</Badge>
                  <Badge variant="secondary" className="justify-center p-2">Credit Card Repayment</Badge>
                  <Badge variant="secondary" className="justify-center p-2">Password Generator</Badge>
                  <Badge variant="secondary" className="justify-center p-2">Word Counter</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Our Values */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      Accuracy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We use industry-standard formulas and regularly verify our calculations 
                      to ensure reliability and precision.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Accessibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our tools are completely free and designed to be user-friendly, 
                      regardless of your financial background.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We believe in empowering users with knowledge, not just tools. 
                      Each calculator includes educational content.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Disclaimer */}
            <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50">
              <CardHeader>
                <CardTitle className="text-orange-700 dark:text-orange-400">
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 dark:text-orange-300">
                  While we strive for accuracy, our calculators provide estimates for educational 
                  purposes only. They are not a substitute for professional financial advice. 
                  Always consult with qualified financial advisors for important financial decisions.
                </p>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <div className="text-center mt-12">
              <h2 className="text-2xl font-bold mb-4">Questions or Feedback?</h2>
              <p className="text-muted-foreground mb-6">
                We'd love to hear from you. If you have suggestions for new calculators 
                or improvements to existing ones, please get in touch.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;