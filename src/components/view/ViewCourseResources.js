import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { GobackButton } from "../utils";
import { FileColumns } from "../datagridColumns";
import supabase from "../../supabase/Client";
import { useState, useEffect } from "react";

const CourseResources = ({ courseId }) => {
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(true);

    const downloadFiles = async (filename) => {
        try {
            const downloadFilename = courseId + "_" + filename;
            const { data, error } = await supabase.storage
                .from("bili")
                .download(downloadFilename);

            if (error) throw error;

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(data);
            link.download = downloadFilename;
            link.click();
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            alert(error.message);
        }
    };

    const getFiles = async () => {
        try {
            setLoading(true);

            let fileData = [];
            const { data, error, status } = await supabase
                .from("course_resources")
                .select(`id, created_at, filename`)
                .eq("course_id", courseId);

            if (error) throw error;

            setFiles(
                data.map((d) => ({
                    id: d.id,
                    fileName: d.filename,
                    uploadTime: d.created_at,
                }))
            );
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = FileColumns(downloadFiles);

    useEffect(() => {
        getFiles();
    }, [courseId]);

    if (loading) return <p>Loading</p>;

    return (
        <Box>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>课程资料</h2>
            </div>
            <div style={{ height: 300, alignItems: "center" }}>
                <DataGrid
                    rows={files}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
};

export default function ViewCourseRecources({ course, setter, value }) {
    return (
        <Box sx={{ textAlign: "flex" }}>
            <Box>
                <GobackButton setter={setter} value={value} />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1>
                        {course.name}（{course.term}）
                    </h1>
                </div>
            </Box>
            <CourseResources courseId={course.id} />
        </Box>
    );
}
