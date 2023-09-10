import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import DataField from './DataField';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface ItemDialogProps {
  open: boolean; 
  title: string;
  value: Record<string, string>;
  onClose: () => void;
  onConfirm: (updatedContents: Record<string, string>) => void;
}

export default function ItemDialog(props: ItemDialogProps) {
  const fieldsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const dataFields = useMemo(() => {
    const result = []
    for (const [label, value] of Object.entries(props.value)) {
      result.push(
        <DataField
          ref={id => fieldsRef.current[label] = id}
          key={label}
          name={label}
          value={value}
        />)
    }
    return result;
  }, [props.value]);

  const handleConfirm = useCallback(() => {
    if (fieldsRef.current == null) { return {} }
  
    const result: Record<string, string> = {}
    Object.entries(fieldsRef.current).forEach(([label, element]) => {
      result[label] = element ? element.value : '';
    })

    props.onConfirm(result);
  }, [fieldsRef, props.onConfirm])

  return (
    <Dialog open={props.open} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        {dataFields}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
