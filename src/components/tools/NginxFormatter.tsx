"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Trash2, FileJson, Maximize2 } from "lucide-react";
import Editor from '@monaco-editor/react';
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface EditorPanelProps {
    value: string;
    onChange: (value: string) => void;
    onFormat: () => void;
    onClear: () => void;
    onCopy: () => void;
    onLoadExample: () => void;
}

function EditorPanel({ value, onChange, onFormat, onClear, onCopy, onLoadExample }: EditorPanelProps) {
    return (
        <Card className="flex flex-col h-full min-h-[600px]">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-3 border-b">
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onFormat}
                        className="h-8 px-2"
                        title="Format Nginx Config"
                    >
                        <Maximize2 className="h-3.5 w-3.5 mr-1" />
                        <span className="text-xs">Format</span>
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
                    defaultLanguage="nginx"
                    value={value}
                    onChange={(val) => onChange(val || "")}
                    theme="light"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        wordWrap: 'off',
                        automaticLayout: true,
                        tabSize: 4,
                        insertSpaces: true,
                    }}
                />
            </CardContent>
        </Card>
    );
}

// Nginx config formatter function
function formatNginxConfig(config: string): string {
    if (!config.trim()) return config;

    const lines = config.split('\n');
    const formatted: string[] = [];
    let indentLevel = 0;
    const indentSize = 4;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Skip empty lines
        if (!line) {
            formatted.push('');
            continue;
        }

        // Check if line closes a block
        const closesBlock = line.startsWith('}');

        // Decrease indent before closing brace
        if (closesBlock) {
            indentLevel = Math.max(0, indentLevel - 1);
        }

        // Add indentation
        const indent = ' '.repeat(indentLevel * indentSize);
        formatted.push(indent + line);

        // Check if line opens a block
        const opensBlock = line.endsWith('{');

        // Increase indent after opening brace
        if (opensBlock) {
            indentLevel++;
        }

        // Handle lines that both close and open blocks (like "} location {")
        if (closesBlock && opensBlock) {
            indentLevel++;
        }
    }

    return formatted.join('\n');
}

export function NginxFormatter() {
    const [editors, setEditors] = useLocalStorage<string[]>("nginx-formatter-editors", ["", ""]);

    const exampleConfig = `server {
listen 80;
server_name example.com www.example.com;
root /var/www/html;
index index.html index.htm;

location / {
try_files $uri $uri/ =404;
}

location /api {
proxy_pass http://localhost:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}

location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
expires 1y;
add_header Cache-Control "public, immutable";
}
}`;

    const updateEditor = (index: number, value: string) => {
        const newEditors = [...editors];
        newEditors[index] = value;
        setEditors(newEditors);
    };

    const formatConfig = (index: number) => {
        try {
            const formatted = formatNginxConfig(editors[index]);
            updateEditor(index, formatted);
        } catch (e) {
            // Keep original value if formatting fails
            console.error('Formatting error:', e);
        }
    };

    const clearEditor = (index: number) => {
        updateEditor(index, "");
    };

    const copyEditor = (index: number) => {
        navigator.clipboard.writeText(editors[index]);
    };

    const loadExample = (index: number) => {
        updateEditor(index, exampleConfig);
    };

    return (
        <div className="grid grid-cols-2 gap-4 h-full min-h-[600px]">
            {editors.map((value, index) => (
                <EditorPanel
                    key={index}
                    value={value}
                    onChange={(val) => updateEditor(index, val)}
                    onFormat={() => formatConfig(index)}
                    onClear={() => clearEditor(index)}
                    onCopy={() => copyEditor(index)}
                    onLoadExample={() => loadExample(index)}
                />
            ))}
        </div>
    );
}
