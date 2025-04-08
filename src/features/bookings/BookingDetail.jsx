import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import { useFetchBooking } from "./useFetchBooking";

const HeadingGroup = styled.div`
        display: flex;
        gap: 2.4rem;
        align-items: center;
`;

function BookingDetail() {
        const navigate = useNavigate();
        const { booking, isLoading } = useFetchBooking();

        const moveBack = useMoveBack();

        if (isLoading) return <Spinner />;

        const { status, id: bookingId } = booking;
        const statusToTagName = {
                unconfirmed: "blue",
                "checked-in": "green",
                "checked-out": "silver",
        };

        return (
                <>
                        <Row type="horizontal">
                                <HeadingGroup>
                                        <Heading as="h1">Booking #{bookingId}</Heading>
                                        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                                </HeadingGroup>
                                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
                        </Row>

                        <BookingDataBox booking={booking} />

                        <ButtonGroup>
                                {status === "unconfirmed" && (
                                        <Button
                                                icon={<HiArrowDownOnSquare />}
                                                onClick={() => navigate(`/checkin/${bookingId}`)}
                                        >
                                                Check in
                                        </Button>
                                )}
                                <Button variation="secondary" onClick={moveBack}>
                                        Back
                                </Button>
                        </ButtonGroup>
                </>
        );
}

export default BookingDetail;
