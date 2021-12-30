import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import supabase from "../../supabase/Client";
import { LibColumns } from "../datagridColumns";

export default function ViewLibBookApplys({ userId, setter }) {
    const [libBookApplys, setLibBookApplys] = useState(null);
    const [loading, setLoading] = useState(true);
    const columns = LibColumns(setter);

    const getLibBookApplys = async () => {
        try {
            setLoading(true);
            const { data, error, status } = await supabase
                .from("book_applys")
                .select(
                    `id, name, isbn, course_name, status, applyer_name, update_at`
                );

            if (error) throw error;
            setLibBookApplys(
                data.map((d) => ({
                    id: d.id,
                    bookName: d.name,
                    isbn: d.isbn,
                    courseName: d.course_name,
                    applyerName: d.applyer_name,
                    status: d.status,
                    handleTime: d.updated_time,
                }))
            );
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLibBookApplys();
    }, [userId]);

    if (loading) return <p>Loading</p>;

    return (
        <Box>
            <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                    rows={libBookApplys}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}
