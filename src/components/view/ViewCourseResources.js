import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";

const course = {
    id: 2,
    code: "00002",
    name: "线性代数",
    major: "公共基础",
    term: "2021-2022-2",
    teacherName: "罗老师",
    description: "",
    viewable: true,
};

const courseBooks = [
    {
        id: 1,
        bookName: "Introduction to Linear Algebra",
        isbn: "9780980232714",
        courseName: "线性代数",
        author: "Gilbert",
        libUrl: "www.baidu.com",
    },
];

const CourseResources = () => {
    const courseBookColumns = [
        {
            field: "fileName",
            headerName: "文件名",
            width: 250,
        },
        {
            field: "uploadTime",
            headerName: "上传时间",
            width: 150,
        },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DownloadIcon />}
                    label="下载文件"
                    onClick={(e) => {}}
                />,
            ],
        },
    ];

    return (
        <Box>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>课程资料</h2>
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
    );
};

export default function ViewCourse({}) {
    return (
        <Box sx={{ textAlign: "flex" }}>
            <Box>
                <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={(e) => {}}
                >
                    返回
                </Button>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1>课程名称（课程学期）-课程编号</h1>
                </div>
            </Box>
            <CourseResources />
        </Box>
    );
}
