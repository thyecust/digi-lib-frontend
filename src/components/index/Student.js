import { TextField, Button, getFormControlUtilityClasses } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ViewCourse } from "../view";
import { StudentCourseColumns } from "../datagridColumns";
import supabase from "../../supabase/Client";

const user = {
    name: "汤同学",
};

const courses = [
    {
        id: 1,
        code: "00001",
        name: "Python 程序设计",
        major: "计算机科学与技术",
        term: "2021-2022-1",
        viewable: true,
    },
    {
        id: 3,
        code: "00003",
        name: "毛泽东思想与中国特色社会主义思想导论",
        major: "公共必修",
        term: "2021-2022-2",
        viewable: true,
    },
];

function StudentCourses({ studentId, setViewingCourseId }) {
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    const columns = StudentCourseColumns(setViewingCourseId);

    const getCourses = async () => {
        try {
            setLoading(true);
            let courseIdRes = await supabase
                .from("course_students")
                .select(`course_id`)
                .eq("student_id", studentId);

            if (courseIdRes.error) throw courseIdRes.error;
            if (!courseIdRes.data) {
                setCourses([]);
                return;
            }
            const courseIds = courseIdRes.data.map((d) => d.course_id);
            console.log(courseIds);
            const courseRes = await supabase
                .from("courses")
                .select(`id, name, term, major`)
                .in("id", courseIds);

            if (courseRes.error) throw courseRes.error;
            if (!courseRes.data) throw Error("no such courses");
            const courseData = courseRes.data.map((d) => ({
                id: d.id,
                name: d.name,
                major: d.major,
                term: d.term,
            }));
            setCourses(courseData);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCourses();
    }, [studentId]);

    if (loading) return <p>Loading</p>;

    return (
        <Box>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                    rows={courses}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}

function AllCourses() {
    const allCourseColumns = [
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
    ];

    return (
        <Box>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                    rows={courses}
                    columns={allCourseColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}

export default function Student({ user }) {
    const [viewingCourseId, setViewingCourseId] = useState(null);

    if (viewingCourseId) {
        return (
            <ViewCourse
                courseId={viewingCourseId}
                setViewingCourseId={setViewingCourseId}
            />
        );
    }

    return (
        <Box>
            <Box>
                <h1>欢迎，{user.name} </h1>
            </Box>
            <Box m={1}>
                <h2>您的选课</h2>
            </Box>
            <StudentCourses
                studentId={user.id}
                setViewingCourseId={setViewingCourseId}
            />
            <Box m={1}>
                <h2>其他课程</h2>
            </Box>
            <AllCourses />
        </Box>
    );
}
