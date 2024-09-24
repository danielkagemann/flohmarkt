import Appearance from "./components/Appearance";
import Intro from "./components/Intro";
import Content from "./components/Content";

function App() {
    return (
        <>
            <Appearance />
            <main>
                <Intro />
                <Content />
            </main>
        </>
    );
}

export default App;
