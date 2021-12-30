import {
    Button,
    TextField,
    FormGroup,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import supabase from "../../supabase/Client";
import { useState } from "react";

export default function Login() {
    const [passwordEnabled, setPasswordEnabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleCheckEmailLogin = (event) => {
        setPasswordEnabled(!event.target.checked);
    };

    const handleSubmit = async (event) => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <div style={{ paddingBottom: "10px" }}>
                <Box>
                    <h1>登录</h1>
                </Box>
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField id="email" name="email" label="电子邮箱" />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    disabled={!passwordEnabled}
                    id="password"
                    name="password"
                    label="密码"
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
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
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <Button variant="outlined"> 忘记密码 </Button>
                <Button disabled={loading} type="submit" variant="outlined">
                    {" "}
                    登录{" "}
                </Button>
            </div>
        </Box>
    );
}
