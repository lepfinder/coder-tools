"use client";

import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { TimestampConverter } from "@/components/tools/TimestampConverter";
import { Base64Converter } from "@/components/tools/Base64Converter";
import { TextDiff } from "@/components/tools/TextDiff";
import { SetOperations } from "@/components/tools/SetOperations";
import { NginxFormatter } from "@/components/tools/NginxFormatter";
import { FileJson, Clock, Binary, FileDiff, Network, Server, CalendarClock } from "lucide-react";

const CronGenerator = dynamic(
  () => import("@/components/tools/CronGenerator").then((mod) => ({ default: mod.CronGenerator })),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Developer Tools</h1>
        <p className="text-muted-foreground">
          A collection of essential utilities for developers.
        </p>
      </div>

      <Tabs defaultValue="json" className="w-full space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-5xl grid-cols-3 md:grid-cols-7 h-auto p-1">
            <TabsTrigger value="json" className="py-2 gap-2">
              <FileJson className="h-4 w-4" />
              <span className="hidden sm:inline">JSON Format</span>
              <span className="sm:hidden">JSON</span>
            </TabsTrigger>
            <TabsTrigger value="timestamp" className="py-2 gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Timestamp</span>
              <span className="sm:hidden">Time</span>
            </TabsTrigger>
            <TabsTrigger value="base64" className="py-2 gap-2">
              <Binary className="h-4 w-4" />
              <span className="hidden sm:inline">Base64</span>
              <span className="sm:hidden">B64</span>
            </TabsTrigger>
            <TabsTrigger value="diff" className="py-2 gap-2">
              <FileDiff className="h-4 w-4" />
              <span className="hidden sm:inline">Text Diff</span>
              <span className="sm:hidden">Diff</span>
            </TabsTrigger>
            <TabsTrigger value="sets" className="py-2 gap-2">
              <Network className="h-4 w-4" />
              <span className="hidden sm:inline">Set Ops</span>
              <span className="sm:hidden">Sets</span>
            </TabsTrigger>
            <TabsTrigger value="nginx" className="py-2 gap-2">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Nginx</span>
              <span className="sm:hidden">NGX</span>
            </TabsTrigger>
            <TabsTrigger value="cron" className="py-2 gap-2">
              <CalendarClock className="h-4 w-4" />
              <span className="hidden sm:inline">Cron</span>
              <span className="sm:hidden">Cron</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="json" className="outline-none mt-0">
          <JsonFormatter />
        </TabsContent>

        <TabsContent value="timestamp" className="outline-none mt-0">
          <TimestampConverter />
        </TabsContent>

        <TabsContent value="base64" className="outline-none mt-0">
          <Base64Converter />
        </TabsContent>

        <TabsContent value="diff" className="outline-none mt-0">
          <TextDiff />
        </TabsContent>

        <TabsContent value="sets" className="outline-none mt-0">
          <SetOperations />
        </TabsContent>

        <TabsContent value="nginx" className="outline-none mt-0">
          <NginxFormatter />
        </TabsContent>

        <TabsContent value="cron" className="outline-none mt-0">
          <CronGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
