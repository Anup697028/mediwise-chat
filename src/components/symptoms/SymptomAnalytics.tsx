
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SymptomAnalytics as SymptomAnalyticsType, SymptomCategory } from "@/models/SymptomTypes";

// Sample data for demonstration purposes
const sampleAnalytics: SymptomAnalyticsType = {
  mostFrequent: [
    { symptomId: "sym1", count: 12, avgSeverity: 2.3, avgDuration: 180 },
    { symptomId: "sym2", count: 8, avgSeverity: 1.5, avgDuration: 240 },
    { symptomId: "sym3", count: 6, avgSeverity: 2.8, avgDuration: 120 },
  ],
  recentLogs: [],
  longestDuration: [],
  severityTrends: {
    mild: 18,
    moderate: 12,
    severe: 5,
    critical: 1,
  },
  categoryDistribution: {
    general: 10,
    respiratory: 8,
    digestive: 5,
    cardiovascular: 3,
    neurological: 7,
    musculoskeletal: 2,
    psychological: 0,
    dermatological: 1,
    other: 0,
  },
};

// Map symptom IDs to names (in a real app, this would come from the API)
const symptomMap: Record<string, string> = {
  sym1: "Headache",
  sym2: "Fever",
  sym3: "Cough",
  sym4: "Fatigue",
  sym5: "Shortness of breath",
};

// Color mapping for categories
const categoryColors: Record<SymptomCategory, string> = {
  general: "#8884d8",
  respiratory: "#82ca9d",
  digestive: "#ffc658",
  cardiovascular: "#ff8042",
  neurological: "#a4de6c",
  musculoskeletal: "#d0ed57",
  psychological: "#83a6ed",
  dermatological: "#8dd1e1",
  other: "#bc5090",
};

// Color mapping for severity
const severityColors = {
  mild: "#82ca9d",
  moderate: "#ffc658",
  severe: "#ff8042",
  critical: "#ff0000",
};

const SymptomAnalytics = () => {
  // Transform data for charts
  const frequencyData = sampleAnalytics.mostFrequent.map((item) => ({
    name: symptomMap[item.symptomId] || item.symptomId,
    count: item.count,
  }));

  const severityData = Object.entries(sampleAnalytics.severityTrends).map(
    ([severity, count]) => ({
      name: severity.charAt(0).toUpperCase() + severity.slice(1),
      value: count,
    })
  );

  const categoryData = Object.entries(sampleAnalytics.categoryDistribution)
    .filter(([_, count]) => count > 0)
    .map(([category, count]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: count,
      category: category as SymptomCategory,
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Symptom Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Frequent Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle>Most Frequent Symptoms</CardTitle>
            <CardDescription>
              Your most commonly reported symptoms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={frequencyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
            <CardDescription>
              Distribution of symptom severity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {severityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={severityColors[entry.name.toLowerCase() as keyof typeof severityColors]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {Object.entries(severityColors).map(([severity, color]) => (
                <Badge
                  key={severity}
                  style={{ backgroundColor: color, color: severity === 'mild' ? 'black' : 'white' }}
                >
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Symptom Categories</CardTitle>
            <CardDescription>
              Distribution of symptoms by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={categoryColors[entry.category]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomAnalytics;
