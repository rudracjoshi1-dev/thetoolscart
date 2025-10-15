import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Calculator, PiggyBank, TrendingUp, BarChart3, CreditCard, Lock, FileText, GraduationCap, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const financialTools = [{
    name: "Savings Calculator",
    href: "/uk-savings-calculator-interest-estimator",
    icon: PiggyBank
  }, {
    name: "Mortgage Calculator",
    href: "/uk-mortgage-payment-calculator-online",
    icon: Calculator
  }, {
    name: "Compound Interest",
    href: "/uk-compound-interest-calculator-online",
    icon: TrendingUp
  }, {
    name: "Stocks & Shares ISA",
    href: "/uk-stocks-and-shares-isa-calculator",
    icon: BarChart3
  }, {
    name: "Credit Card Calculator",
    href: "/uk-credit-card-repayment-calculator",
    icon: CreditCard
  }, {
    name: "Student Loan Calculator",
    href: "/uk-student-loan-repayment-calculator",
    icon: GraduationCap
  }, {
    name: "Net Worth Calculator",
    href: "/net-worth-calculator",
    icon: Wallet
  }];
  const otherTools = [{
    name: "Password Generator",
    href: "/free-secure-password-generator-online",
    icon: Lock
  }, {
    name: "Word Counter",
    href: "/free-online-word-counter-tool",
    icon: FileText
  }];
  const isActive = (path: string) => location.pathname === path;
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-center">
        <div className="flex items-center w-full max-w-6xl justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <img src="/favicon.ico" alt="FinancialToolz.com" className="h-6 w-6" />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">FinancialToolz.com
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="mx-6 hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className={`transition-colors hover:text-foreground/80 ${isActive("/") ? "text-foreground" : "text-foreground/60"}`}>
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60" onMouseEnter={(e) => e.currentTarget.click()}>
              Financial Tools
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {financialTools.map(tool => <DropdownMenuItem key={tool.href} asChild>
                  <Link to={tool.href} className={`w-full flex items-center gap-2 ${isActive(tool.href) ? "bg-accent" : ""}`}>
                    <tool.icon className="h-4 w-4" />
                    {tool.name}
                  </Link>
                </DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60" onMouseEnter={(e) => e.currentTarget.click()}>
              Other Tools
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {otherTools.map(tool => <DropdownMenuItem key={tool.href} asChild>
                  <Link to={tool.href} className={`w-full flex items-center gap-2 ${isActive(tool.href) ? "bg-accent" : ""}`}>
                    <tool.icon className="h-4 w-4" />
                    {tool.name}
                  </Link>
                </DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/about" className={`transition-colors hover:text-foreground/80 ${isActive("/about") ? "text-foreground" : "text-foreground/60"}`}>
            About
          </Link>

          <Link to="/contact" className={`transition-colors hover:text-foreground/80 ${isActive("/contact") ? "text-foreground" : "text-foreground/60"}`}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="block px-2 py-1 text-lg" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                
                <div className="space-y-2">
                  <div className="px-2 py-1 text-lg font-medium">Financial Tools</div>
                  <div className="ml-4 flex flex-col space-y-2 max-h-40 overflow-y-auto">
                    {financialTools.map(tool => <Link key={tool.href} to={tool.href} className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" onClick={() => setIsOpen(false)}>
                        <tool.icon className="h-4 w-4" />
                        {tool.name}
                      </Link>)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="px-2 py-1 text-lg font-medium">Other Tools</div>
                  <div className="ml-4 flex flex-col space-y-2">
                    {otherTools.map(tool => <Link key={tool.href} to={tool.href} className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" onClick={() => setIsOpen(false)}>
                        <tool.icon className="h-4 w-4" />
                        {tool.name}
                      </Link>)}
                  </div>
                </div>

                <Link to="/about" className="block px-2 py-1 text-lg" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link to="/contact" className="block px-2 py-1 text-lg" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </div>
    </header>;
};
export default Navigation;