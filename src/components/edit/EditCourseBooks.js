import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

function CourseBooks() {
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
            width: 350,
        },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="编辑课程"
                    onClick={(e) => {}}
                />,
            ],
        },
    ];

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

export default function EditCourseBooks() {
    return (
        <Box>
            <Button sx={{ float: "right" }} size="small" variant="outlined">
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
                    onClick={(e) => {}}
                >
                    创建参考书
                </Button>
            </div>
            <CourseBooks />
        </Box>
    );
}
