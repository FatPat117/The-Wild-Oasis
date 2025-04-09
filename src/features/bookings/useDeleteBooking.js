import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
export function useDeleteBooking() {
        const queryClient = useQueryClient();
        const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
                mutationFn: (bookingId) => deleteBookingAPI(bookingId),
                onSuccess: () => {
                        toast.success(`Booking  is successfully deleted`);
                        queryClient.invalidateQueries({
                                queryKey: ["bookings"],
                        });
                },
                onError: (err) => {
                        toast.error("There was an error while deleting the Booking");
                },
        });
        return { deleteBooking, isDeletingBooking };
}
