
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Symptom, SeverityLevel, SymptomCategory } from "@/models/SymptomTypes";
import { Badge } from "@/components/ui/badge";
import { api } from "@/services/api";
import { toast } from "@/hooks/use-toast";

// Sample symptoms for demo purposes (in a real app, we'd fetch these from the backend)
const commonSymptoms: Symptom[] = [
  {
    id: "sym1",
    name: "Headache",
    category: "neurological",
    severity: "moderate",
    description: "Pain in the head or upper neck",
  },
  {
    id: "sym2",
    name: "Fever",
    category: "general",
    severity: "moderate",
    description: "Elevated body temperature above the normal range",
  },
  {
    id: "sym3",
    name: "Cough",
    category: "respiratory",
    severity: "mild",
    description: "Sudden expulsion of air from the lungs",
  },
  {
    id: "sym4",
    name: "Fatigue",
    category: "general",
    severity: "mild",
    description: "Feeling of tiredness or exhaustion",
  },
  {
    id: "sym5",
    name: "Shortness of breath",
    category: "respiratory",
    severity: "severe",
    description: "Difficulty breathing or dyspnea",
  },
];

const formSchema = z.object({
  symptomId: z.string({
    required_error: "Please select a symptom",
  }),
  severity: z.enum(["mild", "moderate", "severe", "critical"] as const, {
    required_error: "Please select severity",
  }),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  endDate: z.date().optional(),
  notes: z.string().optional(),
  medications: z.array(z.string()).optional(),
  factors: z.array(z.string()).optional(),
});

const SymptomTracker = () => {
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState("");
  const [factors, setFactors] = useState<string[]>([]);
  const [newFactor, setNewFactor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      severity: "mild",
      startDate: new Date(),
      medications: [],
      factors: [],
    },
  });

  const onSelectSymptom = (symptomId: string) => {
    const symptom = commonSymptoms.find((s) => s.id === symptomId);
    if (symptom) {
      setSelectedSymptom(symptom);
    }
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const addFactor = () => {
    if (newFactor.trim()) {
      setFactors([...factors, newFactor.trim()]);
      setNewFactor("");
    }
  };

  const removeFactor = (index: number) => {
    setFactors(factors.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // In a real implementation, we'd send this to a backend API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Submitting symptom log:", {
        ...values,
        medications,
        factors,
      });
      
      toast({
        title: "Symptom logged successfully",
        description: "Your symptom has been recorded.",
        duration: 3000,
      });
      
      // Reset form
      form.reset();
      setSelectedSymptom(null);
      setMedications([]);
      setFactors([]);
    } catch (error) {
      toast({
        title: "Failed to log symptom",
        description: "There was an error recording your symptom. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 bg-card rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Track Your Symptoms</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="symptomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptom</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    onSelectSymptom(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a symptom" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {commonSymptoms.map((symptom) => (
                      <SelectItem key={symptom.id} value={symptom.id}>
                        {symptom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSymptom && (
                  <FormDescription>
                    {selectedSymptom.description}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || 
                          date < form.getValues("startDate") ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes about your symptom"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Medications Taken (Optional)</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {medications.map((med, index) => (
                <Badge key={index} variant="secondary" className="py-1">
                  {med}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => removeMedication(index)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                placeholder="Add medication"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addMedication}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <FormLabel>Related Factors (Optional)</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {factors.map((factor, index) => (
                <Badge key={index} variant="outline" className="py-1">
                  {factor}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => removeFactor(index)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newFactor}
                onChange={(e) => setNewFactor(e.target.value)}
                placeholder="Add related factor (stress, diet, etc.)"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addFactor}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging Symptom..." : "Log Symptom"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SymptomTracker;
