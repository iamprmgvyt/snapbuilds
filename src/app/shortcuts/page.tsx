import { ShortcutCatalog } from './shortcut-catalog';

export default function ShortcutsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Keyboard Shortcut Catalog
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Search and filter through hundreds of shortcuts for your favorite applications and operating systems.
        </p>
      </div>
      <ShortcutCatalog />
    </div>
  );
}
