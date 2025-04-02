import supabase, { supabaseUrl } from "./supabase";

// Fetch data
export async function getCabins() {
        const { data, error } = await supabase.from("cabins").select("*");
        if (error) {
                console.error(error);
                throw new Error("Cabins could not be loaded");
        }
        return data;
}

// Delete cabin
export async function deleteCabin(id) {
        const { data, error } = await supabase.from("cabins").delete().eq("id", id);

        if (error) {
                console.error(error);
                throw new Error("Cabins could not be deleted");
        }
        return data;
}

// Create cabin
export async function createCabin(newCabin) {
        const hasImagePath = typeof newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl);

        let imagePath = newCabin.image;

        if (!hasImagePath) {
                const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
                imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

                const { error: storageError } = await supabase.storage
                        .from("cabin-images")
                        .upload(imageName, newCabin.image);

                if (storageError) {
                        console.error(storageError);
                        throw new Error("Cabin image could not be uploaded");
                }
        }

        const { data, error } = await supabase
                .from("cabins")
                .insert([{ ...newCabin, image: imagePath }])
                .select();

        if (error) {
                console.error(error);
                throw new Error("Cabins could not be created");
        }

        return data;
}

export async function editCabin(newCabin, id) {
        const hasImagePath = typeof newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl);

        let imagePath = newCabin.image;

        // Nếu là file mới, upload ảnh lên Supabase Storage
        if (!hasImagePath) {
                const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
                imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

                const { error: storageError } = await supabase.storage
                        .from("cabin-images")
                        .upload(imageName, newCabin.image);

                if (storageError) {
                        console.error(storageError);
                        throw new Error("Cabin image could not be uploaded");
                }
        }

        const { data, error } = await supabase
                .from("cabins")
                .update({ ...newCabin, image: imagePath })
                .eq("id", id)
                .select();

        if (error) {
                console.error(error);
                throw new Error("Cabin could not be updated");
        }

        return data;
}
