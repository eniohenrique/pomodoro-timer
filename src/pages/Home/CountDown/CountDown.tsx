import { useContext, useEffect, useState } from "react";
import { CountDownContainerDiv, Separator } from "./Styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../Home";



export function CountDown() {

    //CONSTANTE QUE RECEBE ESSAS PROPRIEDADES/VALORES DA PAGINA HOME.TSX
    const { activeCycle, setCycles, setActiveCycle, amountSecondsPassed, setAmountSecondsPassed } = useContext(CyclesContext)


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    // DIMINUINDO OS SEGUNDOS PASSADO PELO SEGUNDOS INICIAIS (DE 1 EM 1)
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    // ATRAVES DOS MINUTOS DESCOBRIMOS AS HORAS
    const minutesAmount = Math.floor(currentSeconds / 60)

    // PEGANDO O RESTO DA DIVISSÃO DOS SEGUNDOS E SOMANDO COM OS SEGUNDOS
    const secondAmount = currentSeconds % 60

    // DIZENDO QUE OS MINUTOS PRECISA TER 2 CARACTERES, SE NÃO TIVER COMPLETA COM 0
    const minutes = String(minutesAmount).padStart(2, '0')
    // DIZENDO QUE OS SEGUNDOS PRECISA TER 2 CARACTERES, SE NÃO TIVER COMPLETA COM 0
    const seconds = String(secondAmount).padStart(2, '0')

    // EFFECT QUE ALTERA O TITULO DA PAGINA COM O TEMPO QUE ESTÁ PASSANDO MUITO LEGAL
    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
        else{
            document.title = `Pomodoro Timer`
        }

    }, [minutes, seconds, activeCycle])


    // EFFECT QUE FAZ A CONTAGEM REGRESSIVA DO TEMPO
    useEffect(() => {
        let interval: number | any
        if (activeCycle) {
            interval = setInterval(() => {

                // PEGANDO A DIFERENÇA ENTRE A DATA, HORAS E MINUTOS DA CRIAÇÃO DO CICLO E A DATA, HORAS E MINUTOS ATUAIS É ATRIBUINDO A UMA VARIAVEL 'secondsDifference'
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)


                if (secondsDifference >= totalSeconds) {
                    setCycles((cycles) =>
                        cycles.map((cycle) => {
                            if (cycle.id == activeCycle?.id) {
                                // AQUI ELE IRA RETORNAR O CICLO QUE CAIU NO IF E ELE IRÁ EDITAR A VARIAVEL 'finishedDate'
                                // ESSE JEITO E DIFERENTE , POIS SO PRECISA PASSAR A VARIAVEL QUE VC QUER ALTERAR, EM VEZ DA INTERFACE INTEIRA
                                // COMO E FEITO NORMALMENTE 
                                return { ...cycle, finishedDate: new Date() }
                            } else {
                                return cycle
                            }
                        }
                        )
                    )
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                    setActiveCycle(null)

                } else {

                    setAmountSecondsPassed(secondsDifference)
                }


            }, 1000)
        }


        // ZERANDO O SETINTERVAL QUANDO E CRIADO UM NOVO CICLO EM CIMA DE OUTRO CICLO
        return () => {

            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds])

    return (

        <CountDownContainerDiv>
            <span>{minutes[0]}</span> {/* PEGANDO O PRIMEIRO CARACTER DOS MINUTOS */}
            <span>{minutes[1]}</span> {/* PEGANDO O SEGUNDO CARACTER DOS MINUTOS */}
            <Separator>:</Separator>
            <span>{seconds[0]}</span> {/* PEGANDO O PRIMEIRO CARACTER DOS SEGUNDOS */}
            <span>{seconds[1]}</span> {/* PEGANDO O SEGUNDO CARACTER DOS SEGUNDOS */}
        </CountDownContainerDiv>
    )
}