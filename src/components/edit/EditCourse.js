import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import EditCourseResources from "./EditCourseResources";
import { CreateBook } from "../create";
import { ClickButton, GobackButtion } from "../utils";
import supabase from "../../supabase/Client";
import ViewCourseBooks from "../view/ViewCourseBooks";
import EditCourseForm from "./EditCourseForm";

export default function EditCourse({ user, courseId, setCourseId }) {
    const [uploadingCourseResources, setUploadingCourseResources] =
        useState(false);
    const [creatingBook, setCreatingBook] = useState(false);
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

    const deleteBook = async (bookId) => {
        try {
            const { data, error, status } = await supabase
                .from("course_books")
                .delete()
                .match({ id: bookId });
            if (error) throw error;
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getCourse();
    }, [courseId]);

    if (loading) return <p>Loading</p>;

    if (uploadingCourseResources) {
        return (
            <EditCourseResources
                setter={setUploadingCourseResources}
                value={null}
            />
        );
    }

    if (creatingBook) {
        return (
            <CreateBook
                course={course}
                user={user}
                setCreatingBook={setCreatingBook}
            />
        );
    }

    return (
        <Box sx={{ textAlign: "flex" }}>
            <Box>
                <GobackButtion setter={setCourseId} value={null} />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1>
                        {course.name}（{course.term}）
                    </h1>
                    <ClickButton
                        text={"添加课程资料"}
                        setter={setUploadingCourseResources}
                        value={courseId}
                    />
                </div>
            </Box>
            <EditCourseForm courseId={courseId} />
            <ViewCourseBooks
                courseId={courseId}
                creatable={true}
                createSetter={setCreatingBook}
                createValue={true}
                deletable={true}
                deleteIdHandler={deleteBook}
            />
        </Box>
    );
}
