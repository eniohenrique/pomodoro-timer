import styled from "styled-components";

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme["gray-100"]};

    }

`

export const HistoryListDiv = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;

        th {
            background-color: ${props => props.theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme["gray-100"]};
            font-size: 0.875rem;
            line-height: 1.6;

            // PRIMEIRO TH
            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            // ULTIMO TH
            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }

        td {

            background-color: ${props => props.theme["gray-700"]};
            border-top: 4px solid ${props => props.theme["gray-800"]};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            // PRIMEIRO TD "TAREFA"
            &:first-child {
                width: 50%; // USAR METADE DO TAMANHO PARA O TD DE TAREFA
                padding-left: 1.5rem;
            }

            // ULTIMO TD "STATUS"
            &:last-child {
                padding-right: 1.5rem;
            }

        }
    }
`

const STATUS_COLOR = {
    yellow : 'yellow-500',
    green : 'green-500',
    red : 'red-500'
} as const // PASSANDO ESSA TAG NO FINAL, SIGNIFICA QUE OS VALORES DE DENTRO DO STATUS_COLOR NÃO IRAM MUDAR
           // ELE IRA VERIFICAR COM AS CORES DEFAULT DO default.ts


interface StatusSpanProps {
    statusColor: keyof typeof STATUS_COLOR // AQUI ESTOU SETANDO AS MESMA CORES DE DENTRO DO STATUS_COLOR
}

export const StatusSpan = styled.span<StatusSpanProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    // BEFORE SIGNIFICA - ANTES DO CONTEÚDO
    // EFEITO DA BOLINHA DO STATUS
    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: ${props => props.theme[STATUS_COLOR[props.statusColor]]};
    }
`