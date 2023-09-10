import { Box } from "@mui/material";
import { ReactNode } from "react";
import { pageStyle } from "./styles";

export interface PageProps {
    children: ReactNode;
}

export default function Page(props : PageProps) {
    return <Box sx={pageStyle}>{props.children}</Box>;
}
