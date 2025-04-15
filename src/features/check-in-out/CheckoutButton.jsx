import Button from "../../ui/Button";
import { useUpdateCheckout } from "./useUpdateCheckout";

function CheckoutButton({ bookingId }) {
        const { checkout, isCheckingOut } = useUpdateCheckout();
        return (
                <Button variation="primary" size="small" onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
                        Check out
                </Button>
        );
}

export default CheckoutButton;
