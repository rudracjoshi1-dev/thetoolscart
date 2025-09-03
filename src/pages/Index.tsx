import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Key, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
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
      <SEO 
        title="ToolKit Pro - Professional Tools for Everyday Tasks | Free Online Tools"
        description="Access free professional-grade tools including Word Counter, Password Generator, Mortgage Calculator, and Compound Interest Calculator. No registration required."
        keywords="free tools, word counter, password generator, mortgage calculator, compound interest calculator, online tools, professional tools"
        canonical="https://toolkit-pro.lovable.app/"
      />
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
          return <Card key={tool.href} className="group hover:shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-card border-border/50 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300" variant="default">
                    <Link to={tool.href}>Try Now</Link>
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>
      </section>

      {/* Ad Space - Mobile */}
      <section className="container py-8 md:hidden">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border/20 rounded-lg p-6 text-center">
          <div className="h-20 flex items-center justify-center text-muted-foreground text-sm">
            Advertisement Space (Mobile)
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Tools?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools designed with your privacy and productivity in mind.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-full flex items-center justify-center border border-green-200 dark:border-green-800 group-hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Free to Use</h3>
            <p className="text-muted-foreground">
              All tools are completely free with no hidden costs or premium features.
            </p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-full flex items-center justify-center border border-blue-200 dark:border-blue-800 group-hover:shadow-lg transition-shadow">
              <Key className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Privacy Focused</h3>
            <p className="text-muted-foreground">
              Your data stays on your device. We don't store or track your usage.
            </p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-full flex items-center justify-center border border-purple-200 dark:border-purple-800 group-hover:shadow-lg transition-shadow">
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Professional Grade</h3>
            <p className="text-muted-foreground">
              Built with accuracy and reliability in mind for professional use.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Space - Desktop */}
      <section className="container py-8 hidden md:block">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border/20 rounded-lg p-8 text-center">
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            Advertisement Space (Desktop)
          </div>
        </div>
      </section>
    </Layout>;
};
export default Index;