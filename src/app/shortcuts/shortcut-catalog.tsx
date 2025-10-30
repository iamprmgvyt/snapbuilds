'use client';
import { useState, useMemo } from 'react';
import { shortcuts, osOptions, appOptions } from './data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

export function ShortcutCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOs, setSelectedOs] = useState('All');
  const [selectedApp, setSelectedApp] = useState('All');

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter((shortcut) => {
      const osMatch = selectedOs === 'All' || shortcut.os === selectedOs;
      const appMatch = selectedApp === 'All' || shortcut.app === selectedApp;
      const searchMatch =
        shortcut.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shortcut.keys.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
      return osMatch && appMatch && searchMatch;
    });
  }, [searchTerm, selectedOs, selectedApp]);

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 md:flex-row mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shortcuts..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedOs} onValueChange={setSelectedOs}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Operating System" />
          </SelectTrigger>
          <SelectContent>
            {osOptions.map((os) => (
              <SelectItem key={os} value={os}>
                {os}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedApp} onValueChange={setSelectedApp}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Application" />
          </SelectTrigger>
          <SelectContent>
            {appOptions.map((app) => (
              <SelectItem key={app} value={app}>
                {app}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredShortcuts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredShortcuts.map((shortcut) => (
            <Card key={shortcut.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg leading-tight">{shortcut.description}</CardTitle>
                  <Badge variant="outline">{shortcut.app}</Badge>
                </div>
                <CardDescription>{shortcut.os}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {shortcut.keys.map((key, index) => (
                    <kbd key={index} className="px-2 py-1.5 text-xs font-semibold text-foreground bg-muted rounded-md">
                      {key}
                    </kbd>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-lg font-medium text-muted-foreground">No shortcuts found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}
