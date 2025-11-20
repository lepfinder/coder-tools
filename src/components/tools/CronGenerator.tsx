"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Copy, Clock, Calendar, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CronType = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'week';

interface CronConfig {
    second: string;
    minute: string;
    hour: string;
    day: string;
    month: string;
    week: string;
    year: string;
}

export function CronGenerator() {
    const [cronExpression, setCronExpression] = useState<string>("0 0 0 * * ?");
    const [activeTab, setActiveTab] = useState<CronType>('second');

    const [config, setConfig] = useState<CronConfig>({
        second: '0',
        minute: '0',
        hour: '0',
        day: '*',
        month: '*',
        week: '?',
        year: ''
    });

    const [secondType, setSecondType] = useState<string>('every');
    const [secondInterval, setSecondInterval] = useState<string>('1');
    const [secondRange, setSecondRange] = useState<{ start: string; end: string }>({ start: '0', end: '59' });
    const [secondSpecific, setSecondSpecific] = useState<string>('0');

    const [minuteType, setMinuteType] = useState<string>('every');
    const [minuteInterval, setMinuteInterval] = useState<string>('1');
    const [minuteRange, setMinuteRange] = useState<{ start: string; end: string }>({ start: '0', end: '59' });
    const [minuteSpecific, setMinuteSpecific] = useState<string>('0');

    const [hourType, setHourType] = useState<string>('every');
    const [hourInterval, setHourInterval] = useState<string>('1');
    const [hourRange, setHourRange] = useState<{ start: string; end: string }>({ start: '0', end: '23' });
    const [hourSpecific, setHourSpecific] = useState<string>('0');

    const [dayType, setDayType] = useState<string>('every');
    const [dayInterval, setDayInterval] = useState<string>('1');
    const [dayRange, setDayRange] = useState<{ start: string; end: string }>({ start: '1', end: '31' });
    const [daySpecific, setDaySpecific] = useState<string>('1');

    const [monthType, setMonthType] = useState<string>('every');
    const [monthInterval, setMonthInterval] = useState<string>('1');
    const [monthRange, setMonthRange] = useState<{ start: string; end: string }>({ start: '1', end: '12' });
    const [monthSpecific, setMonthSpecific] = useState<string>('1');

    const [weekType, setWeekType] = useState<string>('unspecified');
    const [weekSpecific, setWeekSpecific] = useState<string[]>([]);

    const [nextExecutions, setNextExecutions] = useState<string[]>([]);

    const presets = [
        { name: '每秒执行', expression: '* * * * * ?' },
        { name: '每分钟执行', expression: '0 * * * * ?' },
        { name: '每小时执行', expression: '0 0 * * * ?' },
        { name: '每天午夜执行', expression: '0 0 0 * * ?' },
        { name: '每天上午9点执行', expression: '0 0 9 * * ?' },
        { name: '每周一上午9点执行', expression: '0 0 9 ? * MON' },
        { name: '每月1号上午9点执行', expression: '0 0 9 1 * ?' },
        { name: '工作日上午9点执行', expression: '0 0 9 ? * MON-FRI' },
        { name: '每5分钟执行', expression: '0 0/5 * * * ?' },
        { name: '每30分钟执行', expression: '0 0/30 * * * ?' },
    ];

    const weekDays = [
        { value: 'SUN', label: '周日' },
        { value: 'MON', label: '周一' },
        { value: 'TUE', label: '周二' },
        { value: 'WED', label: '周三' },
        { value: 'THU', label: '周四' },
        { value: 'FRI', label: '周五' },
        { value: 'SAT', label: '周六' },
    ];

    useEffect(() => {
        updateCronExpression();
    }, [secondType, secondInterval, secondRange, secondSpecific,
        minuteType, minuteInterval, minuteRange, minuteSpecific,
        hourType, hourInterval, hourRange, hourSpecific,
        dayType, dayInterval, dayRange, daySpecific,
        monthType, monthInterval, monthRange, monthSpecific,
        weekType, weekSpecific]);

    const updateCronExpression = () => {
        const newConfig = { ...config };

        // Second
        switch (secondType) {
            case 'every':
                newConfig.second = '*';
                break;
            case 'interval':
                newConfig.second = `0/${secondInterval}`;
                break;
            case 'range':
                newConfig.second = `${secondRange.start}-${secondRange.end}`;
                break;
            case 'specific':
                newConfig.second = secondSpecific;
                break;
        }

        // Minute
        switch (minuteType) {
            case 'every':
                newConfig.minute = '*';
                break;
            case 'interval':
                newConfig.minute = `0/${minuteInterval}`;
                break;
            case 'range':
                newConfig.minute = `${minuteRange.start}-${minuteRange.end}`;
                break;
            case 'specific':
                newConfig.minute = minuteSpecific;
                break;
        }

        // Hour
        switch (hourType) {
            case 'every':
                newConfig.hour = '*';
                break;
            case 'interval':
                newConfig.hour = `0/${hourInterval}`;
                break;
            case 'range':
                newConfig.hour = `${hourRange.start}-${hourRange.end}`;
                break;
            case 'specific':
                newConfig.hour = hourSpecific;
                break;
        }

        // Day
        switch (dayType) {
            case 'every':
                newConfig.day = '*';
                break;
            case 'interval':
                newConfig.day = `1/${dayInterval}`;
                break;
            case 'range':
                newConfig.day = `${dayRange.start}-${dayRange.end}`;
                break;
            case 'specific':
                newConfig.day = daySpecific;
                break;
            case 'unspecified':
                newConfig.day = '?';
                break;
        }

        // Month
        switch (monthType) {
            case 'every':
                newConfig.month = '*';
                break;
            case 'interval':
                newConfig.month = `1/${monthInterval}`;
                break;
            case 'range':
                newConfig.month = `${monthRange.start}-${monthRange.end}`;
                break;
            case 'specific':
                newConfig.month = monthSpecific;
                break;
        }

        // Week
        switch (weekType) {
            case 'unspecified':
                newConfig.week = '?';
                break;
            case 'specific':
                newConfig.week = weekSpecific.join(',') || '?';
                break;
        }

        // If week is specified, day should be ?
        if (weekType === 'specific' && weekSpecific.length > 0) {
            newConfig.day = '?';
        }

        // If day is specified (not * or ?), week should be ?
        if (dayType !== 'every' && dayType !== 'unspecified') {
            newConfig.week = '?';
        }

        setConfig(newConfig);
        const expression = `${newConfig.second} ${newConfig.minute} ${newConfig.hour} ${newConfig.day} ${newConfig.month} ${newConfig.week}`;
        setCronExpression(expression);
        calculateNextExecutions(expression);
    };

    const calculateNextExecutions = (expression: string) => {
        // Simple calculation for demonstration
        // In production, you would use a library like 'cron-parser'
        const now = new Date();
        const executions: string[] = [];

        for (let i = 0; i < 5; i++) {
            const next = new Date(now.getTime() + (i + 1) * 60000);
            executions.push(next.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }));
        }

        setNextExecutions(executions);
    };

    const loadPreset = (expression: string) => {
        setCronExpression(expression);
        calculateNextExecutions(expression);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cronExpression);
    };

    const toggleWeekDay = (day: string) => {
        setWeekSpecific(prev => {
            if (prev.includes(day)) {
                return prev.filter(d => d !== day);
            } else {
                return [...prev, day];
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Panel - Configuration */}
            <div className="lg:col-span-2 space-y-4">
                <Card className="shadow-lg">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Cron 表达式配置
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CronType)} className="w-full">
                            <TabsList className="grid w-full grid-cols-6 mb-6 bg-muted/50 p-1 h-auto">
                                {['second', 'minute', 'hour', 'day', 'month', 'week'].map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm py-2 transition-all"
                                    >
                                        {tab === 'second' && '秒'}
                                        {tab === 'minute' && '分'}
                                        {tab === 'hour' && '时'}
                                        {tab === 'day' && '日'}
                                        {tab === 'month' && '月'}
                                        {tab === 'week' && '周'}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* Second Tab */}
                            <TabsContent value="second" className="space-y-4">
                                <RadioGroup value={secondType} onValueChange={setSecondType} className="space-y-3">
                                    <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-all ${secondType === 'every' ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-200' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                                        <RadioGroupItem value="every" id="second-every" className="border-gray-400 text-blue-600" />
                                        <Label htmlFor="second-every" className="flex-1 cursor-pointer font-medium">每秒执行</Label>
                                    </div>
                                    <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-all ${secondType === 'interval' ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-200' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                                        <RadioGroupItem value="interval" id="second-interval" className="border-gray-400 text-blue-600" />
                                        <Label htmlFor="second-interval" className="cursor-pointer font-medium">周期执行</Label>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <span className="text-sm text-muted-foreground">每</span>
                                            <Input
                                                type="number"
                                                min="1"
                                                max="59"
                                                value={secondInterval}
                                                onChange={(e) => setSecondInterval(e.target.value)}
                                                className="w-20 h-8 bg-white"
                                                disabled={secondType !== 'interval'}
                                            />
                                            <span className="text-sm text-muted-foreground">秒执行一次</span>
                                        </div>
                                    </div>
                                    <div className={`flex items-center space-x-3 p-4 rounded-xl border transition-all ${secondType === 'range' ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-200' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                                        <RadioGroupItem value="range" id="second-range" className="border-gray-400 text-blue-600" />
                                        <Label htmlFor="second-range" className="cursor-pointer font-medium">区间执行</Label>
                                        <div className="flex items-center gap-2 ml-auto">
                                            <span className="text-sm text-muted-foreground">从</span>
                                            <Input
                                                type="number"
                                                min="0"
                                                max="59"
                                                value={secondRange.start}
                                                onChange={(e) => setSecondRange({ ...secondRange, start: e.target.value })}
                                                className="w-20 h-8 bg-white"
                                                disabled={secondType !== 'range'}
                                            />
                                            <span className="text-sm text-muted-foreground">到</span>
                                            <Input
                                                type="number"
                                                min="0"
                                                max="59"
                                                value={secondRange.end}
                                                onChange={(e) => setSecondRange({ ...secondRange, end: e.target.value })}
                                                className="w-20 h-8 bg-white"
                                                disabled={secondType !== 'range'}
                                            />
                                            <span className="text-sm text-muted-foreground">秒</span>
                                        </div>
                                    </div>
                                    <div className={`flex items-start space-x-3 p-4 rounded-xl border transition-all ${secondType === 'specific' ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-200' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}>
                                        <RadioGroupItem value="specific" id="second-specific" className="mt-1 border-gray-400 text-blue-600" />
                                        <div className="flex-1 space-y-2">
                                            <Label htmlFor="second-specific" className="cursor-pointer font-medium block">指定秒数</Label>
                                            <Input
                                                type="text"
                                                placeholder="例如：0,15,30,45"
                                                value={secondSpecific}
                                                onChange={(e) => setSecondSpecific(e.target.value)}
                                                className="w-full bg-white"
                                                disabled={secondType !== 'specific'}
                                            />
                                        </div>
                                    </div>
                                </RadioGroup>
                            </TabsContent>

                            {/* Minute Tab */}
                            <TabsContent value="minute" className="space-y-4">
                                <RadioGroup value={minuteType} onValueChange={setMinuteType}>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="every" id="minute-every" />
                                        <Label htmlFor="minute-every" className="flex-1 cursor-pointer">每分钟执行</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="interval" id="minute-interval" />
                                        <Label htmlFor="minute-interval" className="cursor-pointer">每</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="59"
                                            value={minuteInterval}
                                            onChange={(e) => setMinuteInterval(e.target.value)}
                                            className="w-20"
                                            disabled={minuteType !== 'interval'}
                                        />
                                        <Label className="cursor-pointer">分钟执行一次</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="range" id="minute-range" />
                                        <Label htmlFor="minute-range" className="cursor-pointer">从</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={minuteRange.start}
                                            onChange={(e) => setMinuteRange({ ...minuteRange, start: e.target.value })}
                                            className="w-20"
                                            disabled={minuteType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">到</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="59"
                                            value={minuteRange.end}
                                            onChange={(e) => setMinuteRange({ ...minuteRange, end: e.target.value })}
                                            className="w-20"
                                            disabled={minuteType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">分钟</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="specific" id="minute-specific" />
                                        <Label htmlFor="minute-specific" className="cursor-pointer">指定分钟</Label>
                                        <Input
                                            type="text"
                                            placeholder="0,15,30,45"
                                            value={minuteSpecific}
                                            onChange={(e) => setMinuteSpecific(e.target.value)}
                                            className="flex-1"
                                            disabled={minuteType !== 'specific'}
                                        />
                                    </div>
                                </RadioGroup>
                            </TabsContent>

                            {/* Hour Tab */}
                            <TabsContent value="hour" className="space-y-4">
                                <RadioGroup value={hourType} onValueChange={setHourType}>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="every" id="hour-every" />
                                        <Label htmlFor="hour-every" className="flex-1 cursor-pointer">每小时执行</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="interval" id="hour-interval" />
                                        <Label htmlFor="hour-interval" className="cursor-pointer">每</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="23"
                                            value={hourInterval}
                                            onChange={(e) => setHourInterval(e.target.value)}
                                            className="w-20"
                                            disabled={hourType !== 'interval'}
                                        />
                                        <Label className="cursor-pointer">小时执行一次</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="range" id="hour-range" />
                                        <Label htmlFor="hour-range" className="cursor-pointer">从</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={hourRange.start}
                                            onChange={(e) => setHourRange({ ...hourRange, start: e.target.value })}
                                            className="w-20"
                                            disabled={hourType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">到</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={hourRange.end}
                                            onChange={(e) => setHourRange({ ...hourRange, end: e.target.value })}
                                            className="w-20"
                                            disabled={hourType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">点</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="specific" id="hour-specific" />
                                        <Label htmlFor="hour-specific" className="cursor-pointer">指定小时</Label>
                                        <Input
                                            type="text"
                                            placeholder="0,6,12,18"
                                            value={hourSpecific}
                                            onChange={(e) => setHourSpecific(e.target.value)}
                                            className="flex-1"
                                            disabled={hourType !== 'specific'}
                                        />
                                    </div>
                                </RadioGroup>
                            </TabsContent>

                            {/* Day Tab */}
                            <TabsContent value="day" className="space-y-4">
                                <RadioGroup value={dayType} onValueChange={setDayType}>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="every" id="day-every" />
                                        <Label htmlFor="day-every" className="flex-1 cursor-pointer">每天执行</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="interval" id="day-interval" />
                                        <Label htmlFor="day-interval" className="cursor-pointer">每</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={dayInterval}
                                            onChange={(e) => setDayInterval(e.target.value)}
                                            className="w-20"
                                            disabled={dayType !== 'interval'}
                                        />
                                        <Label className="cursor-pointer">天执行一次</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="range" id="day-range" />
                                        <Label htmlFor="day-range" className="cursor-pointer">从</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={dayRange.start}
                                            onChange={(e) => setDayRange({ ...dayRange, start: e.target.value })}
                                            className="w-20"
                                            disabled={dayType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">到</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={dayRange.end}
                                            onChange={(e) => setDayRange({ ...dayRange, end: e.target.value })}
                                            className="w-20"
                                            disabled={dayType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">号</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="specific" id="day-specific" />
                                        <Label htmlFor="day-specific" className="cursor-pointer">指定日期</Label>
                                        <Input
                                            type="text"
                                            placeholder="1,15,30"
                                            value={daySpecific}
                                            onChange={(e) => setDaySpecific(e.target.value)}
                                            className="flex-1"
                                            disabled={dayType !== 'specific'}
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="unspecified" id="day-unspecified" />
                                        <Label htmlFor="day-unspecified" className="flex-1 cursor-pointer">不指定</Label>
                                    </div>
                                </RadioGroup>
                            </TabsContent>

                            {/* Month Tab */}
                            <TabsContent value="month" className="space-y-4">
                                <RadioGroup value={monthType} onValueChange={setMonthType}>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="every" id="month-every" />
                                        <Label htmlFor="month-every" className="flex-1 cursor-pointer">每月执行</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="interval" id="month-interval" />
                                        <Label htmlFor="month-interval" className="cursor-pointer">每</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={monthInterval}
                                            onChange={(e) => setMonthInterval(e.target.value)}
                                            className="w-20"
                                            disabled={monthType !== 'interval'}
                                        />
                                        <Label className="cursor-pointer">个月执行一次</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="range" id="month-range" />
                                        <Label htmlFor="month-range" className="cursor-pointer">从</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={monthRange.start}
                                            onChange={(e) => setMonthRange({ ...monthRange, start: e.target.value })}
                                            className="w-20"
                                            disabled={monthType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">到</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max="12"
                                            value={monthRange.end}
                                            onChange={(e) => setMonthRange({ ...monthRange, end: e.target.value })}
                                            className="w-20"
                                            disabled={monthType !== 'range'}
                                        />
                                        <Label className="cursor-pointer">月</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="specific" id="month-specific" />
                                        <Label htmlFor="month-specific" className="cursor-pointer">指定月份</Label>
                                        <Input
                                            type="text"
                                            placeholder="1,4,7,10"
                                            value={monthSpecific}
                                            onChange={(e) => setMonthSpecific(e.target.value)}
                                            className="flex-1"
                                            disabled={monthType !== 'specific'}
                                        />
                                    </div>
                                </RadioGroup>
                            </TabsContent>

                            {/* Week Tab */}
                            <TabsContent value="week" className="space-y-4">
                                <RadioGroup value={weekType} onValueChange={setWeekType}>
                                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="unspecified" id="week-unspecified" />
                                        <Label htmlFor="week-unspecified" className="flex-1 cursor-pointer">不指定</Label>
                                    </div>
                                    <div className="space-y-3 p-3 rounded-lg border">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="specific" id="week-specific" />
                                            <Label htmlFor="week-specific" className="cursor-pointer font-medium">指定星期</Label>
                                        </div>
                                        <div className="grid grid-cols-4 gap-2 pl-6">
                                            {weekDays.map(day => (
                                                <button
                                                    key={day.value}
                                                    type="button"
                                                    onClick={() => toggleWeekDay(day.value)}
                                                    disabled={weekType !== 'specific'}
                                                    className={`
                            px-3 py-2 rounded-md text-sm font-medium transition-all
                            ${weekSpecific.includes(day.value)
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }
                            ${weekType !== 'specific' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                                                >
                                                    {day.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </RadioGroup>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Next Executions - Moved to Left Panel */}
                <Card className="shadow-lg">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Calendar className="h-5 w-5 text-purple-600" />
                            接下来的执行时间
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-3">
                            {nextExecutions.map((time, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center gap-3 p-3 rounded-xl border border-transparent bg-purple-50/50 hover:bg-white hover:border-purple-100 hover:shadow-sm transition-all duration-200"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </div>
                                    <div className="font-mono text-sm text-slate-600 group-hover:text-purple-700 transition-colors">{time}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Panel - Result & Presets */}
            <div className="space-y-4">
                {/* Cron Expression Result */}
                <Card className="shadow-lg">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Sparkles className="h-5 w-5 text-green-600" />
                            Cron 表达式
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-muted-foreground font-mono text-sm">CRON</span>
                                </div>
                                <Input
                                    value={cronExpression}
                                    readOnly
                                    className="pl-14 pr-12 py-6 font-mono text-xl font-bold bg-slate-50 border-slate-200 text-slate-700 shadow-inner"
                                />
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={copyToClipboard}
                                    title="复制"
                                    className="absolute inset-y-0 right-0 h-full px-3 hover:bg-transparent text-slate-400 hover:text-slate-600"
                                >
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-4 space-y-3">
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">字段解析</div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <span className="text-[10px] text-slate-400 uppercase">秒</span>
                                        <span className="font-mono font-medium text-blue-600">{config.second}</span>
                                    </div>
                                    <div className="flex flex-col p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <span className="text-[10px] text-slate-400 uppercase">分</span>
                                        <span className="font-mono font-medium text-blue-600">{config.minute}</span>
                                    </div>
                                    <div className="flex flex-col p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <span className="text-[10px] text-slate-400 uppercase">时</span>
                                        <span className="font-mono font-medium text-blue-600">{config.hour}</span>
                                    </div>
                                    <div className="flex flex-col p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <span className="text-[10px] text-slate-400 uppercase">日</span>
                                        <span className="font-mono font-medium text-blue-600">{config.day}</span>
                                    </div>
                                    <div className="flex flex-col p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <span className="text-[10px] text-slate-400 uppercase">月</span>
                                        <span className="font-mono font-medium text-blue-600">{config.month}</span>
                                    </div>
                                    <div className="flex flex-col p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                        <span className="text-[10px] text-slate-400 uppercase">周</span>
                                        <span className="font-mono font-medium text-blue-600">{config.week}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>



                <Card className="shadow-lg">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Clock className="h-5 w-5 text-orange-600" />
                            常用预设
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {presets.map((preset, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="h-auto py-3 px-4 justify-start text-left hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all group"
                                    onClick={() => loadPreset(preset.expression)}
                                >
                                    <div className="flex flex-col items-start gap-1.5 w-full">
                                        <span className="font-medium text-sm group-hover:text-orange-900">{preset.name}</span>
                                        <span className="font-mono text-[10px] text-muted-foreground group-hover:text-orange-600/80 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 group-hover:border-orange-100 group-hover:bg-white transition-colors w-full truncate">
                                            {preset.expression}
                                        </span>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
