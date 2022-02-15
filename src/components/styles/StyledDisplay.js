import styled from 'styled-components'

export const StyledDisplay = styled.div`
  align-items: center;
  background: #C1C8E4;
  border: 4px solid #333333;
  border-radius: 20px;
  box-sizing: border-box;
  color: ${props => (props.gameOver ? 'red' : '#8860D0')};
  display: flex;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  margin: 0 0 20px 0;
  min-height: 30px;
  padding: 20px;
  width: 100%;
`
