import * as React from "react"
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/mobirise/css/style.css";
import "../assets/mobirise/css/mbr-additional.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Events from "../components/events/events";
/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:700,400&amp;subset=cyrillic,latin,greek,vietnamese">*/

const IndexPage = () => {

    return (
        <>
            <header></header>
            <main>
                <Header />
                <Events/>
                <Footer />
            </main>
        </>
    )
}

export default IndexPage

export const Head = () => <title>События на день города Рыбинска 2022</title>;
