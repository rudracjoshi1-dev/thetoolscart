import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, CreditCard, Home, PiggyBank, TrendingUp, GraduationCap, Wallet, Key, FileText } from "lucide-react";

interface Tool {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

interface RelatedToolsProps {
  currentPath: string;
  category?: 'financial' | 'utility';
}

const allTools: Tool[] = [
  {
    title: "Mortgage Calculator",
    description: "Calculate your monthly mortgage payments",
    path: "/uk-mortgage-payment-calculator-online",
    icon: <Home className="h-5 w-5" />
  },
  {
    title: "Compound Interest Calculator",
    description: "See how your investments grow over time",
    path: "/uk-compound-interest-calculator-online",
    icon: <Calculator className="h-5 w-5" />
  },
  {
    title: "Savings Calculator",
    description: "Plan your financial future with savings goals",
    path: "/uk-savings-calculator-interest-estimator",
    icon: <PiggyBank className="h-5 w-5" />
  },
  {
    title: "Stocks & Shares ISA Calculator",
    description: "Calculate ISA investment growth potential",
    path: "/uk-stocks-and-shares-isa-calculator",
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    title: "Credit Card Calculator",
    description: "Plan your credit card debt repayment",
    path: "/uk-credit-card-repayment-calculator",
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    title: "Student Loan Calculator",
    description: "Calculate student loan repayment schedules",
    path: "/uk-student-loan-repayment-calculator",
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    title: "Net Worth Calculator",
    description: "Track your total assets and liabilities",
    path: "/net-worth-calculator",
    icon: <Wallet className="h-5 w-5" />
  },
  {
    title: "Password Generator",
    description: "Generate secure passwords instantly",
    path: "/free-secure-password-generator-online",
    icon: <Key className="h-5 w-5" />
  },
  {
    title: "Word Counter",
    description: "Count words, characters, and more",
    path: "/free-online-word-counter-tool",
    icon: <FileText className="h-5 w-5" />
  }
];

export const RelatedTools = ({ currentPath, category }: RelatedToolsProps) => {
  // Filter out current tool and get related tools
  const relatedTools = allTools
    .filter(tool => tool.path !== currentPath)
    .slice(0, 3); // Show 3 related tools

  if (relatedTools.length === 0) return null;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Try Our Other Tools</CardTitle>
        <CardDescription>
          Explore more calculators to help with your financial planning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="group block p-4 rounded-lg border border-border hover:border-primary transition-all hover:shadow-md bg-card"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
