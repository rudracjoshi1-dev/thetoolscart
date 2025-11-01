import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Key, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RelatedTools } from "@/components/RelatedTools";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let characters = "";
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (characters === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type.",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setPassword(result);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy password to clipboard.",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: "None", color: "bg-gray-300", width: "0%" };
    
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { strength: "Weak", color: "bg-red-500", width: "25%" };
    if (score <= 4) return { strength: "Medium", color: "bg-yellow-500", width: "50%" };
    if (score <= 5) return { strength: "Strong", color: "bg-green-500", width: "75%" };
    return { strength: "Very Strong", color: "bg-green-600", width: "100%" };
  };

  const strengthInfo = getPasswordStrength(password);

  // Generate initial password
  useState(() => {
    generatePassword();
  });

  return (
    <Layout>
      <SEO
        title="Password Generator | Free Secure Password Generator Online"
        description="Generate strong, secure passwords instantly. Free online password generator with customizable length and character options for maximum security."
        keywords="password generator, secure password, random password, strong password generator, password creator"
        canonical="https://Financialtoolz.lovable.app/free-secure-password-generator-online"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Secure Password Generator",
          "applicationCategory": "UtilitiesApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "GBP"
          },
          "description": "Generate cryptographically secure random passwords with customizable length and character types."
        }}
      />
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Secure Password Generator</h1>
            <p className="text-lg text-muted-foreground">
              Generate secure passwords with customizable options.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Generated Password
                </CardTitle>
                <CardDescription>
                  Your secure password will appear here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={password}
                    readOnly
                    className="font-mono text-lg"
                    placeholder="Click generate to create a password"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    disabled={!password}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {password && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Password Strength:</span>
                      <span className={`font-semibold ${
                        strengthInfo.strength === 'Weak' ? 'text-red-500' :
                        strengthInfo.strength === 'Medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`}>
                        {strengthInfo.strength}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                        style={{ width: strengthInfo.width }}
                      ></div>
                    </div>
                  </div>
                )}

                <Button onClick={generatePassword} className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>
                  Customize your password requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Password Length: {length[0]}</Label>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    max={128}
                    min={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>4</span>
                    <span>128</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="uppercase" className="text-sm font-medium">
                      Uppercase (A-Z)
                    </Label>
                    <Switch
                      id="uppercase"
                      checked={includeUppercase}
                      onCheckedChange={setIncludeUppercase}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="lowercase" className="text-sm font-medium">
                      Lowercase (a-z)
                    </Label>
                    <Switch
                      id="lowercase"
                      checked={includeLowercase}
                      onCheckedChange={setIncludeLowercase}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="numbers" className="text-sm font-medium">
                      Numbers (0-9)
                    </Label>
                    <Switch
                      id="numbers"
                      checked={includeNumbers}
                      onCheckedChange={setIncludeNumbers}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="symbols" className="text-sm font-medium">
                      Symbols (!@#$...)
                    </Label>
                    <Switch
                      id="symbols"
                      checked={includeSymbols}
                      onCheckedChange={setIncludeSymbols}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What is a Password Generator */}
          <Card className="mt-12">
            <CardHeader>
              <h2 className="text-2xl font-bold">What is a Password Generator?</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                A password generator is a cybersecurity tool that creates strong, random, and unique passwords to protect your online accounts. 
                It uses advanced algorithms to combine various character types (uppercase, lowercase, numbers, and symbols) in unpredictable ways, 
                making passwords virtually impossible for hackers to guess or crack through brute force attacks.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Why Use a Password Generator:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li><strong>Enhanced Security:</strong> Creates passwords far stronger than human-generated ones</li>
                    <li><strong>True Randomness:</strong> Eliminates predictable patterns and common words</li>
                    <li><strong>Customizable Strength:</strong> Adjust length and character types to meet requirements</li>
                    <li><strong>Instant Generation:</strong> Create secure passwords in seconds</li>
                    <li><strong>Unique Each Time:</strong> Every password is completely different</li>
                    <li><strong>Privacy Protected:</strong> Generated locally in your browser</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Password Security Best Practices:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Use passwords at least 12-16 characters long</li>
                    <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
                    <li>Never reuse passwords across different accounts</li>
                    <li>Change passwords regularly (every 3-6 months)</li>
                    <li>Store passwords in a secure password manager</li>
                    <li>Enable two-factor authentication (2FA) when available</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-bold">How to Use the Password Generator</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Step-by-Step Guide:</h4>
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Adjust the password length slider (4-128 characters)</li>
                    <li>Select which character types to include</li>
                    <li>Click "Generate New Password" to create a password</li>
                    <li>Review the password strength indicator</li>
                    <li>Click the copy button to save the password</li>
                    <li>Store it securely in a password manager</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Understanding Strength Levels:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li><strong>Weak:</strong> Under 8 characters or limited character types</li>
                    <li><strong>Medium:</strong> 8-11 characters with 2-3 character types</li>
                    <li><strong>Strong:</strong> 12+ characters with 3+ character types</li>
                    <li><strong>Very Strong:</strong> 16+ characters with all character types</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">How long should my password be?</h4>
                  <p className="text-sm text-muted-foreground">
                    We recommend at least 12-16 characters for most accounts. For highly sensitive accounts (banking, email), 
                    use 16+ characters. Longer passwords are exponentially more secure.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Are generated passwords safe to use?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! All passwords are generated locally in your browser using cryptographically secure random number generation. 
                    We never send, store, or log any passwords. They're completely private to you.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Should I include symbols in my password?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, including symbols significantly increases password strength. However, ensure the website or service 
                    you're using allows special characters. Some systems have restrictions on which symbols they accept.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How do I remember these complex passwords?</h4>
                  <p className="text-sm text-muted-foreground">
                    Use a reputable password manager like Bitwarden, 1Password, or LastPass. These tools securely store and 
                    auto-fill your passwords, so you only need to remember one master password.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Can the same password be generated twice?</h4>
                  <p className="text-sm text-muted-foreground">
                    While theoretically possible, the probability is astronomically low. For a 16-character password with all 
                    character types, there are trillions of possible combinations, making duplicates virtually impossible.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Why does the strength meter show "Medium" for my password?</h4>
                  <p className="text-sm text-muted-foreground">
                    The strength meter evaluates password length and character diversity. To achieve "Very Strong," ensure your 
                    password is 16+ characters and includes all character types (uppercase, lowercase, numbers, and symbols).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <RelatedTools currentPath="/free-secure-password-generator-online" />

        </div>
      </div>
    </Layout>
  );
};

export default PasswordGenerator;
