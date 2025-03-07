
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SymptomTracker from "@/components/symptoms/SymptomTracker";
import SymptomAnalytics from "@/components/symptoms/SymptomAnalytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SymptomTrackerPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Symptom Tracker</h1>
        <p className="text-muted-foreground">
          Track your symptoms over time and gain insights about your health patterns.
        </p>
      </div>

      <Tabs defaultValue="track" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="track">Track Symptoms</TabsTrigger>
          <TabsTrigger value="analytics">View Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="track" className="mt-6">
          <SymptomTracker />
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <SymptomAnalytics />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Track Symptoms</CardTitle>
            <CardDescription>Log your symptoms and monitor your health</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Regularly track your symptoms to identify patterns and triggers.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Share With Doctor</CardTitle>
            <CardDescription>Provide accurate health information</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Share your symptom history with your doctor for better diagnosis and treatment.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Health Insights</CardTitle>
            <CardDescription>Understand your health patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Gain insights about your health trends and potential triggers.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomTrackerPage;
