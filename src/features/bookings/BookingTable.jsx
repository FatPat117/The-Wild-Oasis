import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useFetchBookings } from "./useFetchBookings";

function BookingTable() {
        const { bookings, isLoading } = useFetchBookings();
        if (isLoading) return <Spinner />;
        console.log(bookings);
        if (!bookings.length) return <Empty resourceName="bookings" />;
        return (
                <Menus>
                        <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                                <Table.Header>
                                        <div>Cabin</div>
                                        <div>Guest</div>
                                        <div>Dates</div>
                                        <div>Status</div>
                                        <div>Amount</div>
                                        <div></div>
                                </Table.Header>

                                <Table.Body
                                        data={bookings}
                                        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
                                />

                                <Table.Footer>
                                        <Pagination count={100} />
                                </Table.Footer>
                        </Table>
                </Menus>
        );
}

export default BookingTable;
