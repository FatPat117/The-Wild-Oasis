import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useFetchBookings() {
        const [searchParams, setSearchParams] = useSearchParams();

        // FILTER
        const filterValue = searchParams.get("status");
        const filter =
                !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" }; //{ field: "status", value: filterValue };
        const {
                isLoading,
                data: bookings,
                error,
        } = useQuery({
                queryKey: ["bookings", filter],
                queryFn: () => {
                        return getBookings({ filter });
                },
        });

        return { isLoading, bookings, error };
}
