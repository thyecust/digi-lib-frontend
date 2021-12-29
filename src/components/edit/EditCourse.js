import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid'

const course = {
    id: 2,
    code: "00002",
    name: "线性代数",
    major: "公共基础",
    term: "2021-2022-2",
    teacherName: "罗老师",
    description: "",
    viewable: true
}

const courseBooks = [
    {
        id: 1,
        bookName: "Introduction to Linear Algebra",
        isbn: "9780980232714",
        courseName: "线性代数",
        author: "Gilbert",
        libUrl: "www.baidu.com"
    }
]

const courseBookColumns = [
    {
        field: "bookName",
        headerName: "书籍名称",
        width: 250
    },
    {
        field: "isbn",
        headerName: "ISBN",
        width: 150
    },
    {
        field: "author",
        headerName: "作者",
        width: 150
    },
    {
        field: "libUrl",
        headerName: "图书馆链接",
        width: 150
    }
]

const EditCourseForm = () => {
    return (
        <Box
            sx={{ width: 700, display: "contents" }}
            component="form"
            autoComplete="off"
        >
            <h2>修改课程信息</h2>
            <div style={{ paddingBottom: "10px", }}>
                <TextField
                    sx={{ pl: "1%", width: "99%" }}
                    disabled
                    id="teacherName"
                    label="开课老师"
                    defaultValue={course.teacherName}
                />
            </div>
            <div style={{ paddingBottom: "10px", }}>
                <TextField
                    sx={{ pl: "1%", width: "99%" }}
                    disabled
                    id="major"
                    label="开课专业"
                    defaultValue={course.major}
                />
            </div>
            <div style={{ paddingBottom: "10px", }}>
                <TextField
                    sx={{ pl: "1%", width: "99%" }}
                    multiline
                    id="description"
                    label="课程介绍"
                    defaultValue={course.description}
                />
            </div>
            <div style={{ "textAlign": "center", }}>
                <Button sx={{ mx: 1 }} variant="outlined" color="secondary" >撤销</Button>
                <Button variant="outlined">提交</Button>
            </div>
        </Box>
    )
}

const ShowCourseBooks = () => {
    return (
        <Box>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>课程教参</h2>
                <Button size="small" variant="outlined" sx={{ mx: 1 }} color="info" >
                    编辑课程参考
                </Button>
            </div>
            <div style={{ height: 300, alignItems: "center" }}>
                <DataGrid
                    rows={courseBooks}
                    columns={courseBookColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    )
}

export default function EditCourse() {
    return (
        <Box sx={{ textAlign: "flex" }}>
            <Box>
                <Button sx={{ float: "right" }} size="small" variant="outlined">
                    返回
                </Button>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1>{course.name}({course.term})-{course.id}</h1>
                    <Button size="small" variant="outlined" sx={{ mx: 1 }} color="info">
                        添加课程资料
                    </Button>
                </div>
            </Box>
            <EditCourseForm />
            <ShowCourseBooks />
        </Box>
    )
}