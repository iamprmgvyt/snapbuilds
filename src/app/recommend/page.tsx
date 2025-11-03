import { RecommendationForm } from './recommendation-form';

export default function RecommendPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Find Your Perfect PC
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Answer a few questions and our AI, SB-AI, will recommend the best computer configuration for your needs and budget. SB-AI is an intelligent assistant designed to help you find the perfect PC or laptop based on your specific requirements.
        </p>
      </div>
      <RecommendationForm />
    </div>
  );
}
