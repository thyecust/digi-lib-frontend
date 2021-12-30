import MoreIcon from "@mui/icons-material/More";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { GridActionsCellItem } from "@mui/x-data-grid";
import { ClickEvent } from "./utils";

const LibColumns = (setter) => [
    {
        field: "id",
        headerName: "申请编号",
        width: 90,
    },
    {
        field: "bookName",
        headerName: "书籍名称",
        width: 300,
    },
    {
        field: "isbn",
        headerName: "ISBN",
        width: 200,
    },
    {
        field: "courseName",
        headerName: "对应课程",
        width: 150,
    },
    {
        field: "applyerName",
        headerName: "申请人",
        width: 150,
    },
    {
        field: "status",
        headerName: "处理状态",
        type: "singleSelect",
        valueOptions: ["待处理", "已拒绝", "处理中", "已入库"],
        width: 150,
    },
    {
        field: "handleTime",
        headerName: "处理时间",
        type: "dateTime",
        valueGetter: ({ value }) => value && new Date(value),
        width: 200,
    },
    {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="处理图书申请"
                onClick={(e) => {
                    setter(params.id);
                }}
            />,
        ],
    },
];

const BookApplyColumns = () => [
    {
        field: "id",
        headerName: "申请编号",
        width: 90,
    },
    {
        field: "bookName",
        headerName: "书籍名称",
        width: 300,
    },
    {
        field: "isbn",
        headerName: "ISBN",
        width: 200,
    },
    {
        field: "courseName",
        headerName: "对应课程",
        width: 150,
    },
    {
        field: "status",
        headerName: "处理状态",
        width: 150,
    },
    {
        field: "handleTime",
        headerName: "处理时间",
        width: 200,
    },
];

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

export {
    LibColumns,
    StudentCourseColumns,
    BookApplyColumns,
    BookColumns,
    DeletableBookColumns,
};
