import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3.5rem;


  }
`

export const CountdownButton = styled.button`
    
    width: 100%;
    padding: 1rem;
    border: 0;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    color: ${(props) => props.theme['gray-100']};

    cursor: pointer;

    &:disabled{
      opacity: 0.7;
      cursor: not-allowed;
    }
 
`
export const StartCountdownButton = styled(CountdownButton)`
  background: ${(props) => props.theme['green-500']};
  &:not(:disabled):hover {
      background: ${(props) => props.theme['green-700']};
    }
  `

export const StopCountdownButton = styled(CountdownButton)`
  background: ${(props) => props.theme['red-500']};
  &:not(:disabled):hover {
      background: ${(props) => props.theme['red-700']};
    }
`





