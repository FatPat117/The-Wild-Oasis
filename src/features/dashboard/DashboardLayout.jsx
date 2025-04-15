import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useFetchCabins } from "../cabins/useFetchCabins";
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
                        <div>Statistic</div>
                        <div>Today&apos;s activity</div>
                        <div>Chart stay durations</div>
                        <div>Chart sales</div>
                </StyledDashboardLayout>
        );
}

export default DashboardLayout;
