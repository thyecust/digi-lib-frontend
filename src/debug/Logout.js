import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import supabase from "../supabase/Client";

export default function Logout() {
    const handleLogOutClick = async (event) => {
        event.preventDefault();
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box>
            <Button onClick={handleLogOutClick} variant="contained">
                退出登录
            </Button>
        </Box>
    );
}
