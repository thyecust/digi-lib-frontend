import { Button, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { GobackButton } from "../utils";
import supabase from "../../supabase/Client";
import EditBookApplyFrom from "./EditBookApplyForm";

export default function EditBookApply({ applyId, setter }) {
    const [bookApply, setBookApply] = useState(null);
    const [loading, setLoading] = useState(true);

    const getBookApply = async () => {
        try {
            setLoading(true);
            const { data, error, status } = await supabase
                .from("book_applys")
                .select(`id, name, isbn, course_name, applyer_name, created_at, status, update_at`)
                .eq("id", applyId)
                .single();

            if (error) throw error;
            setBookApply({
                id: data.id,
                bookName: data.name,
                isbn: data.isbn,
                courseName: data.course_name,
                status: data.status,
                applyerName: data.applyer_name,
                applyTime: data.created_at,
                handleTime: data.update_at,
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookApply();
    }, [applyId]);

    if (loading) return <p>Loading</p>;

    return (
        <Box sx={{ textAlign: "-webkit-center" }}>
            <Box>
                <GobackButton setter={setter} value={null} />
                <h1>
                    书籍申请-{bookApply.bookName}-{bookApply.courseName}
                </h1>
            </Box>
            <EditBookApplyFrom bookApply={bookApply} />
        </Box>
    );
}
