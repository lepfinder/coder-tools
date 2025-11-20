"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2, Calculator } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function SetOperations() {
    const [inputA, setInputA] = useLocalStorage("set-ops-input-a", "");
    const [inputB, setInputB] = useLocalStorage("set-ops-input-b", "");
    const [onlyInA, setOnlyInA] = useState<string[]>([]);
    const [onlyInB, setOnlyInB] = useState<string[]>([]);
    const [inBoth, setInBoth] = useState<string[]>([]);
    const [showResults, setShowResults] = useState(false);

    const parseSet = (text: string): Set<string> => {
        return new Set(
            text
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
        );
    };

    const calculate = () => {
        const elementsA = parseSet(inputA);
        const elementsB = parseSet(inputB);

        // A - B: elements only in A
        const onlyA = Array.from(elementsA).filter(item => !elementsB.has(item));

        // B - A: elements only in B
        const onlyB = Array.from(elementsB).filter(item => !elementsA.has(item));

        // A ∩ B: intersection (elements in both)
        const both = Array.from(elementsA).filter(item => elementsB.has(item));

        setOnlyInA(onlyA);
        setOnlyInB(onlyB);
        setInBoth(both);
        setShowResults(true);
    };

    const clearAll = () => {
        setInputA("");
        setInputB("");
        setOnlyInA([]);
        setOnlyInB([]);
        setInBoth([]);
        setShowResults(false);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const loadExample = () => {
        setInputA("apple\nbanana\ncherry\ndate\nelderberry");
        setInputB("banana\ndate\nfig\ngrape\ncherry");
        setShowResults(false);
    };

    return (
        <div className="space-y-4 h-full">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Set A */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Set A</CardTitle>
                        <CardDescription className="text-xs">Enter elements, one per line</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="apple&#10;banana&#10;cherry"
                            value={inputA}
                            onChange={(e) => setInputA(e.target.value)}
                            className="h-[250px] max-h-[250px] font-mono text-sm resize-none"
                        />
                    </CardContent>
                </Card>

                {/* Set B */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Set B</CardTitle>
                        <CardDescription className="text-xs">Enter elements, one per line</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="banana&#10;date&#10;fig"
                            value={inputB}
                            onChange={(e) => setInputB(e.target.value)}
                            className="h-[250px] max-h-[250px] font-mono text-sm resize-none"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center">
                <Button onClick={calculate} className="gap-2">
                    <Calculator className="h-4 w-4" />
                    Calculate
                </Button>
                <Button onClick={loadExample} variant="outline">
                    Load Example
                </Button>
                <Button onClick={clearAll} variant="outline">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                </Button>
            </div>

            {/* Results Section */}
            {showResults && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* A - B */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium">A - B</CardTitle>
                                    <CardDescription className="text-xs">
                                        Only in Set A ({onlyInA.length} items)
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(onlyInA.join('\n'))}
                                    disabled={onlyInA.length === 0}
                                    title="Copy"
                                >
                                    <Copy className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 rounded-md p-3 min-h-[150px] max-h-[300px] overflow-auto">
                                {onlyInA.length > 0 ? (
                                    <div className="space-y-1 font-mono text-sm">
                                        {onlyInA.map((item, index) => (
                                            <div key={index} className="text-blue-600 dark:text-blue-400">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No unique elements</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* A ∩ B */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium">A ∩ B</CardTitle>
                                    <CardDescription className="text-xs">
                                        In both sets ({inBoth.length} items)
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(inBoth.join('\n'))}
                                    disabled={inBoth.length === 0}
                                    title="Copy"
                                >
                                    <Copy className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 rounded-md p-3 min-h-[150px] max-h-[300px] overflow-auto">
                                {inBoth.length > 0 ? (
                                    <div className="space-y-1 font-mono text-sm">
                                        {inBoth.map((item, index) => (
                                            <div key={index} className="text-green-600 dark:text-green-400">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No common elements</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* B - A */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-medium">B - A</CardTitle>
                                    <CardDescription className="text-xs">
                                        Only in Set B ({onlyInB.length} items)
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(onlyInB.join('\n'))}
                                    disabled={onlyInB.length === 0}
                                    title="Copy"
                                >
                                    <Copy className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 rounded-md p-3 min-h-[150px] max-h-[300px] overflow-auto">
                                {onlyInB.length > 0 ? (
                                    <div className="space-y-1 font-mono text-sm">
                                        {onlyInB.map((item, index) => (
                                            <div key={index} className="text-orange-600 dark:text-orange-400">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No unique elements</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
