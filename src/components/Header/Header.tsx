import { HeaderContainer } from "./Styles";

import logoImexperts from '../../assets/LogoImexperts.png'
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (

        <HeaderContainer>
            <img src={logoImexperts} alt="" />
            <nav>
                {/* USAR O COMPONENT 'NavLink' SEMPRE QUANDO TIVER QUE REDIRECIONAR */}
                <NavLink to="/" title="Timer">{/* DIRECIONANDO PARA A PAGINA HOME '/' */}

                    <Timer size={24}/>

                </NavLink>

                {/* USAR O COMPONENT 'NavLink' SEMPRE QUANDO TIVER QUE REDIRECIONAR */}
                <NavLink to="/history" title="Histórico">{/* DIRECIONANDO PARA A PAGINA HOME '/history' */}

                    <Scroll size={24}/>

                </NavLink>

            </nav>


        </HeaderContainer>
    
    
    )
    
}