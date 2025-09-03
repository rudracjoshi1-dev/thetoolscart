import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toolsLinks = [
    { name: "Word Counter", href: "/word-counter" },
    { name: "Password Generator", href: "/password-generator" },
    { name: "Mortgage Calculator", href: "/mortgage-calculator" },
    { name: "Compound Interest Calculator", href: "/compound-interest" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-center">
        <div className="flex items-center w-full max-w-6xl justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
        >
          ToolKit Pro
        </Link>

        {/* Desktop Navigation */}
        <nav className="mx-6 hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-foreground/80 ${
              isActive("/") ? "text-foreground" : "text-foreground/60"
            }`}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60">
              Tools
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {toolsLinks.map((tool) => (
                <DropdownMenuItem key={tool.href} asChild>
                  <Link
                    to={tool.href}
                    className={`w-full ${
                      isActive(tool.href) ? "bg-accent" : ""
                    }`}
                  >
                    {tool.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/privacy"
            className={`transition-colors hover:text-foreground/80 ${
              isActive("/privacy") ? "text-foreground" : "text-foreground/60"
            }`}
          >
            Privacy Policy
          </Link>

          <Link
            to="/contact"
            className={`transition-colors hover:text-foreground/80 ${
              isActive("/contact") ? "text-foreground" : "text-foreground/60"
            }`}
          >
            Contact Us
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
                <Link
                  to="/"
                  className="block px-2 py-1 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                
                <div className="space-y-2">
                  <div className="px-2 py-1 text-lg font-medium">Tools</div>
                  <div className="ml-4 flex flex-col space-y-2">
                    {toolsLinks.map((tool) => (
                      <Link
                        key={tool.href}
                        to={tool.href}
                        className="block px-2 py-1 text-base hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/privacy"
                  className="block px-2 py-1 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/contact"
                  className="block px-2 py-1 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;