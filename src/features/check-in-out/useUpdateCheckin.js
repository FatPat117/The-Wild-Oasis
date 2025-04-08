import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useUpdateCheckin() {
        const navigate = useNavigate();
        const queryClient = useQueryClient();
        const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
                mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-in", isPaid: true }),
                onSuccess: (data) => {
                        toast.success(`Booking #${data.id} successfully checked in`);
                        queryClient.invalidateQueries({ active: true });
                        navigate("/");
                },
                onError: (err) => {
                        toast.error("There was an error while checking in");
                },
        });
        return { checkIn, isCheckingIn };
}
