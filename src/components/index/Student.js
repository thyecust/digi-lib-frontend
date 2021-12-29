import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid'

const user = {
    name: "汤同学"
}

const studentCourseColumns = [
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
        field: "viewable",
        headerName: "查看",
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: ViewCourseButton
    }
]

const allCourseColumns = [
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
]

const courses = [
    {
        id: 1,
        code: "00001",
        name: "Python 程序设计",
        major: "计算机科学与技术",
        term: "2021-2022-1",
        viewable: true
    },
    {
        id: 2,
        code: "00002",
        name: "线性代数",
        major: "公共基础",
        term: "2021-2022-2",
        viewable: true
    },
    {
        id: 3,
        code: "00003",
        name: "毛泽东思想与中国特色社会主义思想导论",
        major: "公共必修",
        term: "2021-2022-2",
        viewable: true
    }
]



function ViewCourseButton() {
    return (
        <Button>查看课程</Button>
    )
}

function StudentCourses() {
    return (
        <Box>
            <div style={{ height:300, width: '100%' }}>
                <DataGrid
                    rows={courses}
                    columns={studentCourseColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    )
}

function AllCourses() {
    return (
        <Box>
            <div style={{ height:300, width: '100%' }}>
                <DataGrid
                    rows={courses}
                    columns={allCourseColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    )
}


export default function Student() {
    return (
        <Box>
            <Box><h1>欢迎，{user.name} </h1></Box>
            <Box m={1}>
                <h2>您的选课</h2>
            </Box>
            <StudentCourses />
            <Box m={1}>
                <h2>其他课程</h2>
            </Box>
            <AllCourses />
        </Box>
    )
}