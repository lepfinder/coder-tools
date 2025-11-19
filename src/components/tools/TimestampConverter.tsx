"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Play, Pause, RefreshCw } from "lucide-react";

export function TimestampConverter() {
    const [now, setNow] = useState<number>(Math.floor(Date.now() / 1000));
    const [isPaused, setIsPaused] = useState(false);

    const [tsInput, setTsInput] = useState("");
    const [tsUnit, setTsUnit] = useState("s"); // s or ms
    const [tsResult, setTsResult] = useState("");

    const [dateInput, setDateInput] = useState("");
    const [dateResult, setDateResult] = useState("");

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setNow(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const convertTimestamp = () => {
        if (!tsInput) return;
        try {
            let ts = parseInt(tsInput);
            if (isNaN(ts)) {
                setTsResult("Invalid Timestamp");
                return;
            }
            if (tsUnit === "s") {
                ts *= 1000;
            }
            const date = new Date(ts);
            setTsResult(format(date, "yyyy-MM-dd HH:mm:ss"));
        } catch (e) {
            setTsResult("Error");
        }
    };

    const convertDate = () => {
        if (!dateInput) return;
        try {
            const date = new Date(dateInput);
            if (isNaN(date.getTime())) {
                setDateResult("Invalid Date");
                return;
            }
            setDateResult(Math.floor(date.getTime() / 1000).toString());
        } catch (e) {
            setDateResult("Error");
        }
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current Unix Timestamp</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-mono font-bold text-primary" suppressHydrationWarning>{now}</div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => setIsPaused(!isPaused)}>
                                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => setNow(Math.floor(Date.now() / 1000))}>
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Timestamp to Date</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Timestamp"
                                value={tsInput}
                                onChange={(e) => setTsInput(e.target.value)}
                                className="font-mono"
                            />
                            <Select value={tsUnit} onValueChange={setTsUnit}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="s">Seconds</SelectItem>
                                    <SelectItem value="ms">Millis</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full" onClick={convertTimestamp}>Convert</Button>
                        <div className="space-y-1">
                            <Label>Result</Label>
                            <Input readOnly value={tsResult} className="bg-muted font-mono" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Date to Timestamp</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            type="datetime-local"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                            className="font-mono"
                        />
                        <Button className="w-full" onClick={convertDate}>Convert</Button>
                        <div className="space-y-1">
                            <Label>Result (Seconds)</Label>
                            <Input readOnly value={dateResult} className="bg-muted font-mono" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
