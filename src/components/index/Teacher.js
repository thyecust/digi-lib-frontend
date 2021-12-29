import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid'

const user = {
    name: "罗老师"
}

const courseColumns = [
    {
        field: "code",
        headerName: "课程编号",
        width: 150
    },
    {
        field: "name",
        headerName: "课程名称",
        width: 300,
        sortable: false,
    },
    {
        field: "major",
        headerName: "开课专业",
        width: 150,
    },
    {
        field: "term",
        headerName: "开课学期",
        width: 150
    },
    {
        field: "editable",
        headerName: "编辑",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: EditCourseButton
    }
]

const courses = [
    {
        id: 1,
        code: "00001",
        name: "Python 程序设计",
        major: "计算机科学与技术",
        term: "2021-2022-1",
        editable: true
    },
    {
        id: 2,
        code: "00002",
        name: "线性代数",
        major: "公共基础",
        term: "2021-2022-2",
        editable: true
    },
    {
        id: 3,
        code: "00003",
        name: "毛泽东思想与中国特色社会主义思想导论",
        major: "公共必修",
        term: "2021-2022-2",
        editable: true
    }
]

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
        field: "status",
        headerName: "处理状态",
        width: 150
    },
    {
        field: "handleTime",
        headerName: "处理时间",
        width: 200
    },
]

const bookApplys = [
    {
        id: 1,
        applyId: "0001",
        bookName: "Introduction to Linear Algebra",
        isbn: "9780980232714",
        courseName: "线性代数",
        status: "已入库",
        handleTime:"2021-12-30"
    }
]

function EditCourseButton() {
    return (
        <Button>编辑课程</Button>
    )
}

function TeacherCourses() {
    return (
        <Box>
            <div style={{ height:300, width: '100%' }}>
                <DataGrid
                    rows={courses}
                    columns={courseColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
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

export default function Teacher() {
    return (
        <Box>
            <Box><h1>欢迎，{user.name} </h1></Box>
            <Box m={1}>
                <h2>您的排课</h2>
            </Box>
            <TeacherCourses />
            <Box m={1}>
                <h2>您的书籍申请</h2>
            </Box>
            <BookApplys />
        </Box>
    )
}