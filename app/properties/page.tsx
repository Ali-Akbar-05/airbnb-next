import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"
import getCurrentUser from "../actions/getCurrent"
import getListing from "../actions/getListing";
import PropertyClient from "./PropertyClient";



const PropertyPage = async () => {

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

    const listings = await getListing({
        userId: currentUser.id
    }); 
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No properties found"
                    subTitle="looks like you have no properties." />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <PropertyClient listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default PropertyPage;