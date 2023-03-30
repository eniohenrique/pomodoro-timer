import { Routes, Route, HashRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { History } from "./pages/History/History";
import { DefaultLayout } from "./layouts/DefaultLayout/DefaultLayout";


export function Router() {
    return (
        <Routes>
            {/* ELE IRÁ APLICAR O "DefaultLayout" EM TODOS AS ROTAS APARTIR DO "/" */}
            <Route path="/" element={<DefaultLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />

            </Route>

        </Routes>

    );

}