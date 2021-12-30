import { Box } from "@mui/system";
import { EditBookApply } from "../edit";
import { useState } from "react";
import ViewLibBookApplys from "../view/ViewLibBookApplys";

export default function Lib({ user }) {
    const [editingBookApplyId, setEditingBookApplyId] = useState(null);

    if (editingBookApplyId) {
        return <EditBookApply setEditingBookApplyId={setEditingBookApplyId} />;
    }

    return (
        <Box>
            <Box>
                <h1>欢迎，{user.name} </h1>
            </Box>
            <Box m={1}>
                <h2>待处理的书籍申请</h2>
            </Box>
            <ViewLibBookApplys
                userId={user.id}
                setter={setEditingBookApplyId}
            />
        </Box>
    );
}
