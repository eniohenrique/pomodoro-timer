import { ThemeProvider } from "styled-components"
import { Router } from "./Router"
import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"
import { BrowserRouter} from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}> {/* ELE IRA DEIXAR EU ACESSAR O TEMA EM TODOS OS COMPONENTES QUE ESTÃO DENTRO DELE
                                            OU SEJA EU IREI ACESSAR OS TEMAS DENTRO DO 'BrowserRouter' ,  'Router' E 'GlobalStyle'*/}

      <BrowserRouter>
        <Router/>
      </BrowserRouter>

      <GlobalStyle/>
      
    </ThemeProvider>
  )
}

