import { Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function EditCourseResourcesFrom() {
    return (
        <Box sx={{ width: 1000 }} component="form" autoComplete="off">
            <div style={{ paddingBottom: "10px" }}>
                <label htmlFor="contained-button-file">
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                </label>
            </div>
            <div style={{ textAlign: "center" }}>
                <Button sx={{ mx: 1 }} variant="outlined" color="secondary">
                    撤销
                </Button>
                <Button variant="outlined">提交</Button>
            </div>
        </Box>
    );
}

export default function EditCourseResources({
    uploadingCourseId,
    setUploadingCourseId,
}) {
    return (
        <Box sx={{ textAlign: "-webkit-center" }}>
            <Box>
                <Button
                    sx={{ float: "right" }}
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                        setUploadingCourseId(null);
                    }}
                >
                    返回
                </Button>
                <h1>课程名称（课程学期）-课程编号</h1>
            </Box>
            <EditCourseResourcesFrom />
        </Box>
    );
}
