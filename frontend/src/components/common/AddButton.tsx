import { 
    Button
} from '@mui/material';


export interface AddButtonProps {
    onClick: () => void
}


export default function AddButton(props: AddButtonProps) {
    return (
        <Button variant='contained' size='small' onClick={props.onClick} sx={{ mt : 1, mb: 1}}>
            Add
        </Button>
    );
}