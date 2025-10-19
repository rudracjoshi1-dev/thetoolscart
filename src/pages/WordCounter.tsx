import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Clock, Eye, Mic } from "lucide-react";
import { RelatedTools } from "@/components/RelatedTools";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useCallback(() => {
    if (!text.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
      };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Average reading speed: 200-250 words per minute
    const readingTime = Math.ceil(words / 225);
    
    // Average speaking speed: 130-150 words per minute
    const speakingTime = Math.ceil(words / 140);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    };
  }, [text]);

  const currentStats = stats();

  const formatTime = (minutes: number) => {
    if (minutes === 0) return "0 min";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Word Counter</h1>
            <p className="text-lg text-muted-foreground">
              Count words, characters, and get reading time estimates for your text.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Text Input
                  </CardTitle>
                  <CardDescription>
                    Paste or type your text below to analyze it
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Start typing or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[400px] resize-none"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Text Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Characters:</span>
                    <span className="font-semibold">{currentStats.characters.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Characters (no spaces):</span>
                    <span className="font-semibold">{currentStats.charactersNoSpaces.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Words:</span>
                    <span className="font-semibold">{currentStats.words.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sentences:</span>
                    <span className="font-semibold">{currentStats.sentences.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paragraphs:</span>
                    <span className="font-semibold">{currentStats.paragraphs.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Estimates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Reading time:</span>
                    </div>
                    <span className="font-semibold">{formatTime(currentStats.readingTime)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Speaking time:</span>
                    </div>
                    <span className="font-semibold">{formatTime(currentStats.speakingTime)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What is Word Counter */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>What is a Word Counter Tool?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                A word counter is a powerful text analysis tool that provides detailed statistics about your written content. 
                It goes beyond simply counting words to give you comprehensive insights including character count, sentence count, 
                paragraph count, and estimated reading and speaking times.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li><strong>Word Count:</strong> Total number of words in your text</li>
                    <li><strong>Character Count:</strong> With and without spaces</li>
                    <li><strong>Sentence Count:</strong> Number of complete sentences</li>
                    <li><strong>Paragraph Count:</strong> Distinct paragraphs identified</li>
                    <li><strong>Reading Time:</strong> Estimated time to read (225 words/min)</li>
                    <li><strong>Speaking Time:</strong> Estimated presentation time (140 words/min)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Why Use This Tool:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Meet specific word count requirements for essays and articles</li>
                    <li>Ensure social media posts stay within character limits</li>
                    <li>Plan presentation timing accurately</li>
                    <li>Optimize content for SEO and readability</li>
                    <li>Track writing progress and productivity</li>
                    <li>Quick, accurate, and completely free to use</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Use the Word Counter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Getting Started:</h4>
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Type or paste your text into the input area</li>
                    <li>Statistics update automatically as you type</li>
                    <li>View all metrics in the right-hand panel</li>
                    <li>Use reading/speaking time for presentations</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Common Use Cases:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Academic essays and dissertations</li>
                    <li>Blog posts and articles</li>
                    <li>Social media content</li>
                    <li>Professional reports and documents</li>
                    <li>Speech and presentation scripts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">How accurate is the word counter?</h4>
                  <p className="text-sm text-muted-foreground">
                    Our word counter is highly accurate, using standard algorithms to identify words separated by spaces. 
                    It counts all words including contractions and hyphenated words as individual words.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Does it count punctuation as characters?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, the character count includes all characters including punctuation, numbers, and special symbols. 
                    We also provide a character count without spaces.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">How is reading time calculated?</h4>
                  <p className="text-sm text-muted-foreground">
                    Reading time is based on an average reading speed of 225 words per minute, which is the standard for adults. 
                    Speaking time uses 140 words per minute, the average presentation pace.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Is my text saved or stored?</h4>
                  <p className="text-sm text-muted-foreground">
                    No, all text processing happens in your browser. We do not save, store, or transmit your text to any server. 
                    Your privacy is completely protected.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Can I use this for any language?</h4>
                  <p className="text-sm text-muted-foreground">
                    The tool works with most languages, though reading and speaking times are calibrated for English. 
                    Word counting works universally for any language that uses spaces to separate words.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Tools */}
          <RelatedTools currentPath="/free-online-word-counter-tool" />

        </div>
      </div>
    </Layout>
  );
};

export default WordCounter;