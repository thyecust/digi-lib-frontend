import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import supabase from "../../supabase/Client";

export default function CreateBookFrom({ user, course }) {
    const [libUrl, setLibUrl] = useState("图书馆链接");
    const [canApply, setCanApply] = useState(true);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            const bookRes = await supabase.from("course_books").insert([
                {
                    isbn: formData.get("isbn"),
                    name: formData.get("bookName"),
                    course_id: course.id,
                    lib_url: !formData.get("apply")
                        ? formData.get("libUrl")
                        : "",
                    author: formData.get("author"),
                },
            ]);

            if (bookRes.error) throw bookRes.error;

            if (formData.get("apply") !== "on") return;

            const applyRes = await supabase.from("book_applys").insert([
                {
                    created_user_id: user.id,
                    isbn: formData.get("isbn"),
                    name: formData.get("bookName"),
                    author: formData.get("author"),
                    applyer_name: user.name,
                    course_name: course.name,
                },
            ]);

            if (applyRes.error) throw applyRes.error;
            alert("添加成功");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleIsbnChange = async (event) => {
        try {
            setLibUrl("查询中");
            const isbn = event.target.value;
            const { data, error, status } = await supabase
                .from("lib_books")
                .select(`url`)
                .eq("isbn", isbn);

            if (error) throw error;
            if (data.length) {
                setLibUrl(data[0].url);
                setCanApply(false);
            } else {
                setLibUrl("图书馆中不存在");
                setCanApply(true);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleReset = async (event) => {
        setLibUrl("图书馆链接");
        setCanApply(true);
    };

    return (
        <Box
            sx={{ width: 700 }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <div style={{ paddingBottom: "10px" }}>
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
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    required
                    id="isbn"
                    name="isbn"
                    label="ISBN"
                    onChange={handleIsbnChange}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    required
                    name="author"
                    id="author"
                    label="作者"
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "98%" }}
                    required
                    id="bookName"
                    name="bookName"
                    label="书籍名称"
                />
            </div>
            <div>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "98%" }}
                    id="libUrl"
                    name="libUrl"
                    disabled
                    label="图书馆链接"
                    value={libUrl}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <FormGroup>
                    <FormControlLabel
                        sx={{ pl: "1%" }}
                        control={<Checkbox name="apply" disabled={!canApply} />}
                        label="若图书馆没有图书, 提交申请"
                    />
                </FormGroup>
            </div>
            <div style={{ textAlign: "center" }}>
                <Button
                    type="reset"
                    sx={{ mx: 1 }}
                    variant="outlined"
                    color="secondary"
                >
                    撤销
                </Button>
                <Button type="submit" variant="outlined">
                    提交
                </Button>
            </div>
        </Box>
    );
}
