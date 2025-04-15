import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useFetchCabins } from "../cabins/useFetchCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto 34rem auto;
        gap: 2.4rem;
`;

function DashboardLayout() {
        const { bookings, isLoading: isLoadingRecentBookings, error: RecentBookingsError } = useRecentBookings();
        const {
                stays,
                confirmedStays,
                isLoading: isLoadingRecentsStays,
                error: RecentStaysError,
                numDays,
        } = useRecentStays();
        const { cabins, isLoading: isLoadingCabin } = useFetchCabins();

        if (isLoadingRecentBookings || isLoadingRecentsStays || isLoadingCabin) return <Spinner />;

        const cabinCount = cabins.length;
        return (
                <StyledDashboardLayout>
                        <Stats
                                bookings={bookings}
                                confirmedStays={confirmedStays}
                                numDays={numDays}
                                cabinCount={cabinCount}
                        />

                        <TodayActivity />
                        <DurationChart confirmedStays={confirmedStays} />
                        <SalesChart bookings={bookings} numDays={numDays} />
                </StyledDashboardLayout>
        );
}

export default DashboardLayout;
