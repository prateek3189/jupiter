import React from "react";
import ReactDOM from "react-dom";
import Header from "./common/header.jsx";
import Footer from "./common/footer.jsx";
import ComponentRenderer from "./ComponentRenderer.jsx";

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ComponentRenderer />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
