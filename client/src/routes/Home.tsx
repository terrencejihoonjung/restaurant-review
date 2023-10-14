import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center pt-12">
        <Header />
        <div className="w-3/4">
          <AddRestaurant />
          <RestaurantList />
        </div>
      </div>
    </>
  );
}

export default Home;
