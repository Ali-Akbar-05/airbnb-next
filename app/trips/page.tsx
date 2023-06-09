import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrent"
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";
import { SafeReservation } from "../types";


const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized"
                    subTitle="Please Login."
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    }); 
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No Trips found"
                    subTitle="looks like you havent reserved any trips." />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <TripsClient reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default TripsPage;