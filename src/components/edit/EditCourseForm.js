import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import supabase from "../../supabase/Client";

export default function EditCourseForm({ courseId }) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const { data, error } = await supabase
                .from("courses")
                .update({ description: formData.get("description") })
                .match({ id: courseId });

            if (error) throw error;
        } catch (error) {
            alert(error.message);
        } finally {
            alert("处理完成");
        }
    };

    const getCourse = async () => {
        try {
            setLoading(true);
            let courseData = {};
            let courseRes = await supabase
                .from("courses")
                .select(`teacher_id, major, description`)
                .eq("id", courseId)
                .single();

            if (courseRes.error) throw courseRes.error;
            if (!courseRes.data) throw Error("no such course info");
            courseData["teacher_id"] = courseRes.data.teacher_id;
            courseData["major"] = courseRes.data.major;
            courseData["description"] = courseRes.data.description
                ? courseRes.data.description
                : "";

            let teacherRes = await supabase
                .from("users")
                .select(`name`)
                .eq("id", 1)
                .single();

            if (teacherRes.error) throw teacherRes.error;
            if (!teacherRes.data) throw Error("no such teacher info");
            courseData["teacherName"] = teacherRes.data.name;

            setCourse(courseData);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCourse();
    }, [courseId]);

    if (loading) return <p>Loading</p>;

    return (
        <Box
            sx={{ width: 700, display: "contents" }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <h2>修改课程信息</h2>
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
                    id="description"
                    name="description"
                    label="课程介绍"
                    defaultValue={course.description}
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <Button sx={{ mx: 1 }} variant="outlined" color="secondary">
                    撤销
                </Button>
                <Button type="submit" variant="outlined">
                    提交
                </Button>
            </div>
        </Box>
    );
}
