import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
        const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                        data: {
                                fullName,
                                avatar: "",
                        },
                },
        });
        return data;
}

export async function login({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
        });

        if (error) {
                throw new Error(error.message);
        }

        return data;
}

export async function getCurrentUser() {
        // Kiem tra nguoi dung da dang nhap chua, neu dang nhap roi thi se co session luu trong local Storage
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) return null;

        const { data, error } = await supabase.auth.getUser();

        if (error) {
                throw new Error(error.message);
        }

        return data?.user;
}

export async function logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
                throw new Error(error.message);
        }
}
