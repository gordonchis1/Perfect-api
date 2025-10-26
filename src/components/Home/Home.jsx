import ResizeContainer from "../Global/ResizeContainer/ResizeContainer";
import Projects from "../Projects/Projects";
import Header from "../Header/Header";
import UpdateNotification from "../Global/UpdateNotification/UpdateNotification";

export default function Home() {
  return (
    <>
      <UpdateNotification />
      <ResizeContainer
        resizeColor={"var(--sidebar-border)"}
        defaultWidth={10}
        maxWidthOfLeftContainer={10}
        minWidthOfLeftContainer={80}
        containerWidth={window.innerWidth}
      >
        <ResizeContainer.LeftContainer>
          <Header />
        </ResizeContainer.LeftContainer>
        <ResizeContainer.RightContainer>
          <Projects />
        </ResizeContainer.RightContainer>
      </ResizeContainer>
    </>
  );
}
