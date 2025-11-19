"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, Minimize2, Maximize2 } from "lucide-react";

export function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const formatJson = (space: number) => {
        try {
            if (!input.trim()) {
                setOutput("");
                setError("");
                return;
            }
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, space));
            setError("");
        } catch (e) {
            setError((e as Error).message);
            setOutput("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError("");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
            <Card className="flex flex-col h-full">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                    <CardTitle className="text-sm font-medium">Input JSON</CardTitle>
                    <Button variant="ghost" size="icon" onClick={clearAll} title="Clear">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 p-0 min-h-0 relative">
                    <Textarea
                        className="h-full w-full resize-none border-0 focus-visible:ring-0 rounded-none p-4 font-mono text-sm"
                        placeholder="Paste your JSON here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </CardContent>
            </Card>

            <Card className="flex flex-col h-full">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                    <CardTitle className="text-sm font-medium">Output</CardTitle>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => formatJson(0)} title="Minify">
                            <Minimize2 className="h-4 w-4 mr-1" /> Minify
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => formatJson(2)} title="Prettify">
                            <Maximize2 className="h-4 w-4 mr-1" /> Format
                        </Button>
                        <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!output} title="Copy">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 min-h-0 relative bg-muted/30">
                    {error ? (
                        <div className="p-4 text-destructive font-mono text-sm">{error}</div>
                    ) : (
                        <Textarea
                            className="h-full w-full resize-none border-0 focus-visible:ring-0 rounded-none p-4 font-mono text-sm bg-transparent"
                            readOnly
                            value={output}
                            placeholder="Formatted JSON will appear here..."
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
