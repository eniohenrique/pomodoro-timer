import { FormContainerDiv, MinutesAmountInput, TaskInput } from "./Styles";
import { CyclesContext } from "../Home";
import { useContext } from "react";

// 2º MANEIRA DE RECEBER VARIAVEIS/FUNÇÕES DA HOME.TSX
// export function NewCycleForm({ activeCycle }) {
export function NewCycleForm() {



    //CONSTANTE QUE RECEBE ESSAS PROPRIEDADES/VALORES DA PAGINA HOME.TSX
    const { activeCycle, register} = useContext(CyclesContext)


    return (

        <FormContainerDiv>

            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task" // O VALOR DESSE INPUT E PASSADO NO DATA
                list="task-suggestions"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1" />
                <option value="Projeto 2" />
                <option value="Projeto 3" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount" // O VALOR DESSE INPUT E PASSADO NO DATA
                placeholder="00"
                step={1}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainerDiv>
    )
}