import React from "react";
import {cn} from '@bem-react/classname';

const Footer = () => {
    const className = cn('Footer');
    return <footer className={`${className('Footer')} mbr-section mbr-section--relative mbr-section--fixed-size`}
                   style={{"backgroundColor": "rgb(68, 68, 68)"}}>

        <div className="mbr-section__container container">
            <div className="mbr-footer mbr-footer--wysiwyg row">
                <div className="col-sm-12" id={"contacts"}>
                    <p className="mbr-footer__copyright"></p><p>Все права защищены (c) 2022 Ленев Антон Сергеевич.</p>
                    <p><a target={"_blank"} href={"mailto:m0rg0t.Anton@gmail.com"}>m0rg0t.Anton@gmail.com</a></p>
                    <p><a target={"_blank"} href={"https://vk.com/m0rg0t"}>https://vk.com/m0rg0t</a></p>
                </div>
            </div>
        </div>
    </footer>
}

export default Footer;