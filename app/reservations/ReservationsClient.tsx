'use client'
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";


interface ReservationsClientProps {
    reservations: SafeReservation[],
    currentUser?: SafeUser
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations, currentUser
}) => {

    const router = useRouter();
    const [deleteingId, setDeleteingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeleteingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");
                router.refresh();
            })
            .catch(() => {
                toast.error("Something went wrong");
            }).finally(() => {
                setDeleteingId("");
            });
    }, [router]);

    return (
        <Container>
            <Heading title="Reservations" subTitle="Booking on your propserties" />
            <div className="mt-10 grid grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-5
                            2xl:grid-cols-6
                            gap-8
">
 {
    reservations.map((reservation)=>(
        <ListingCard key={reservation.id}
        data={reservation.Listing}
        reservation={reservation}
        actionId={reservation.id}
        onAction={onCancel}
        disabled={deleteingId==reservation.id}
        actionLable="Cancel Guest reservations"
        currentUser={currentUser}
        />
    ))
 }

            </div>
        </Container>
    )
}

export default ReservationsClient;