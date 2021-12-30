import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import supabase from "../../supabase/Client";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function TeacherCourses({
    user,
    editingCourseId,
    setEditingCourseId,
}) {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    const courseColumns = [
        {
            field: "code",
            headerName: "课程编号",
            width: 150,
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
            width: 150,
        },
        {
            field: "actions",
            type: "actions",
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="编辑课程"
                    onClick={(e) => {
                        setEditingCourseId(params.id);
                    }}
                />,
            ],
        },
    ];

    useEffect(() => {
        getCourses();
    }, [user]);

    const getCourses = async () => {
        try {
            setLoading(true);
            let { data, error, status } = await supabase
                .from("courses")
                .select(`id, name, teacher_id, major, term`)
                .eq("teacher_id", user.id);

            if (error) {
                throw error;
            }

            const coursesData = data.map((d) => ({
                id: d.id,
                code: d.id,
                name: d.name,
                major: d.major,
                term: d.term,
                editable: true,
            }));

            setCourses(coursesData);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading</p>;

    return (
        <Box>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                    rows={courses}
                    columns={courseColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}
