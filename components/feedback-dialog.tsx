import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function FeedbackDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Feedback</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send us feedback</DialogTitle>
          <DialogDescription>
            Watch{' '}
            <a
              className="text-foreground hover:underline"
              href="https://example.com/tutorials"
              rel="noreferrer"
            >
              tutorials
            </a>
            , read Origin UI&lsquo;s{' '}
            <a
              className="text-foreground hover:underline"
              href="https://example.com/docs"
              rel="noreferrer"
            >
              documentation
            </a>
            , or join our{' '}
            <a
              className="text-foreground hover:underline"
              href="https://discord.gg/example"
              rel="noreferrer"
            >
              Discord
            </a>{' '}
            for community help.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-5">
          <Textarea
            aria-label="Send feedback"
            id="feedback"
            placeholder="How can we improve Origin UI?"
          />
          <div className="flex flex-col sm:flex-row sm:justify-end">
            <Button type="button">Send feedback</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
