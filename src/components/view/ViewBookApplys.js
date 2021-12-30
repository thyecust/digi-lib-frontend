import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { BookApplyColumns } from "../datagridColumns";
import supabase from "../../supabase/Client";

export default function ViewBookApplys({ userId }) {
    const [bookApplys, setBookApplys] = useState(null);
    const [loading, setLoading] = useState(true);
    const columns = BookApplyColumns();

    const getBookApplys = async () => {
        try {
            setLoading(true);
            const { data, error, status } = await supabase
                .from("book_applys")
                .select(
                    `id, name, isbn, course_name, lib_url, status, update_at`
                )
                .eq("created_user_id", userId);

            if (error) throw error;
            setBookApplys(
                data.map((d) => ({
                    id: d.id,
                    bookName: d.name,
                    isbn: d.isbn,
                    courseName: d.course_name,
                    status: d.status,
                    libUrl: d.lib_url,
                    handleTime: d.update_at,
                }))
            );
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookApplys();
    }, [userId]);

    if (loading) return <p>Loading</p>;

    return (
        <Box>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                    rows={bookApplys}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}
