import { SxProps, Typography } from '@mui/material';

export default function Header(props: {title: string, sx?: SxProps}) {
    return (
        <Typography sx={props.sx}>
            {props.title}
        </Typography>
    );
}
