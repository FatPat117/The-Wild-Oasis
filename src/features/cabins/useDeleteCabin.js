import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
        const queryCilent = useQueryClient();

        const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
                mutationFn: (id) => deleteCabinAPI(id),
                onSuccess: () => {
                        toast.success("Cabin successfully deleted");
                        queryCilent.invalidateQueries({
                                queryKey: ["cabins"],
                        });
                },
                onError: (err) => {
                        toast.error(err.message);
                },
        });

        return { isDeleting, deleteCabin };
}
