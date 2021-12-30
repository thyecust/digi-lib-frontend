import { Box } from "@mui/system";
import { TextField } from "@mui/material";

export default function ViewCourseBasics({ course }) {
    return (
        <Box
            sx={{ width: 700, display: "contents" }}
            component="form"
            autoComplete="off"
        >
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
                    disabled
                    id="description"
                    label="课程介绍"
                    defaultValue={course.description}
                />
            </div>
        </Box>
    );
}
