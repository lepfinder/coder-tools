"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, Minimize2, Maximize2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from '@monaco-editor/react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[600px]">
            <Card className="flex flex-col h-full">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                    <CardTitle className="text-sm font-medium">Input JSON</CardTitle>
                    <Button variant="ghost" size="icon" onClick={clearAll} title="Clear">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 p-0 min-h-0 relative">
                    <Editor
                        height="100%"
                        defaultLanguage="json"
                        value={input}
                        onChange={(value) => setInput(value || "")}
                        theme="light"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            wordWrap: 'on',
                            wrappingIndent: 'indent',
                            automaticLayout: true,
                            tabSize: 2,
                            formatOnPaste: true,
                            formatOnType: true,
                        }}
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
                        <div className="h-full w-full overflow-auto custom-scrollbar">
                            <SyntaxHighlighter
                                language="json"
                                style={oneLight}
                                customStyle={{
                                    margin: 0,
                                    padding: '1rem',
                                    background: 'transparent',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.5',
                                    minHeight: '100%',
                                }}
                                wrapLines={true}
                                wrapLongLines={true}
                            >
                                {output || ' '}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
