import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import TeacherCourses from "./TeacherCources";
import { EditCourse, EditCourseBooks } from "../edit";
import EditCourseResources from "../edit/EditCourseResources";
import { upload } from "@testing-library/user-event/dist/upload";

const bookApplyColumns = [
    {
        field: "applyId",
        headerName: "申请编号",
        width: 90,
    },
    {
        field: "bookName",
        headerName: "书籍名称",
        width: 300,
    },
    {
        field: "isbn",
        headerName: "ISBN",
        width: 200,
    },
    {
        field: "courseName",
        headerName: "对应课程",
        width: 150,
    },
    {
        field: "status",
        headerName: "处理状态",
        width: 150,
    },
    {
        field: "handleTime",
        headerName: "处理时间",
        width: 200,
    },
];

const bookApplys = [
    {
        id: 1,
        applyId: "0001",
        bookName: "Introduction to Linear Algebra",
        isbn: "9780980232714",
        courseName: "线性代数",
        status: "已入库",
        handleTime: "2021-12-30",
    },
];

function BookApplys() {
    return (
        <Box>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                    rows={bookApplys}
                    columns={bookApplyColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}

export default function Teacher({ user }) {
    const [editingCourseId, setEditingCourseId] = useState(null);

    if (editingCourseId) {
        return (
            <EditCourse
                editingCourseId={editingCourseId}
                setEditingCourseId={setEditingCourseId}
            />
        );
    }

    return (
        <Box>
            <Box>
                <h1>欢迎，{user.name} </h1>
            </Box>
            <Box m={1}>
                <h2>您的排课</h2>
            </Box>
            <TeacherCourses
                user={user}
                editingCourseId={editingCourseId}
                setEditingCourseId={setEditingCourseId}
            />
            <Box m={1}>
                <h2>您的书籍申请</h2>
            </Box>
            <BookApplys user={user} />
        </Box>
    );
}
