import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Key, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
const Index = () => {
  const tools = [{
    title: "Word Counter",
    description: "Count words, characters, and get reading/speaking time estimates for your text.",
    icon: FileText,
    href: "/word-counter",
    color: "from-blue-500 to-blue-600"
  }, {
    title: "Password Generator",
    description: "Generate secure passwords with customizable length and character sets.",
    icon: Key,
    href: "/password-generator",
    color: "from-green-500 to-green-600"
  }, {
    title: "Mortgage Calculator",
    description: "Calculate monthly payments, interest breakdown, and amortization schedules.",
    icon: Calculator,
    href: "/mortgage-calculator",
    color: "from-purple-500 to-purple-600"
  }, {
    title: "Compound Interest Calculator",
    description: "Visualize how your investments grow over time with compound interest.",
    icon: TrendingUp,
    href: "/compound-interest",
    color: "from-orange-500 to-orange-600"
  }];
  return <Layout>
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Professional Tools for
            <br />
            Everyday Tasks
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access a collection of free, professional-grade tools designed to make your work more efficient and productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Link to="/word-counter">Explore Tools</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Tool</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional tools that help you get things done faster and more accurately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map(tool => {
          const IconComponent = tool.icon;
          return <Card key={tool.href} className="group hover:shadow-lg transition-all duration-300 bg-gradient-card border-border/50">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="outline">
                    <Link to={tool.href}>Try Now</Link>
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free to Use</h3>
            <p className="text-muted-foreground">
              All tools are completely free with no hidden costs or premium features.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Key className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
            <p className="text-muted-foreground">
              Your data stays on your device. We don't store or track your usage.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Grade</h3>
            <p className="text-muted-foreground">
              Built with accuracy and reliability in mind for professional use.
            </p>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Index;