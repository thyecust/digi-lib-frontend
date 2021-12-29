import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

export default function Login() {
    return (
        <Box>
            <Box><h1>登录</h1></Box>
            <Box m={1}>
                <TextField id="email" label="电子邮箱" />
            </Box>
            <Box m={1}>
                <TextField id="password" label="密码" />
            </Box>
            <Box m={1}>
                <Button variant="outlined"> 忘记密码 </Button>
                <Button variant="outlined"> 登录 </Button>
            </Box>
        </Box>
    )
}