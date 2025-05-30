import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
        const [searchParams, setSearchParams] = useSearchParams();

        const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

        const queryDate = subDays(new Date(), numDays).toISOString();

        const {
                isLoading,
                data: stays,
                error,
        } = useQuery({
                queryKey: ["stays", `last-${numDays}`],
                queryFn: () => getStaysAfterDate(queryDate),
        });

        const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out");

        return { isLoading, stays, error, confirmedStays, numDays };
}
