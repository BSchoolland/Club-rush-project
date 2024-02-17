import "preline/preline";
import useAutoInit from "./components/useAutoInit";
import Game from "./components/game";
import GamePrototype from "./components/gameprototype";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Carousel from "./components/carousel";

function App() {
  // custom hook from init
  useAutoInit();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
      </main>
      <Carousel />
    </div>
  );
}

export default App;
