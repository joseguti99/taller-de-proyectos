import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

export default function Header({ title, icon: Icon }: { title: string, icon: JSX.Element }) {
    return (
        <Grid>
            <Box sx={{ p: 2 }}>
                <Stack>
                    <Typography gutterBottom mb={2} variant="h5" component="div" fontWeight={700}>
                        {Icon} {title}
                    </Typography>
                    <Divider />
                </Stack>
            </Box>
        </Grid>
    )
}