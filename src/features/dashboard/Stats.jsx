import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
        // 1. Count number of bookings
        const numBookings = bookings.length;

        // 2. Total sales
        const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        // 3. Total checkin
        const checkins = confirmedStays.length;

        // 4. Occupancy rate = num checked in nights/ all availabel nights (num days * num cabins)
        const occupation = confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) / (numDays * cabinCount);

        return (
                <>
                        <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
                        <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
                        <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
                        <Stat
                                title="Occupancy rate"
                                color="yellow"
                                icon={<HiOutlineChartBar />}
                                value={Math.round(occupation * 100) + "%"}
                        />
                </>
        );
}

export default Stats;
