import getCurrentUser from "../actions/getCurrent";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subTitle="Please login." />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        authorId: currentUser.id
    });
    console.log(reservations);
    if (reservations.length == 0) {
        return (
            <ClientOnly>
                <EmptyState title="No Reservations found"
                    subTitle="Looks like you have no reservation on your properties." />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <ReservationsClient
            reservations={reservations}
            currentUser ={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationsPage;