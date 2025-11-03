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
import { Loader2, Sparkles, Check, ChevronsUpDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { currencies } from './currencies';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';


const formSchema = z.object({
  budget: z.string().min(1, 'Please enter a budget.'),
  currency: z.string({ required_error: 'Please select a currency.'}),
  intendedUsage: z.string().min(3, 'Please describe what you will use the PC for.'),
  preferredFormFactor: z.enum(['Desktop', 'Laptop'], { required_error: 'Please select a form factor.' }),
  buildTier: z.enum(['Basic', 'Advanced', 'Super High-End'], { required_error: 'Please select a build tier.' }),
  specificRequirements: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RecommendationForm() {
  const [recommendation, setRecommendation] = useState<RecommendPCConfigurationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedCurrency, setSubmittedCurrency] = useState('USD');
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: '',
      currency: 'USD',
      intendedUsage: '',
      buildTier: 'Advanced',
      specificRequirements: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setRecommendation(null);
    setSubmittedCurrency(values.currency);
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
  
  const renderRecommendation = () => {
    if (!recommendation) return null;

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: submittedCurrency,
      }).format(price);
    };
    
    if (recommendation.recommendation && 'name' in recommendation.recommendation && recommendation.recommendation.name) {
       return (
         <div className="overflow-hidden rounded-md border bg-muted">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Laptop</TableHead>
                 <TableHead className="text-right">Estimated Price</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               <TableRow>
                 <TableCell className="font-medium">{recommendation.recommendation.name}</TableCell>
                 <TableCell className="text-right font-medium">{formatPrice(recommendation.recommendation.price)}</TableCell>
               </TableRow>
             </TableBody>
           </Table>
         </div>
       );
    }

    if (typeof recommendation.recommendation === 'object' && recommendation.recommendation !== null && !('name' in recommendation.recommendation)) {
      const entries = Object.entries(recommendation.recommendation).filter(([, value]) => value?.name && value?.price);
      if (entries.length === 0) return null;

      const totalCost = entries.reduce((sum, [, value]) => sum + (value?.price || 0), 0);

      return (
        <div className="overflow-hidden rounded-md border bg-muted">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Component</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Estimated Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{key}</TableCell>
                  <TableCell>{value?.name}</TableCell>
                  <TableCell className="text-right">{value?.price ? formatPrice(value.price) : 'N/A'}</TableCell>
                </TableRow>
              ))}
               <TableRow className="bg-card font-bold">
                  <TableCell colSpan={2}>Total Estimated Cost</TableCell>
                  <TableCell className="text-right">{formatPrice(totalCost)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    }

    return null;
  };


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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>What is your budget?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1000" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Currency</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? currencies.find(
                                    (currency) => currency.code === field.value
                                  )?.name
                                : "Select currency"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                          <Command>
                            <CommandInput placeholder="Search currency..." />
                            <CommandList>
                              <CommandEmpty>No currency found.</CommandEmpty>
                              <CommandGroup>
                                {currencies.map((currency) => (
                                  <CommandItem
                                    value={currency.name}
                                    key={currency.code}
                                    onSelect={() => {
                                      form.setValue("currency", currency.code)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        currency.code === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {currency.name} ({currency.code})
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                name="buildTier"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Build Tier</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Basic" />
                          </FormControl>
                          <FormLabel className="font-normal">Basic</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Advanced" />
                          </FormControl>
                          <FormLabel className="font-normal">Advanced</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Super High-End" />
                          </FormControl>
                          <FormLabel className="font-normal">Super High-End</FormLabel>
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
              {renderRecommendation()}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{recommendation.reasoning}</p>
            </div>
             {recommendation.disclaimers && recommendation.disclaimers.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Disclaimers</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {recommendation.disclaimers.map((disclaimer, index) => (
                    <li key={index}>{disclaimer}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
