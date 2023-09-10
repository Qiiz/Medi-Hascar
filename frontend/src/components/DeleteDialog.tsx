import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';

export interface DeleteDialogProps {
    open: boolean; 
    rowId: string;
    onClose: () => void;
    onDelete: (id: string) => void;
}

export default function DeleteDialog(props: DeleteDialogProps) {
  
  return (
    <Dialog open={props.open} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this item with following id: {props.rowId}?
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={() => props.onDelete(props.rowId)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
