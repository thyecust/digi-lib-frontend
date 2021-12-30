import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import supabase from "../supabase/Client";

export default function PasswordReset() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
        try {
            const { user, error } = await supabase.auth.update({
                password: data.get("password"),
            });

            if (error) {
                throw error;
            }
            console.log(user);
        } catch (error) {
            alert(error);
        } finally {
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField id="email" name="email" label="Input Email" />
            <TextField id="password" name="password" label="Input Password" />
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </Box>
    );
}
