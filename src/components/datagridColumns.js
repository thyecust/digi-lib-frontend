import MoreIcon from "@mui/icons-material/More";
import DeleteIcon from "@mui/icons-material/Delete";

import { GridActionsCellItem } from "@mui/x-data-grid";
import { ClickEvent } from "./utils";

const StudentCourseColumns = (setter) => [
    {
        field: "id",
        headerName: "课程编号",
        width: 150,
    },
    {
        field: "name",
        headerName: "课程名称",
        width: 300,
        sortable: false,
    },
    {
        field: "major",
        headerName: "开课专业",
        width: 150,
    },
    {
        field: "term",
        headerName: "开课学期",
        width: 150,
    },
    {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<MoreIcon />}
                label="查看课程"
                onClick={ClickEvent(setter, params.id)}
            />,
        ],
    },
];

const BookColumns = () => [
    {
        field: "name",
        headerName: "书籍名称",
        width: 250,
    },
    {
        field: "isbn",
        headerName: "ISBN",
        width: 150,
    },
    {
        field: "author",
        headerName: "作者",
        width: 150,
    },
    {
        field: "libUrl",
        headerName: "图书馆链接",
        width: 450,
    },
];

const DeletableBookColumns = (deleteIdHandler) => [
    ...BookColumns(),
    {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<DeleteIcon />}
                label="删除参考书"
                onClick={(e) => {
                    deleteIdHandler(params.id);
                }}
            />,
        ],
    },
];

export { StudentCourseColumns, BookColumns, DeletableBookColumns };
