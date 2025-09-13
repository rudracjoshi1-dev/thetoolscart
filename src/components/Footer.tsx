import { Calculator, Mail, Shield, FileText, PiggyBank, TrendingUp, BarChart3, CreditCard, Lock, GraduationCap, Wallet } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Financial Tools</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional financial calculators and tools to help you plan your financial future.
            </p>
          </div>

          {/* Financial Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Financial Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/uk-savings-calculator-interest-estimator" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <PiggyBank className="h-3 w-3" />
                  Savings Calculator
                </a>
              </li>
              <li>
                <a href="/uk-mortgage-payment-calculator-online" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Calculator className="h-3 w-3" />
                  Mortgage Calculator
                </a>
              </li>
              <li>
                <a href="/uk-compound-interest-calculator-online" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Compound Interest
                </a>
              </li>
              <li>
                <a href="/uk-stocks-and-shares-isa-calculator" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <BarChart3 className="h-3 w-3" />
                  Stocks & Shares ISA
                </a>
              </li>
              <li>
                <a href="/uk-credit-card-repayment-calculator" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <CreditCard className="h-3 w-3" />
                  Credit Card Calculator
                </a>
              </li>
              <li>
                <a href="/uk-student-loan-repayment-calculator" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <GraduationCap className="h-3 w-3" />
                  Student Loan Calculator
                </a>
              </li>
              <li>
                <a href="/net-worth-calculator" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Wallet className="h-3 w-3" />
                  Net Worth Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Other Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold">Other Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/free-secure-password-generator-online" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  Password Generator
                </a>
              </li>
              <li>
                <a href="/free-online-word-counter-tool" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  Word Counter
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
               <li>
                 <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                   Terms of Use
                 </a>
               </li>
               <li>
                 <a href="/disclaimer" className="text-muted-foreground hover:text-foreground transition-colors">
                   Disclaimer
                 </a>
               </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Financial Tools. All rights reserved. Not financial advice - for informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
