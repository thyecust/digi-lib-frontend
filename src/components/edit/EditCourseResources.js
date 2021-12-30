import { ConstructionOutlined } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import supabase from "../../supabase/Client";
import { GobackButton } from "../utils";

function EditCourseResourcesFrom({ courseId }) {
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.target);
            const file = formData.get("file");

            const storageRes = await supabase.storage
                .from("bili")
                .upload(courseId + "_" + file.name, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (storageRes.error) throw storageRes.error;

            const resourceRes = await supabase.from("course_resources").upsert({
                course_id: courseId,
                filename: file.name,
            });

            if (resourceRes.error) throw resourceRes.error;
        } catch (error) {
            alert(error.message);
        } finally {
            alert("提交完成");
        }
    };

    return (
        <Box
            sx={{ width: 1000 }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div style={{ paddingBottom: "10px" }}>
                <label>
                    <Input id="file" name="file" multiple type="file" />
                </label>
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

export default function EditCourseResources({ course, setter, value }) {
    return (
        <Box sx={{ textAlign: "-webkit-center" }}>
            <Box>
                <GobackButton setter={setter} value={value} />
                <h1>
                    {course.name}（{course.term}）
                </h1>
            </Box>
            <EditCourseResourcesFrom courseId={course.id} />
        </Box>
    );
}
