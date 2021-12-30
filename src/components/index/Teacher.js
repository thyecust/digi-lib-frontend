import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import TeacherCourses from "./TeacherCources";
import { EditCourse } from "../edit";
import ViewBookApplys from "../view/ViewBookApplys";

export default function Teacher({ user }) {
    const [editingCourseId, setEditingCourseId] = useState(null);

    if (editingCourseId) {
        return (
            <EditCourse
                user={user}
                courseId={editingCourseId}
                setCourseId={setEditingCourseId}
            />
        );
    }

    return (
        <Box>
            <Box>
                <h1>欢迎，{user.name}老师 </h1>
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
            <ViewBookApplys userId={user.id} />
        </Box>
    );
}
