import { 
    IconButton
} from '@mui/material';
import {
    Delete
} from '@mui/icons-material';
  

export interface DeleteButtonProps {
    onClick: () => void
}


export default function DeleteButton(props: DeleteButtonProps) {
    return (
    <IconButton size='small' onClick={props.onClick}>
        <Delete />
    </IconButton>
    );
}