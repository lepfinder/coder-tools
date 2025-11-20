"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function Base64Converter() {
    const [encodeInput, setEncodeInput] = useLocalStorage("base64-encode-input", "");
    const [encodeOutput, setEncodeOutput] = useLocalStorage("base64-encode-output", "");

    const [decodeInput, setDecodeInput] = useLocalStorage("base64-decode-input", "");
    const [decodeOutput, setDecodeOutput] = useLocalStorage("base64-decode-output", "");

    const handleEncode = () => {
        try {
            setEncodeOutput(btoa(encodeInput));
        } catch (e) {
            setEncodeOutput("Error: Invalid input for Base64 encoding");
        }
    };

    const handleDecode = () => {
        try {
            setDecodeOutput(atob(decodeInput));
        } catch (e) {
            setDecodeOutput("Error: Invalid Base64 string");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="encode" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="encode">Encode</TabsTrigger>
                    <TabsTrigger value="decode">Decode</TabsTrigger>
                </TabsList>

                <TabsContent value="encode" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between py-3">
                            <CardTitle className="text-sm font-medium">Text to Encode</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => { setEncodeInput(""); setEncodeOutput(""); }}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                className="min-h-[150px] font-mono"
                                placeholder="Type text here..."
                                value={encodeInput}
                                onChange={(e) => setEncodeInput(e.target.value)}
                            />
                        </CardContent>
                    </Card>

                    <Button className="w-full" onClick={handleEncode}>Encode to Base64</Button>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between py-3">
                            <CardTitle className="text-sm font-medium">Base64 Output</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(encodeOutput)} disabled={!encodeOutput}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                className="min-h-[150px] font-mono bg-muted"
                                readOnly
                                value={encodeOutput}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="decode" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between py-3">
                            <CardTitle className="text-sm font-medium">Base64 to Decode</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => { setDecodeInput(""); setDecodeOutput(""); }}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                className="min-h-[150px] font-mono"
                                placeholder="Paste Base64 string here..."
                                value={decodeInput}
                                onChange={(e) => setDecodeInput(e.target.value)}
                            />
                        </CardContent>
                    </Card>

                    <Button className="w-full" onClick={handleDecode}>Decode from Base64</Button>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between py-3">
                            <CardTitle className="text-sm font-medium">Decoded Text</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(decodeOutput)} disabled={!decodeOutput}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                className="min-h-[150px] font-mono bg-muted"
                                readOnly
                                value={decodeOutput}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
