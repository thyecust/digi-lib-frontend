import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid'

const user = {
    name: "张老师"
}

const bookApplyColumns = [
    {
        field: "applyId",
        headerName: "申请编号",
        width: 90
    },
    {
        field: "bookName",
        headerName: "书籍名称",
        width: 300
    },
    {
        field: "isbn",
        headerName: "ISBN",
        width: 200
    },
    {
        field: "courseName",
        headerName: "对应课程",
        width: 150
    },
    {
        field: "applyerName",
        headerName: "申请人",
        width: 150
    },
    {
        field: "status",
        headerName: "处理状态",
        width: 150
    },
    {
        field: "handleTime",
        headerName: "处理时间",
        width: 200
    },
    {
        field: "editable",
        headerName: "处理",
        width: 90,
        renderCell: EditBookApplyButton,
    },
]

const bookApplys = [
    {
        id: 1,
        applyId: "0001",
        bookName: "Introduction to Linear Algebra",
        isbn: "9780980232714",
        courseName: "线性代数",
        applyerName: "罗老师",
        status: "已入库",
        handleTime:"2021-12-30",
        editable: true
    }
]

function EditBookApplyButton() {
    return (
        <Button>处理申请</Button>
    )
}

function BookApplys() {
    return (
        <Box>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={bookApplys}
                    columns={bookApplyColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    )
}

export default function Lib() {
    return (
        <Box>
            <Box><h1>欢迎，{user.name} </h1></Box>
            <Box m={1}>
                <h2>待处理的书籍申请</h2>
            </Box>
            <BookApplys />
        </Box>
    )
}