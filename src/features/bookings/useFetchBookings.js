import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useFetchBookings() {
        const [searchParams, setSearchParams] = useSearchParams();

        // FILTER
        const filterValue = searchParams.get("status");
        const filter =
                !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" }; //{ field: "status", value: filterValue };

        // SortBY
        const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

        const [field, direction] = sortByRaw.split("-");
        const sortBy = { field, direction };

        // Pagination
        const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
        const {
                isLoading,
                data: { data: bookings, count } = {},
                error,
        } = useQuery({
                queryKey: ["bookings", filter, sortBy, page],
                queryFn: () => getBookings({ filter, sortBy, page }),
        });

        return { isLoading, bookings, error, count };
}
