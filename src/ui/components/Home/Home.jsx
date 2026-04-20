import ResizeContainer from "../Global/ResizeContainer/ResizeContainer";
import Projects from "../Projects/Projects";
import Header from "../Header/Header";

export default function Home() {
    return (
        <>
            <ResizeContainer
                resizeColor={"var(--border)"}
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
