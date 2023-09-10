import { TextField } from '@mui/material';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface DataFieldProps {
    name: string,
    value: string,
    onChange?: (value: string) => void;
}

const DataField = forwardRef<HTMLInputElement, DataFieldProps>((props, ref) => {
    function handleValueChanged(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        props.onChange?.(e.target.value);
    }

    return (
        <TextField
            inputRef={ref}
            id={props.name}
            label={props.name}
            defaultValue = {props.value}
            onChange={handleValueChanged}
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
        />
    );
});

export default DataField;
