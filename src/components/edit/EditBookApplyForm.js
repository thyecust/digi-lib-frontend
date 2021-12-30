import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { GobackButton } from "../utils";
import supabase from "../../supabase/Client";

export default function EditBookApplyFrom({ bookApply }) {
    const [status, setStatus] = useState(bookApply.status);
    const canEditUrl = status === "已入库";

    const statusSelectValues = [
        { value: "待处理", label: "待处理" },
        { value: "已拒绝", label: "已拒绝" },
        { value: "处理中", label: "处理中" },
        { value: "已入库", label: "已入库" },
    ];

    const handleStatusSelectChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const applyRes = await supabase
                .from("book_applys")
                .update({
                    status: formData.get("status"),
                    lib_url: formData.get("libUrl")
                        ? formData.get("libUrl")
                        : null,
                })
                .match({ id: bookApply.id });

            if (applyRes.error) throw applyRes.error;

            if (!formData.get("libUrl")) return;

            const bookRes = await supabase
                .from("lib_books")
                .upsert({
                    name: bookApply.bookName,
                    isbn: bookApply.isbn,
                    url: formData.get("libUrl") ? formData.get("libUrl") : null,
                })
                .eq("isbn", bookApply.isbn);

            if (bookRes.error) throw bookRes.error;
        } catch (error) {
            alert(error.message);
        } finally {
            alert("处理完成");
        }
    };

    return (
        <Box
            sx={{ width: 800 }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="id"
                    name="id"
                    label="申请编号"
                    defaultValue={bookApply.id}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="bookName"
                    name="bookName"
                    label="书籍名称"
                    defaultValue={bookApply.bookName}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="isbn"
                    name="isbn"
                    label="ISBN"
                    defaultValue={bookApply.isbn}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="courseName"
                    name="courseName"
                    label="对应课程"
                    defaultValue={bookApply.courseName}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="applyerName"
                    name="applyerName"
                    label="申请人"
                    defaultValue={bookApply.applyerName}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="applyTime"
                    name="applyTime"
                    label="申请日期"
                    defaultValue={bookApply.applyTime}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "98%" }}
                    select
                    value={status}
                    id="status"
                    label="申请状态"
                    name="status"
                    onChange={handleStatusSelectChange}
                >
                    {statusSelectValues.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "98%" }}
                    disabled={!canEditUrl}
                    id="libUrl"
                    name="libUrl"
                    label="图书馆链接"
                    defaultValue="图书馆链接"
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <Button
                    sx={{ mx: 1 }}
                    variant="outlined"
                    color="secondary"
                    type="reset"
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
