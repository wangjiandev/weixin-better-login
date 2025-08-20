import { RiAddCircleFill } from '@remixicon/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateOrganizationForm } from './create-organization-form';
import { Button } from './ui/button';

export function OrganizationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <RiAddCircleFill aria-hidden="true" size={16} />
          Add Organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Create a new organization to get started.
          </DialogDescription>
        </DialogHeader>
        <CreateOrganizationForm />
      </DialogContent>
    </Dialog>
  );
}
