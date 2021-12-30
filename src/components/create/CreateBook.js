import CreateBookFrom from "./CreateBookForm";
import { Box } from "@mui/system";
import { GobackButtion } from "../utils";

export default function CreateBook({ course, user, setCreatingBook }) {
    return (
        <Box sx={{ textAlign: "-webkit-center" }}>
            <Box>
                <GobackButtion setter={setCreatingBook} value={false} />
                <h1>
                    添加参考书-{course.name}({course.term})
                </h1>
            </Box>
            <CreateBookFrom user={user} course={course} />
        </Box>
    );
}
