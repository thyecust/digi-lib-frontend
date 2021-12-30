import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";

import ViewCourseRecources from "./ViewCourseResources";
import { ClickButton, GobackButton } from "../utils";
import ViewCourseBooks from "./ViewCourseBooks";
import ViewCourseBasics from "./ViewCourseBasics";

import supabase from "../../supabase/Client";

export default function ViewCourse({ courseId, setViewingCourseId }) {
    const [viewingCourseResources, setViewingCourseResources] = useState(false);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCourse = async () => {
        try {
            setLoading(true);
            let courseData = {};
            let courseRes = await supabase
                .from("courses")
                .select(`id, name, term, teacher_id, major, description`)
                .eq("id", courseId)
                .single();

            if (courseRes.error) throw courseRes.error;
            if (!courseRes.data) throw Error("no such course info");
            courseData["id"] = courseRes.data.id;
            courseData["name"] = courseRes.data.name;
            courseData["term"] = courseRes.data.term;
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

    if (viewingCourseResources) {
        return (
            <ViewCourseRecources
                course={course}
                setter={setViewingCourseResources}
                value={false}
            />
        );
    }

    return (
        <Box sx={{ textAlign: "flex" }}>
            <Box>
                <GobackButton setter={setViewingCourseId} value={null} />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1>
                        {course.name}（{course.term}）
                    </h1>
                    <ClickButton
                        text={"查看课程资料"}
                        setter={setViewingCourseResources}
                        value={true}
                    />
                </div>
            </Box>
            <ViewCourseBasics course={course} />
            <ViewCourseBooks courseId={courseId} />
        </Box>
    );
}
