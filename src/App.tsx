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
import TermsOfUse from "./pages/TermsOfUse";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
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
          <Route path="/savings-calculator" element={<SavingsCalculator />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/stocks-shares-isa" element={<StocksSharesISACalculator />} />
          <Route path="/credit-card-calculator" element={<CreditCardCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
