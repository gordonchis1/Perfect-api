import "./App.css";
import "./Themes.css";
import { Route, Routes } from "react-router";
import Project from "./components/Project/Project";
import { useUserConfigStore } from "./stores/UserConfigStore";
import Home from "./components/Home/Home";

function App() {
  const config = useUserConfigStore((state) => state.config);

  return (
    <div
      className={config?.preferences?.appearance?.theme || "dark"}
      style={{
        maxWidth: "100vw",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Routes>
        <Route index element={<Home />}></Route>
        <Route element={<Project />} path="/project/:id"></Route>
      </Routes>
    </div>
  );
}

export default App;
