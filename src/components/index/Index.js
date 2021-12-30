import { useEffect, useState } from "react";
import Student from "./Student";
import Teacher from "./Teacher";
import Lib from "./Lib";
import supabase from "../../supabase/Client";

export default function Index({ session }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, [session]);

    const getUser = async () => {
        try {
            setLoading(true);
            let { data, error, status } = await supabase
                .from("users")
                .select(`name, id, role`)
                .eq("auth_id", session.user.id)
                .single();

            if (error && status != 406) throw error;

            if (data)
                setUser({
                    id: data.id,
                    name: data.name,
                    role: data.role,
                });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <p>Loading</p>}
            {user && user.role === "lib" && <Lib user={user} />}
            {user && user.role === "teacher" && <Teacher user={user} />}
            {user && user.role === "student" && <Student user={user} />}
        </>
    );
}
