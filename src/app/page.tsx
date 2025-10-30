import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, Bot, Keyboard as KeyboardIcon } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <KeyboardIcon className="h-8 w-8 text-primary" />,
    title: 'Shortcut Catalog',
    description: 'Explore a vast, searchable database of keyboard shortcuts for any app or OS.',
    link: '/shortcuts',
    image: PlaceHolderImages.find(p => p.id === 'shortcuts'),
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Learning Modules',
    description: 'Master shortcuts with interactive lessons and quizzes designed for all skill levels.',
    link: '/learn',
    image: PlaceHolderImages.find(p => p.id === 'learn'),
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'PC Recommender',
    description: 'Let our AI assistant help you build the perfect PC or laptop for your needs and budget.',
    link: '/recommend',
    image: PlaceHolderImages.find(p => p.id === 'recommend'),
  },
];

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Unlock Your Digital Fluency
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  KeyWise is your ultimate guide to mastering keyboard shortcuts and finding the perfect PC. Boost your productivity and work smarter, not harder.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/shortcuts">
                    Explore Shortcuts <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/recommend">Get PC Advice</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 w-full overflow-hidden rounded-xl lg:h-auto">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={heroImage.imageHint}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Everything You Need to Be a Power User
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From learning essential shortcuts to getting expert advice on your next computer, KeyWise has you covered.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col overflow-hidden h-full shadow-md hover:shadow-xl transition-shadow">
                {feature.image &&
                  <div className="relative h-48 w-full">
                    <Image src={feature.image.imageUrl} alt={feature.image.description} fill style={{ objectFit: 'cover' }} data-ai-hint={feature.image.imageHint} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"/>
                  </div>
                }
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 h-auto font-semibold">
                    <Link href={feature.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
