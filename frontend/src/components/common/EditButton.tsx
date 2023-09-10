import { 
    IconButton
} from '@mui/material';
import {
    Edit
} from '@mui/icons-material';


export interface EditButtonProps {
    onClick: () => void
}


export default function EditButton(props: EditButtonProps) {
    return (
        <IconButton size='small' onClick={props.onClick}>
            <Edit />
        </IconButton>
    );
}
  