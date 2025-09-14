import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import WordCounter from "./pages/WordCounter";
import PasswordGenerator from "./pages/PasswordGenerator";
import MortgageCalculator from "./pages/MortgageCalculator";
import CompoundInterestCalculator from "./pages/CompoundInterestCalculator";
import StocksSharesISACalculator from "./pages/StocksSharesISACalculator";
import CreditCardCalculator from "./pages/CreditCardCalculator";
import SavingsCalculator from "./pages/SavingsCalculator";
import StudentLoanCalculator from "./pages/StudentLoanCalculator";
import NetWorthCalculator from "./pages/NetWorthCalculator";
import TermsOfUse from "./pages/TermsOfUse";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uk-savings-calculator-interest-estimator" element={<SavingsCalculator />} />
          <Route path="/free-online-word-counter-tool" element={<WordCounter />} />
          <Route path="/free-secure-password-generator-online" element={<PasswordGenerator />} />
          <Route path="/uk-mortgage-payment-calculator-online" element={<MortgageCalculator />} />
          <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/uk-stocks-and-shares-isa-calculator" element={<StocksSharesISACalculator />} />
          <Route path="/uk-credit-card-repayment-calculator" element={<CreditCardCalculator />} />
          <Route path="/uk-student-loan-repayment-calculator" element={<StudentLoanCalculator />} />
          <Route path="/net-worth-calculator" element={<NetWorthCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/disclaimer" element={<Disclaimer />} />
           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
