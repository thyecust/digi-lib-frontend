import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { CreateBook } from "../create";
import { EditingBookColumns } from "../datagridColumns";

function CourseBooks() {
    const courseBookColumns = EditingBookColumns();

    const courseBooks = [
        {
            id: 1,
            bookName: "Introduction to Linear Algebra",
            isbn: "9780980232714",
            author: "Gilbert",
            libUrl: "www.baidu.com",
            handleTime: "2021-12-30",
        },
    ];

    return (
        <Box>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                    rows={courseBooks}
                    columns={courseBookColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}

export default function EditCourseBooks({ setEditingBook }) {
    const [creatingBook, setCreatingBook] = useState(false);

    if (creatingBook) {
        return <CreateBook setCreatingBook={setCreatingBook} />;
    }

    return (
        <Box>
            <Button
                sx={{ float: "right" }}
                size="small"
                variant="outlined"
                onClick={(e) => {
                    setEditingBook(false);
                }}
            >
                返回
            </Button>
            <Box>
                <h1>课程名称（课程学期）-课程编号</h1>
            </Box>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>课程教参</h2>
                <Button
                    size="small"
                    variant="outlined"
                    sx={{ mx: 1 }}
                    color="info"
                    onClick={(e) => {
                        setCreatingBook(true);
                    }}
                >
                    创建参考书
                </Button>
            </div>
            <CourseBooks />
        </Box>
    );
}
