import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32 border-4 border-primary/50">
                    <AvatarImage src="https://picsum.photos/seed/user-avatar/200" alt="User Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h1 className="text-2xl font-bold font-headline">Alex Doe</h1>
                    <p className="text-muted-foreground">alex.doe@example.com</p>
                </div>
                <Button variant="outline">Edit Profile</Button>
            </div>
            <div className="flex-1 w-full space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>My Progress</CardTitle>
                        <CardDescription>Your learning journey and achievements.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Completed Modules</h3>
                        <div className="flex flex-wrap gap-2">
                        <Badge>Windows Navigation Mastery</Badge>
                        <Badge>VS Code for Developers</Badge>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Favorite Shortcuts</CardTitle>
                        <CardDescription>Your hand-picked list of most-used shortcuts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                                <span className="text-sm">Copy</span>
                                <div className="flex items-center gap-1">
                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-foreground bg-muted rounded-md">Ctrl</kbd>
                                    <span>+</span>
                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-foreground bg-muted rounded-md">C</kbd>
                                </div>
                            </li>
                            <Separator />
                            <li className="flex justify-between items-center">
                                <span className="text-sm">Paste</span>
                                 <div className="flex items-center gap-1">
                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-foreground bg-muted rounded-md">Ctrl</kbd>
                                    <span>+</span>
                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-foreground bg-muted rounded-md">V</kbd>
                                </div>
                            </li>
                            <Separator />
                            <li className="flex justify-between items-center">
                                <span className="text-sm">Toggle Comment (VS Code)</span>
                                 <div className="flex items-center gap-1">
                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-foreground bg-muted rounded-md">Ctrl</kbd>
                                    <span>+</span>
                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-foreground bg-muted rounded-md">/</kbd>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  )
}
