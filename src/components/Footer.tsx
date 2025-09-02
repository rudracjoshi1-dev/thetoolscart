import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              ToolKit Pro
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Free professional tools to help you be more productive. From word counting to financial calculations, we've got you covered.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/word-counter"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Word Counter
                </Link>
              </li>
              <li>
                <Link
                  to="/password-generator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Password Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/mortgage-calculator"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/compound-interest"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compound Interest
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ToolKit Pro. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/contact"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;