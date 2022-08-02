import * as React from "react"
// @ts-ignore
import { Helmet } from "react-helmet";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/mobirise/css/style.css";
import "../assets/mobirise/css/mbr-additional.css";

import events from "../data/events";
import Header from "../components/header/header";
/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:700,400&amp;subset=cyrillic,latin,greek,vietnamese">*/

// markup
const IndexPage = () => {
    return (
        <>
            <Helmet>
                <title>События на день города Рыбинска 2022</title>
                {/*<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>*/}
            </Helmet>
            <header></header>
            <main>
                <Header />
                <h1>
                    События на день города Рыбинска 2022
                </h1>
                <div>
                    {events.map(event => (
                        <div>
                            <h2>{event.title}</h2>
                            <p dangerouslySetInnerHTML={{__html: event.description}}/>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default IndexPage
