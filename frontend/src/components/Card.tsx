import {
    Card,
    CardContent,
    SxProps,
    Typography
} from '@mui/material';

export interface CardMUIStyle {
    card: SxProps,
    font1: SxProps,
    font2: SxProps,
}

export interface CardMUIProps {
    variant: CardMUIStyle,
    title: string,
    stat?: string,
}

export default function CardMUI(props: CardMUIProps) {
    return (
        <Card variant="outlined" sx={props.variant.card}>
            <CardContent>
                <Typography sx={props.variant.font1}>
                    {props.title}
                </Typography>
                <Typography sx={props.variant.font2}>
                    {props.stat ?? ''}
                </Typography>
            </CardContent>
        </Card>
    );
}
