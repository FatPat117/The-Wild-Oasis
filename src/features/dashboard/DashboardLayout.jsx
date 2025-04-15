import styled from "styled-components";
import Spinner from "../../ui/Spinner";
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
        const { stays, confirmedStays, isLoading: isLoadingRecentsStays, error: RecentStaysError } = useRecentStays();
        if (isLoadingRecentBookings || isLoadingRecentsStays) return <Spinner />;

        return (
                <StyledDashboardLayout>
                        <div>Statistic</div>
                        <div>Today&apos;s activity</div>
                        <div>Chart stay durations</div>
                        <div>Chart sales</div>
                </StyledDashboardLayout>
        );
}

export default DashboardLayout;
