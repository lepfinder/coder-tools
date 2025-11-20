"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Trash2, FileJson, Minimize2, Maximize2 } from "lucide-react";
import Editor from '@monaco-editor/react';

interface EditorPanelProps {
    value: string;
    onChange: (value: string) => void;
    onFormat: () => void;
    onMinify: () => void;
    onClear: () => void;
    onCopy: () => void;
    onLoadExample: () => void;
}

function EditorPanel({ value, onChange, onFormat, onMinify, onClear, onCopy, onLoadExample }: EditorPanelProps) {
    return (
        <Card className="flex flex-col h-full min-h-[600px]">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-3 border-b">
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onFormat}
                        className="h-8 px-2"
                        title="Format JSON"
                    >
                        <Maximize2 className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Format</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onMinify}
                        className="h-8 px-2"
                        title="Minify JSON"
                    >
                        <Minimize2 className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Minify</span>
                    </Button>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onLoadExample}
                        className="h-8 w-8"
                        title="Load Example"
                    >
                        <FileJson className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClear}
                        className="h-8 w-8"
                        title="Clear"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onCopy}
                        className="h-8 w-8"
                        title="Copy"
                        disabled={!value}
                    >
                        <Copy className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={value}
                    onChange={(val) => onChange(val || "")}
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
    );
}

export function JsonFormatter() {
    const [editors, setEditors] = useState<string[]>(["", ""]);

    const exampleJson = JSON.stringify({
        "name": "John Doe",
        "age": 30,
        "email": "john.doe@example.com",
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "country": "USA"
        },
        "hobbies": ["reading", "coding", "traveling"]
    }, null, 2);

    const updateEditor = (index: number, value: string) => {
        const newEditors = [...editors];
        newEditors[index] = value;
        setEditors(newEditors);
    };

    const formatJson = (index: number) => {
        try {
            const parsed = JSON.parse(editors[index]);
            updateEditor(index, JSON.stringify(parsed, null, 2));
        } catch (e) {
            // Keep original value if parsing fails
        }
    };

    const minifyJson = (index: number) => {
        try {
            const parsed = JSON.parse(editors[index]);
            updateEditor(index, JSON.stringify(parsed));
        } catch (e) {
            // Keep original value if parsing fails
        }
    };

    const clearEditor = (index: number) => {
        updateEditor(index, "");
    };

    const copyEditor = (index: number) => {
        navigator.clipboard.writeText(editors[index]);
    };

    const loadExample = (index: number) => {
        updateEditor(index, exampleJson);
    };

    return (
        <div className="grid grid-cols-2 gap-4 h-full min-h-[600px]">
            {editors.map((value, index) => (
                <EditorPanel
                    key={index}
                    value={value}
                    onChange={(val) => updateEditor(index, val)}
                    onFormat={() => formatJson(index)}
                    onMinify={() => minifyJson(index)}
                    onClear={() => clearEditor(index)}
                    onCopy={() => copyEditor(index)}
                    onLoadExample={() => loadExample(index)}
                />
            ))}
        </div>
    );
}
