import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
                <p className="mb-4">
                  ToolKit Pro is designed with privacy in mind. We do not collect, store, or transmit any personal information 
                  or data that you enter into our tools. All calculations and processing are performed locally in your browser.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We do not store your text in the Word Counter tool</li>
                  <li>We do not save generated passwords</li>
                  <li>We do not retain mortgage or investment calculation data</li>
                  <li>No personal information is collected or stored</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">How We Use Information</h2>
                <p className="mb-4">
                  Since we don't collect personal information, we don't use it for any purpose. Our tools process your data 
                  locally and securely within your browser session only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Cookies and Tracking</h2>
                <p className="mb-4">
                  We may use essential cookies to ensure the proper functioning of our website. We do not use tracking cookies 
                  or third-party analytics that could compromise your privacy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
                <p className="mb-4">
                  Our website may contain advertisements served by third-party advertising networks. These services may use 
                  cookies and similar technologies to serve relevant ads. We do not share any personal information with these services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Data Security</h2>
                <p className="mb-4">
                  All data processing occurs locally in your browser. No information is transmitted to our servers unless 
                  you specifically choose to contact us through our contact form.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from 
                  children under 13.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
                  privacy policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this privacy policy, please contact us through our contact page.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;