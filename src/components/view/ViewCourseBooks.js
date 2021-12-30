import { DataGrid } from "@mui/x-data-grid";
import { BookColumns } from "../datagridColumns";
import { useState, useEffect } from "react";
import supabase from "../../supabase/Client";
import { Box } from "@mui/system";
import { ClickButton } from "../utils";

export default function ViewCourseBooks({
    courseId,
    editable = false,
    setter,
    value,
}) {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const columns = BookColumns();

    const getLibUrl = (libBookData, bookId) => {
        const ld = libBookData.find((d) => d.id === bookId);
        return ld ? ld.url : null;
    };

    const getBooks = async () => {
        try {
            setLoading(true);
            let booksData = [];
            let booksRes = await supabase
                .from("course_books")
                .select(`id, name, author, isbn, lib_book_id`)
                .eq("course_id", courseId);

            if (booksRes.error) throw booksRes.error;
            if (!booksRes.data) {
                setBooks([]);
                return;
            }
            booksData = booksRes.data.map((d) => ({
                id: d.id,
                name: d.name,
                author: d.author,
                isbn: d.isbn,
                libBookId: d.lib_book_id,
            }));

            const libBookIds = booksData
                .filter((d) => d.libBookId)
                .map((d) => d.libBookId);

            let libBooksRes = await supabase
                .from("lib_books")
                .select(`id, url`)
                .in("id", libBookIds);

            if (libBooksRes.error) throw libBooksRes.error;
            if (!libBooksRes.data) return;
            console.log();
            booksData = booksData.map((d) => ({
                ...d,
                ...{
                    libUrl: d.libBookId
                        ? getLibUrl(libBooksRes.data, d.libBookId)
                        : null,
                },
            }));
            console.log(booksData);

            setBooks(booksData);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, [courseId]);

    if (loading) return <p>Loading</p>;

    return (
        <Box>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2>课程教参</h2>
                {editable && (
                    <ClickButton
                        text={"编辑课程参考"}
                        setter={setter}
                        value={value}
                    />
                )}
            </div>
            <div style={{ height: 300, alignItems: "center" }}>
                <DataGrid
                    rows={books}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </Box>
    );
}
