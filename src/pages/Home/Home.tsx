import { HandPalm, Play } from "phosphor-react";
import React, { createContext, useEffect, useState } from 'react'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./Styles";
import { NewCycleForm } from "./NewCycleForm/NewCycleForm";
import { CountDown } from "./CountDown/CountDown";
import * as zod from 'zod'
import { useForm, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'



// EXPECIFICAÇÕES DOQUE CONTÉM UM CICLO
interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupitedDate?: Date,
    finishedDate?: Date
}


//INTERFACE PARA ENVIAR DADOS PARA OUTRAS PAGINAS DE CODIGO
interface CycleContextData {

    activeCycle: Cycle | null | undefined;
    setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>
    setActiveCycle: React.Dispatch<React.SetStateAction<Cycle | null | undefined>>
    register: UseFormRegister<{ task: string, minutesAmount: number, startDate: Date }>
    setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
    amountSecondsPassed: number

}

export const CyclesContext = createContext({} as CycleContextData)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O ciclo precisa ser de no mínimo 5 minutos').max(60, 'O ciclo precisa ser de no máximo 60 minutos'),

})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>



export function Home() {

    // CONSTANTE LISTA DE CICLOS
    const [cycles, setCycles] = useState<Cycle[]>([])
    //const [activeCycleId, setActiveCycleId] = useState<string | null>(null)


    // CONSTANTE QUE GUARDO O CICLO ATIVO
    const [activeCycle, setActiveCycle] = useState<Cycle | null | undefined>()

    //const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

    //CONSTANTE QUE GUARDA OS SEGUNDOS PASSADOS
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)



    const { register, handleSubmit, watch, reset } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: { // FALORES DEFAULT PARA QUANDO RESETAR
            task: '',
            minutesAmount: 0,
            startDate: new Date(),
        }
    })




    //FUNÇÃO DE CRIAR UM NOVO CICLO
    function handleCreateNewCycle(data: NewCycleFormData) { // DATA RECEBIDO NO SUBMIT DA FUNÇÃO

        const newCycle: Cycle = {
            id: String(new Date().getTime()), // AQUI O ID E AS HORAS
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        // ADICIONANDO OS NOVOS CICLOS NA LISTA DOS CICLOS
        setCycles([...cycles, newCycle])


        //setActiveCycleId(newCycle.id)
        setActiveCycle(newCycle)

        // ZERANDO O TEMPO QUANDO E CRIADO UM NOVO PROJETO
        setAmountSecondsPassed(0)

        // RESETANDO OS CAMPOS DE PREENCHIMENTO
        reset();

    }

    // FUNÇÃO DE INTERROMPER O CICLO NO BOTÃO
    function handleInterruptCycle() {
        setCycles((cycles) => cycles.map((cycle) => {
                    if (cycle.id == activeCycle?.id) {
                        // AQUI ELE IRA RETORNAR O CICLO QUE CAIU NO IF E ELE IRÁ EDITAR A VARIAVEL 'interrupitedDate'
                        // ESSE JEITO E DIFERENTE , POIS SO PRECISA PASSAR A VARIAVEL QUE VC QUER ALTERAR, EM VEZ DA INTERFACE INTEIRA
                        // COMO E FEITO NORMALMENTE 
                        return { ...cycle, interrupitedDate: new Date() }
                    } else {
                        return cycle
                    }
                }
            )
        )


        // SETA O CICLO ATIVO COMO NULL
        setActiveCycle(null)

    }


    const newTask = watch('task')

    useEffect(() => {
        // ALTERANDO/ENVIANDO PARA O LOCAL STORAGE
        localStorage.setItem('cycles', JSON.stringify(cycles))
    }, [cycles])




    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">


                {/* 1º MANEIRA PARA ENVIANDO OS VALORES/FUNÇÕES PARA TODAS AS PAGINAS QUE ESTÃO DENTRO DO 'CyclesContext.Provider'
                    OU SEJA ENVIANDO OS VALORES PARA 'NewCycleForm' E 'CountDown' */}
                <CyclesContext.Provider value={{ activeCycle, setCycles, setActiveCycle, register, amountSecondsPassed, setAmountSecondsPassed }}>

                    {/* 2º MANEIRA  DE ENVIAR A FUNÇÃO 'activeCycle' */}
                    {/*  <NewCycleForm activeCycle = activeCycle /> */}
                    <NewCycleForm />

                    <CountDown />

                </CyclesContext.Provider>


                {activeCycle ?
                    <StopCountdownButton onClick={handleInterruptCycle} type="button" >
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                    :
                    <StartCountdownButton type="submit" disabled={!newTask}>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                }
            </form>
        </HomeContainer>
    )

}