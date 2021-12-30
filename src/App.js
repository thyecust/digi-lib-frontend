import { Index, Login, Teacher, Lib, Student } from "./components/index";
import { CreateBook } from "./components/create";
import { EditBookApply, EditCourse, EditCourseBooks } from "./components/edit";
import { ViewCourse, ViewCourseResources } from "./components/view";
import { Logout, PasswordReset } from "./debug";
import { useEffect, useState } from "react";
import supabase from "./supabase/Client";

function App() {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    if (!session) {
        return <Login />;
    }

    return (
        <>
            <Logout style={{ float: "right" }} />
            <Index session={session} />
        </>
    );
}

export default App;
