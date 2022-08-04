import React from "react";
// @ts-ignore
import LogoImg from "./logo.png";
import './header.css';

const Header = () => {
    return (
        <>
        <section
            className="Header mbr-navbar mbr-navbar--freeze mbr-navbar--absolute mbr-navbar--transparent mbr-navbar--sticky mbr-navbar--auto-collapse"
            id="menu-93">
            <div className="mbr-navbar__section mbr-section">
                <div className="mbr-section__container container">
                    <div className="mbr-navbar__container">
                        <div className="mbr-navbar__column mbr-navbar__column--s mbr-navbar__brand">
                    <span className="mbr-navbar__brand-link mbr-brand mbr-brand--inline">
                        <span className="mbr-brand__logo"><a href="#">
                            <img src={LogoImg} alt={"Рыбинск - день города 2022"} />
                        </a></span>

                    </span>
                        </div>
                        <div className="mbr-navbar__hamburger mbr-hamburger text-white"><span
                            className="mbr-hamburger__line"></span></div>
                        <div className="mbr-navbar__column mbr-navbar__menu">
                            <nav className="mbr-navbar__menu-box mbr-navbar__menu-box--inline-right">
                                <div className="mbr-navbar__column">
                                    <ul className="mbr-navbar__items mbr-navbar__items--right mbr-buttons mbr-buttons--freeze mbr-buttons--right btn-decorator mbr-buttons--active">
                                        <li className="mbr-navbar__item"><a className="mbr-buttons__link btn text-white"
                                                                            href="#search">Поиск</a></li>
                                        <li className="mbr-navbar__item"><a className="mbr-buttons__link btn text-white"
                                                                            href="#events">События</a></li>
                                        <li className="mbr-navbar__item"><a className="mbr-buttons__link btn text-white"
                                                                            href="#map">Карта</a></li>
                                        <li className="mbr-navbar__item"><a className="mbr-buttons__link btn text-white"
                                                                            href="#contacts">Контакты</a></li>
                                    </ul>
                                </div>

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="content-2 simple col-1 col-undefined mbr-parallax-background mbr-after-navbar"
                 id="content5-92">
            <div className="mbr-overlay" style={{"opacity": 0.6, "backgroundColor": "rgb(0, 0, 0)"}}></div>
            <div className="container">
                <div className="row">
                    <div>
                        <div className="thumbnail">
                            <div className="caption">
                                <h3>День города Рыбинска 2022</h3>
                                <div><p>Календарь событий и поиск по местам на день города 2022<br/></p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
)
}

export default Header;