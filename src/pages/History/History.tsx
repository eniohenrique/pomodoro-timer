import { useEffect, useState } from "react";
import { HistoryContainer, HistoryListDiv, StatusSpan } from "./Styles";
import { formatDistanceToNow } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'


// EXPECIFICAÇÕES DOQUE CONTÉM UM CICLO
interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupitedDate?: Date,
    finishedDate?: Date
}

export function History() {

    // PEGANDO O CICLO DO LOCAL STORAGE QUE FOI ENVIADO PELA PAGINA HOME.TSX
    const [cycles, setCycles] = useState(JSON.parse(localStorage.getItem("cycles")!))

    useEffect(() => {
        console.log(cycles)
    }, [cycles])


    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>
            <HistoryListDiv>

                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle: Cycle) => {
                            cycle.startDate = new Date(cycle.startDate)
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>

                                    {/* PEGANDO A DISTANCIA ENTRE O 'cycle.startDate' E A DATA ATUAL 
                                        ADICIONANDO O SUFIXO 
                                        COLOCANDO A LINGUAGEM DO SUFIXO COMO 'ptBR' */}
                                    <td>{formatDistanceToNow(cycle.startDate,
                                        {
                                            addSuffix: true,
                                            locale: ptBR,
                                        }
                                    )}
                                    </td>

                                    <td>
                                        <StatusSpan statusColor={cycle.finishedDate ? 'green' : cycle.interrupitedDate ? 'red' : 'yellow'}>
                                            {cycle.finishedDate ? 'Concluído' : cycle.interrupitedDate ? 'Interrompido' : 'Em andamento'}
                                        </StatusSpan>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </HistoryListDiv>
        </HistoryContainer>
    )

}