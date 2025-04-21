import "./App.css";
import Header from "./components/Header/Header";
import Projects from "./components/Projects/Projects";
import { Route, Routes, useMatch } from "react-router";
import ResizeContainer from "./components/Global/ResizeContainer/ResizeContainer";
import Project from "./components/Project/Project";

// TODO: change defaultWidthTo px
function App() {
  const match = useMatch("/project/:id");

  return (
    <div
      style={{
        maxWidth: "100vw",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <ResizeContainer
        resizeColor={"var(--borders)"}
        defaultWidth={match !== null ? 4 : 14}
        maxWidthOfLeftContainer={14}
        minWidthOfLeftContainer={80}
        containerWidth={window.innerWidth}
      >
        <ResizeContainer.LeftContainer>
          <Header />
        </ResizeContainer.LeftContainer>

        <ResizeContainer.RightContainer>
          <Routes>
            <Route index element={<Projects />}></Route>
            <Route element={<Project />} path="/project/:id"></Route>
          </Routes>
        </ResizeContainer.RightContainer>
      </ResizeContainer>
    </div>
  );
}

export default App;
