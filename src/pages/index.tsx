import * as React from "react"
// @ts-ignore
import {Helmet} from "react-helmet";
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
            <Helmet>
                <title>События на день города Рыбинска 2022</title>
                {/*<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>*/}
                {/*<script src="https://api-maps.yandex.ru/2.1/?apikey=f7af4e10-532a-42fd-a93e-7e921555d860&lang=ru_RU" type="text/javascript">
                </script>*/}
            </Helmet>
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
