import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
const Contact = () => {
  return <Layout>
      <SEO title="Contact Us - ToolKit Pro | Get in Touch" description="Contact us for feedback, suggestions, or support. We'd love to hear from you about our free online tools." keywords="contact, feedback, support, get in touch, help" canonical="https://toolkit-pro.lovable.app/contact" />
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Send us your feedback or questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mx-0">
            <Card>
              <CardHeader className="text-center">
                <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">Email Support</CardTitle>
                <CardDescription>Get help with technical issues</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-5xl">Feedback</CardTitle>
                <CardDescription>Share your suggestions</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <HelpCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-5xl">General Questions</CardTitle>
                <CardDescription>Ask us anything</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Use the form below to get in touch with our team. We'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                
                  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdc8SHG30jaoV1cX_Z6IebmAOkUSHQsm9sv6C39EY43sUT01A/viewform?embedded=true" width="100%" height="100%" frameBorder="0" className="rounded-lg" title="Contact Form">Loading Contact Form…</iframe>
                
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Note: This is a placeholder Google Form. Replace the src URL with your actual Google Form embed link.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Alternatively, you can reach us directly at{" "}
              <a href="mailto:hello@toolkitpro.com" className="text-primary hover:underline">
                hello@toolkitpro.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>;
};
export default Contact;