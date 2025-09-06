import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, FileText, Lock, PiggyBank, TrendingUp, BarChart3, DollarSign, Target, ArrowRight, Zap, Shield } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const Index = () => {
  const { toast } = useToast();

  const financialTools = [
    {
      name: "Savings Calculator",
      description: "Calculate how your savings grow with compound interest over time",
      icon: PiggyBank,
      href: "/savings-calculator",
      color: "text-green-600",
      category: "Savings & Investment"
    },
    {
      name: "Mortgage Calculator", 
      description: "Calculate monthly payments, interest, and amortization schedules",
      icon: Calculator,
      href: "/mortgage-calculator",
      color: "text-blue-600",
      category: "Loans & Credit"
    },
    {
      name: "Compound Interest Calculator",
      description: "Discover the power of compound interest on your investments",
      icon: TrendingUp,
      href: "/compound-interest",
      color: "text-purple-600",
      category: "Savings & Investment"
    },
    {
      name: "Stocks & Shares ISA Calculator",
      description: "Plan your ISA investments and track potential tax-free growth",
      icon: BarChart3,
      href: "/stocks-shares-isa",
      color: "text-indigo-600",
      category: "Savings & Investment"
    },
    {
      name: "Credit Card Calculator",
      description: "Calculate payoff times and strategies for credit card debt",
      icon: CreditCard,
      href: "/credit-card-calculator",
      color: "text-red-600",
      category: "Loans & Credit"
    }
  ];

  const otherTools = [
    {
      name: "Password Generator",
      description: "Generate secure passwords with customizable options",
      icon: Lock,
      href: "/password-generator",
      color: "text-green-600"
    },
    {
      name: "Word Counter",
      description: "Count words, characters, and paragraphs in your text",
      icon: FileText,
      href: "/word-counter",
      color: "text-blue-600"
    }
  ];

  const handleExploreTools = () => {
    document.getElementById('financial-tools-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <Layout>
      <SEO
        title="Financial Calculators & Tools | Professional Financial Planning"
        description="Access professional financial calculators for savings, mortgages, investments, and credit cards. Plan your financial future with our free tools."
        keywords="financial calculators, savings calculator, mortgage calculator, compound interest, investment planning, credit card calculator"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Calculator className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Financial Tools & Calculators
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Professional financial calculators to help you plan your future. Calculate savings growth, 
              mortgage payments, investment returns, and more with our comprehensive suite of tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleExploreTools} className="text-lg px-8 py-3">
                Explore Financial Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" onClick={() => window.location.href = '/about'}>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Ad Space */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-4xl h-24 bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center mx-4">
            <span className="text-muted-foreground text-sm">Advertisement Space</span>
          </div>
        </div>

        {/* Financial Tools Section */}
        <section id="financial-tools-section" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Financial Calculators</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional-grade financial calculators to help you make informed decisions about your money
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {financialTools.map((tool, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <tool.icon className={`h-6 w-6 ${tool.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{tool.name}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">{tool.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => window.location.href = tool.href}
                    >
                      Calculate Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Other Tools Section */}
        <section className="py-16 px-4 bg-secondary/5">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Other Useful Tools</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Additional utilities to help with your daily tasks
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherTools.map((tool, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => window.location.href = tool.href}
                    >
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Financial Tools?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional-grade calculators designed for accuracy, transparency, and ease of use
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Accurate & Reliable</h3>
                <p className="text-muted-foreground">
                  Industry-standard formulas ensure precise calculations you can trust for financial planning.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Goal-Oriented</h3>
                <p className="text-muted-foreground">
                  Set financial goals and see clear pathways to achieve them with detailed projections.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-muted-foreground">
                  Intuitive interfaces with educational content to help you understand every calculation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Space */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-4xl h-24 bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center mx-4">
            <span className="text-muted-foreground text-sm">Advertisement Space</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
