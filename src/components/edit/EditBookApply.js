import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    MenuItem,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const bookApply = {
    applyId: "0001",
    bookName: "Introduction to Linear Algebra",
    isbn: "9780980232714",
    courseName: "线性代数",
    applyerName: "罗老师",
    status: "已入库",
    applyTime: "2021-12-14",
    handleTime: "2021-12-30",
    libUrl: "",
};

function EditBookApplyFrom() {
    const [status, setStatus] = useState(bookApply.status);

    const statusSelectValues = [
        { value: "待处理", label: "待处理" },
        { value: "已拒绝", label: "已拒绝" },
        { value: "处理中", label: "处理中" },
        { value: "已入库", label: "已入库" },
    ];

    const handleStatusSelectChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <Box sx={{ width: 1000 }} component="form" autoComplete="off">
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="applyId"
                    label="申请编号"
                    defaultValue={bookApply.applyId}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="bookName"
                    label="书籍名称"
                    defaultValue={bookApply.bookName}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="isbn"
                    label="ISBN"
                    defaultValue={bookApply.isbn}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="courseName"
                    label="对应课程"
                    defaultValue={bookApply.courseName}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="applyerName"
                    label="申请人"
                    defaultValue={bookApply.applyerName}
                />
                <TextField
                    sx={{ pl: "1%", pr: "1%", width: "48%" }}
                    disabled
                    id="applyTime"
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
                    id="courseName"
                    label="图书馆链接"
                    defaultValue="图书馆链接"
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <Button sx={{ mx: 1 }} variant="outlined" color="secondary">
                    撤销
                </Button>
                <Button variant="outlined">提交</Button>
            </div>
        </Box>
    );
}

export default function EditBookApply({ setEditingBookApplyId }) {
    return (
        <Box sx={{ textAlign: "-webkit-center" }}>
            <Box>
                <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                        setEditingBookApplyId(null);
                    }}
                >
                    返回
                </Button>
                <h1>
                    书籍申请-{bookApply.bookName}-{bookApply.courseName}
                </h1>
            </Box>
            <EditBookApplyFrom />
        </Box>
    );
}
