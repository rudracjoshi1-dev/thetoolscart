import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Key, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Password Generator</h1>
            <p className="text-lg text-muted-foreground">
              Generate secure passwords with customizable settings.
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

          {/* Mobile Ad Space */}
          <div className="mt-8 md:hidden">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border/20 rounded-lg p-4 text-center">
              <div className="h-16 flex items-center justify-center text-muted-foreground text-sm">
                Advertisement Space (Mobile)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PasswordGenerator;