import supabase from "../../supabase/Client";

const getCoursesById = async ({ courseId, preSetter, setter, postSetter }) => {
    try {
        preSetter();
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

        setter(courseData);
    } catch (error) {
        alert(error.message);
    } finally {
        postSetter();
    }
};

export { getCoursesById };
