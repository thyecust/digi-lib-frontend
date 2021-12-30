import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ViewCourseRecources from "./ViewCourseResources";

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

const ShowCourse = () => {
    return (
        <Box
            sx={{ width: 700, display: "contents" }}
            component="form"
            autoComplete="off"
        >
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", width: "99%" }}
                    disabled
                    id="teacherName"
                    label="开课老师"
                    defaultValue={course.teacherName}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", width: "99%" }}
                    disabled
                    id="major"
                    label="开课专业"
                    defaultValue={course.major}
                />
            </div>
            <div style={{ paddingBottom: "10px" }}>
                <TextField
                    sx={{ pl: "1%", width: "99%" }}
                    multiline
                    disabled
                    id="description"
                    label="课程介绍"
                    defaultValue={course.description}
                />
            </div>
        </Box>
    );
};

const ShowCourseBooks = () => {
    const courseBookColumns = [
        {
            field: "bookName",
            headerName: "书籍名称",
            width: 250,
        },
        {
            field: "isbn",
            headerName: "ISBN",
            width: 150,
        },
        {
            field: "author",
            headerName: "作者",
            width: 150,
        },
        {
            field: "libUrl",
            headerName: "图书馆链接",
            width: 150,
        },
    ];

    return (
        <Box>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>课程教参</h2>
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

export default function ViewCourse({ setViewingCourseId }) {
    const [viewingCourseResources, setViewingCourseResources] = useState(false);

    if (viewingCourseResources) {
        return (
            <ViewCourseRecources
                setViewingCourseResources={setViewingCourseResources}
            />
        );
    }

    return (
        <Box sx={{ textAlign: "flex" }}>
            <Box>
                <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                        setViewingCourseId(null);
                    }}
                >
                    返回
                </Button>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1>课程名称（课程学期）-课程编号</h1>
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{ mx: 1 }}
                        color="info"
                        onClick={(e) => {
                            setViewingCourseResources(true);
                        }}
                    >
                        查看课程资料
                    </Button>
                </div>
            </Box>
            <ShowCourse />
            <ShowCourseBooks />
        </Box>
    );
}
