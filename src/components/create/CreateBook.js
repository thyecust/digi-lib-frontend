import CreateBookFrom from "./CreateBookForm";
import { Box } from "@mui/system";
import { GobackButton } from "../utils";

export default function CreateBook({ course, user, setCreatingBook }) {
    return (
        <Box sx={{ textAlign: "-webkit-center" }}>
            <Box>
                <GobackButton setter={setCreatingBook} value={false} />
                <h1>
                    添加参考书-{course.name}({course.term})
                </h1>
            </Box>
            <CreateBookFrom user={user} course={course} />
        </Box>
    );
}
