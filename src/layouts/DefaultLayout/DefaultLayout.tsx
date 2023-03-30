import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { LayoutContainer } from "./Styles";

export function DefaultLayout() {
    return (
        
        <LayoutContainer>{/* LayoutContainer É A ESTILIZAÇÃO CRIADA NA PASTA Styles.ts */}

            <Header/>

            {/* ESSA TAG "Outlet" É OBRIGATORIA EM UM "DefaultLayout" */}
            {/* POIS ELA SERVE COMO ANCORA PARA DIZER ONDE AS ROTAS(PAGINAS) IRAM SE ENCAIXAR */}
            <Outlet/>

        </LayoutContainer>

    )
    
}