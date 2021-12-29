import { Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { Box } from "@mui/system";

const user = {
    name: "罗老师"
}

const course = {
    name: "线性代数",
    term: "2021-2022-1"
}

function CreateBookFrom() {
    return (
        <Box
            sx={{ width: 700 }}
            component="form"
            autoComplete="off"
        >
            <div style={{ paddingBottom: "10px", }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="applyerName"
                    label="申请人"
                    defaultValue={user.name}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="courseName"
                    label="对应课程"
                    defaultValue={course.name}
                />
            </div>
            <div style={{ paddingBottom: "10px", }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    required
                    id="isbn"
                    label="ISBN"
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    required
                    id="bookName"
                    label="书籍名称"
                />
            </div>
            <div>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "98%" }}
                    disabled
                    id="courseName"
                    label="图书馆链接"
                    defaultValue="图书馆链接"
                />
            </div>
            <div style={{ paddingBottom: "10px", }}>
                <FormGroup>
                    <FormControlLabel
                        sx={{ pl: "1%" }}
                        control={<Checkbox defaultChecked />}
                        label="若图书馆没有图书, 提交申请"
                    />
                </FormGroup>
            </div>
            <div style={{ "textAlign": "center", }}>
                <Button sx={{ mx: 1 }} variant="outlined" color="secondary" >撤销</Button>
                <Button variant="outlined">提交</Button>
            </div>
        </Box>
    )
}

export default function CreateBook() {
    return (
        <Box sx = {{ textAlign: "-webkit-center" }}>
            <Box>
                <Button sx={{ float: "right" }} size="small" variant="outlined">
                    返回
                </Button>
                <h1>添加参考书-{course.name}({course.term})</h1>
            </Box>
            <CreateBookFrom />
        </Box>
    )
}