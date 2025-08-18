import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGlobalStore } from '@/store/use-global-store';

export function AlertDialogProvider() {
  const { alertConfig, alertOpen, updateAlertOpen } = useGlobalStore();

  if (!alertConfig) return null;

  const handleConfirm = () => {
    if (alertConfig.onConfirm) {
      alertConfig.onConfirm();
    }
    updateAlertOpen(false);
  };

  const handleCancel = () => {
    if (alertConfig.onCancel) {
      alertConfig.onCancel();
    }
    updateAlertOpen(false);
  };

  return (
    <AlertDialog onOpenChange={updateAlertOpen} open={alertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertConfig.title || 'Alert'}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertConfig.description || 'Are you sure you want to proceed?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {alertConfig.cancelLabel || 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {alertConfig.confirmLabel || 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
