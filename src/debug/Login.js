import {
    Button,
    TextField,
    FormGroup,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import supabase from "../supabase/Client";
import { useState } from "react";

export default function Login() {
    const [passwordEnabled, setPasswordEnabled] = useState(true);

    const handleCheckEmailLogin = (event) => {
        setPasswordEnabled(!event.target.checked);
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const { error } = await supabase.auth.signIn(
                passwordEnabled
                    ? {
                          email: data.get("email"),
                          password: data.get("password"),
                      }
                    : { email: data.get("email") }
            );
            if (error) throw error;
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField id="email" name="email" label="Input Email" />
            <TextField
                disabled={!passwordEnabled}
                id="password"
                name="password"
                label="Input Password"
            />
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked={false}
                            name="useEmailLink"
                            onChange={handleCheckEmailLogin}
                        />
                    }
                    label="使用邮箱验证登录"
                />
            </FormGroup>
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </Box>
    );
}
