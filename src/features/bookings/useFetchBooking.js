import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useFetchBooking() {
        const { bookingId } = useParams();

        const {
                isLoading,
                data: booking,
                error,
        } = useQuery({
                queryKey: ["booking", bookingId],
                queryFn: () => getBooking(bookingId),
        });
        return { isLoading, booking, error };
}
