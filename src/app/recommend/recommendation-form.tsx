'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { recommendPCConfiguration, RecommendPCConfigurationInput, RecommendPCConfigurationOutput } from '@/ai/flows/recommend-pc-configuration';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  budget: z.string().min(2, 'Please enter a budget.'),
  intendedUsage: z.string().min(3, 'Please describe what you will use the PC for.'),
  preferredFormFactor: z.enum(['Desktop', 'Laptop'], { required_error: 'Please select a form factor.' }),
  specificRequirements: z.string().optional(),
});

export function RecommendationForm() {
  const [recommendation, setRecommendation] = useState<RecommendPCConfigurationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: '',
      intendedUsage: '',
      specificRequirements: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendPCConfiguration(values as RecommendPCConfigurationInput);
      setRecommendation(result);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a recommendation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>PC Requirements</CardTitle>
          <CardDescription>Fill out the form below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your budget?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $1000, ~€1500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intendedUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What will you use it for?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Gaming, video editing, office work" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredFormFactor"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Do you prefer a desktop or a laptop?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Desktop" />
                          </FormControl>
                          <FormLabel className="font-normal">Desktop</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Laptop" />
                          </FormControl>
                          <FormLabel className="font-normal">Laptop</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specificRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any specific requirements? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., specific brand, screen size, must have a white case"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get Recommendation
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium">Our AI is analyzing your needs...</p>
                <p className="text-sm text-muted-foreground">This may take a moment.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {recommendation && (
        <Card className="mt-8 border-primary border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Your AI-Powered Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Recommended Configuration</h3>
              <pre className="bg-muted p-4 rounded-md text-sm font-code overflow-x-auto">
                <code>
                  {recommendation.recommendation}
                </code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{recommendation.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
