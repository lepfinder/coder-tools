"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { diffLines, Change } from "diff";

export function TextDiff() {
    const [oldText, setOldText] = useState("");
    const [newText, setNewText] = useState("");
    const [diffs, setDiffs] = useState<Change[]>([]);

    useEffect(() => {
        if (!oldText && !newText) {
            setDiffs([]);
            return;
        }
        const changes = diffLines(oldText, newText);
        setDiffs(changes);
    }, [oldText, newText]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)] min-h-[600px]">
            <div className="flex flex-col gap-4 h-full">
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Original Text</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 min-h-0">
                        <Textarea
                            className="h-full w-full resize-none border-0 focus-visible:ring-0 rounded-none p-4 font-mono text-sm"
                            placeholder="Paste original text..."
                            value={oldText}
                            onChange={(e) => setOldText(e.target.value)}
                        />
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">Modified Text</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 min-h-0">
                        <Textarea
                            className="h-full w-full resize-none border-0 focus-visible:ring-0 rounded-none p-4 font-mono text-sm"
                            placeholder="Paste modified text..."
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                        />
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col h-full overflow-hidden">
                <CardHeader className="py-3 bg-muted/50">
                    <CardTitle className="text-sm font-medium">Diff Result</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-auto bg-background">
                    <div className="font-mono text-sm">
                        {diffs.map((part, index) => {
                            const color = part.added ? "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100" :
                                part.removed ? "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100" :
                                    "text-muted-foreground";
                            const prefix = part.added ? "+ " : part.removed ? "- " : "  ";

                            return (
                                <div key={index} className={`${color} whitespace-pre-wrap border-b border-border/50 last:border-0`}>
                                    {part.value.split('\n').map((line, i) => {
                                        // diffLines includes the newline in the value, so we need to handle empty strings from split if it ends with newline
                                        if (i === part.value.split('\n').length - 1 && line === "") return null;
                                        return (
                                            <div key={i} className="px-4 py-0.5 flex">
                                                <span className="select-none opacity-50 w-6 inline-block text-xs pt-0.5">{prefix}</span>
                                                <span>{line}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        {diffs.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                Enter text in both panels to see the difference.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
