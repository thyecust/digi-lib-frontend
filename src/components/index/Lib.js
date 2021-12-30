import { Box } from "@mui/system";
import { EditBookApply } from "../edit";
import { useState } from "react";
import ViewLibBookApplys from "../view/ViewLibBookApplys";

export default function Lib({ user }) {
    const [editingApplyId, setEditingApplyId] = useState(null);

    if (editingApplyId) {
        return <EditBookApply applyId={editingApplyId} setter={setEditingApplyId} />;
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
                setter={setEditingApplyId}
            />
        </Box>
    );
}
