'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertyClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}


const PropertyClient: React.FC<PropertyClientProps> = ({
    listings, currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Listing deleted")
                router.refresh();
            }).catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router])


    return (
        <Container>
            <Heading title="Properties" subTitle="List of your properties." />
            <div className="
            mt-10 grid grid-cols-1 
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            ">
                {listings.map((r) => (
                    <ListingCard key={r.id}
                        data={r}
                        actionId={r.id}
                        onAction={onCancel}
                        disabled={deletingId===r.id}
                        actionLable="Delete Property"
                        currentUser={currentUser}
   
                    />
                ))}

            </div>
        </Container>
    )
}
export default PropertyClient;