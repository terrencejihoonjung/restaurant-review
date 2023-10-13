import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";

function Home() {
  return (
    <>
      <div className="text-center mt-12 mb-6">
        <Header />
        <AddRestaurant />
        <RestaurantList />
      </div>
    </>
  );
}

export default Home;
