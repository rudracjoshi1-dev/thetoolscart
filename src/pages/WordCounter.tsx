import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Clock, Eye, Mic } from "lucide-react";

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

export default WordCounter;