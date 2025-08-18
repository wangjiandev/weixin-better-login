'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-start px-4 pt-6 md:pt-16">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            Your email has been verified. Please login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col items-center justify-center gap-4 bg-muted p-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
              <p className="text-center text-sm">
                Your email has been verified. Please login to your account.
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => router.replace('/admin')}
              type="button"
            >
              Continue
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-muted-foreground text-sm">
            <p>
              &copy; {new Date().getFullYear()} Your Company. All rights
              reserved.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
