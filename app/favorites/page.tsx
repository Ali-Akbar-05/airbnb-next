import getCurrentUser from "../actions/getCurrent";
import getFavoriteListings from "../actions/getFavoritesListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const favoriteListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (favoriteListings.length === 0) {
        return (
            <EmptyState title="No favorites found"
                subTitle="Looks like you have no favorite listings."
            />
        )
    }
    return(
        <ClientOnly>
            <FavoritesClient favoriteList={favoriteListings}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}
export default ListingPage;