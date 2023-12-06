import Header from "../../components/ui/Header";
import AddRestaurant from "../RestaurantList/AddRestaurant";
import RestaurantList from "../RestaurantList/RestaurantList";

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
