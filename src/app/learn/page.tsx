import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Laptop, Terminal, Chrome } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const modules = [
  {
    title: 'Windows Navigation Mastery',
    description: 'Learn to navigate Windows like a pro with these essential shortcuts.',
    icon: <Laptop className="h-8 w-8 mb-4 text-primary" />,
    level: 'Beginner',
    link: '#',
  },
  {
    title: 'macOS Power User',
    description: 'Unlock the full potential of your Mac with advanced Mission Control and Spotlight shortcuts.',
    icon: <Laptop className="h-8 w-8 mb-4 text-primary" />,
    level: 'Intermediate',
    link: '#',
  },
  {
    title: 'VS Code for Developers',
    description: 'Speed up your coding workflow with multi-cursor editing, command palette, and more.',
    icon: <Terminal className="h-8 w-8 mb-4 text-primary" />,
    level: 'Intermediate',
    link: '#',
  },
  {
    title: 'Chrome Browser Ninja',
    description: 'Browse faster and more efficiently by mastering Chrome\'s powerful keyboard shortcuts.',
    icon: <Chrome className="h-8 w-8 mb-4 text-primary" />,
    level: 'Beginner',
    link: '#',
  },
];

export default function LearnPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Interactive Learning Modules
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Go from novice to expert with our guided lessons, quizzes, and practice exercises.
        </p>
      </div>

      <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.title} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              {module.icon}
              <CardTitle>{module.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0 flex justify-between items-center">
                <Badge variant="secondary">{module.level}</Badge>
                <Button asChild >
                  <Link href={module.link}>Start Learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
