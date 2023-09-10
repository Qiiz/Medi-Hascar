import { 
    Typography
} from '@mui/material';

export default function Header(props: {title: string}) {
return (
    <Typography sx={{ fontSize: 36, fontWeight: 550, color:'#3E6BF7'}} >
    {props.title}
    </Typography>
);
}
  