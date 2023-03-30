import styled from 'styled-components'

export const FormContainerDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`


{/* CRIEI ESSE COMPONENTE PARA SERVIR DE BASE PARA OS OUTROS 2 INPUTS, PARA NÃO REPETIR CODIGO NOS 2, 
        COMO VOU USAR INTERNAMENTE NAO PRECISO USAR O EXPORT */}
const BaseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};

    &:focus {
        box-shadow: none;
        border-color: ${props => props.theme['green-500']};

    }

    &::placeholder{
        color: ${props => props.theme['gray-500']};
    }
`

{/*" styled(BaseInput)" ASSIM QUE SE IMPORTA UM COMPONENTE ESTILIZADO A OUTRO COMPONENTE ESTILIZADO,
        ISSO SE CHAMA ERANÇA DE COMPONENTE */}
export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator {
        display: none !important
    }
    
`
{/*" styled(BaseInput)" ASSIM QUE SE IMPORTA UM COMPONENTE ESTILIZADO A OUTRO COMPONENTE ESTILIZADO,
        ISSO SE CHAMA ERANÇA DE COMPONENTE */}
export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
    
`