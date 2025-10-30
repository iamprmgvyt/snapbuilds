import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const topics = [
  { id: 1, title: 'Best shortcuts for photo editing in Photoshop?', author: 'PixelPusher', replies: 12, lastPost: '2 hours ago', tag: 'Software' },
  { id: 2, title: 'Question about custom key bindings on Linux', author: 'TuxFan', replies: 5, lastPost: '5 hours ago', tag: 'Linux' },
  { id: 3, title: 'My favorite productivity shortcuts for VS Code', author: 'CodeWizard', replies: 23, lastPost: '1 day ago', tag: 'Development' },
  { id: 4, title: 'Is it worth getting a mechanical keyboard for typing?', author: 'ClickClack', replies: 45, lastPost: '2 days ago', tag: 'Hardware' },
  { id: 5, title: 'How to speed up my old laptop?', author: 'SlowPoke', replies: 8, lastPost: '3 days ago', tag: 'Hardware'},
];

export default function ForumPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Community Forum
          </h1>
          <p className="text-muted-foreground">
            Ask questions, share your knowledge, and connect with the community.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Topic</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden sm:table-cell">Replies</TableHead>
                <TableHead className="text-right">Last Post</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Link href="#" className="font-medium text-primary hover:underline">
                        {topic.title}
                      </Link>
                      <div className="md:hidden text-sm text-muted-foreground">by {topic.author}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{topic.author}</TableCell>
                  <TableCell className="hidden sm:table-cell">{topic.replies}</TableCell>
                  <TableCell className="text-right">{topic.lastPost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
