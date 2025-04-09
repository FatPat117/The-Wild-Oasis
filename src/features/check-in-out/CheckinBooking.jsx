import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import BookingDataBox from "../bookings/BookingDataBox";
import { useFetchBooking } from "../bookings/useFetchBooking";
import { useSettings } from "../settings/useSettings";
import { useUpdateCheckin } from "./useUpdateCheckin";
const Box = styled.div`
        /* Box */
        background-color: var(--color-grey-0);
        border: 1px solid var(--color-grey-100);
        border-radius: var(--border-radius-md);
        padding: 2.4rem 4rem;
`;

function CheckinBooking() {
        const [confirmPaid, setConfirmPaid] = useState(false);
        const [addBreakfast, setAddBreakfast] = useState(false);

        const { booking, isLoading } = useFetchBooking();
        const { checkIn, isCheckingIn } = useUpdateCheckin();
        const { settings, isLoading: isLoadingSettings } = useSettings();

        const moveBack = useMoveBack();

        useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

        if (isLoading || isLoadingSettings) return <Spinner />;
        const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

        const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

        function handleCheckin() {
                if (!confirmPaid) return;

                if (addBreakfast) {
                        checkIn({
                                bookingId,
                                breakfast: {
                                        hasBreakfast: true,
                                        extrasPrice: optionalBreakfastPrice,
                                        totalPrice: totalPrice + optionalBreakfastPrice,
                                },
                        });
                } else checkIn({ bookingId, breafast: {} });
        }

        return (
                <>
                        <Row type="horizontal">
                                <Heading as="h1">Check in booking #{bookingId}</Heading>
                                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
                        </Row>

                        <BookingDataBox booking={booking} />
                        {!hasBreakfast && (
                                <Box>
                                        <CheckBox
                                                checked={addBreakfast}
                                                onChange={() => {
                                                        setAddBreakfast((add) => !add);
                                                        setConfirmPaid(false);
                                                }}
                                                id="breakfast"
                                        >
                                                Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                                        </CheckBox>
                                </Box>
                        )}
                        <Box>
                                <CheckBox
                                        checked={confirmPaid}
                                        onChange={() => setConfirmPaid(!confirmPaid)}
                                        id="confirm"
                                        disabled={confirmPaid || isCheckingIn}
                                >
                                        I confirm that {guests.fullName} has paid the total amount{" "}
                                        {!addBreakfast
                                                ? formatCurrency(totalPrice)
                                                : `${formatCurrency(
                                                          totalPrice + optionalBreakfastPrice
                                                  )} includes:  ${formatCurrency(totalPrice)} + ${formatCurrency(
                                                          optionalBreakfastPrice
                                                  )}`}
                                </CheckBox>
                        </Box>
                        <ButtonGroup>
                                <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
                                        Check in booking #{bookingId}
                                </Button>
                                <Button variation="secondary" onClick={moveBack}>
                                        Back
                                </Button>
                        </ButtonGroup>
                </>
        );
}

export default CheckinBooking;
