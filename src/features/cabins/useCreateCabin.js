import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin as createCabinAPI } from "../../services/apiCabins";

export function useCreateCabin() {
        const queryClient = useQueryClient(); // 🛠 Sửa lỗi chính tả

        // Create Cabin
        const { mutate: createCabin, isLoading: isCreating } = useMutation({
                mutationFn: createCabinAPI,
                onSuccess: () => {
                        toast.success("New cabin successfully created");
                        queryClient.invalidateQueries({ queryKey: ["cabins"] });
                },
                onError: (err) => toast.error(err.message),
        });

        return { isCreating, createCabin };
}
