import React, { useState } from "react";

import { createStage, checkCollision } from '../gameUtils/gameHelpers'

// Custom Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
import { useGameStatus } from '../hooks/useGameStatus'

// Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'
import Stage from './Stage'
import Display from './Display'
import StartButt from './StartButton'

export default () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  // console.log('breakpoint №1')

  const movePlayerHorizontally = direction => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0 })
    }
  }

  const startGame = () => {
    //Reset everything
    setStage(createStage())
    setDropTime(1000)
    resetPlayer()
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(previous => previous + 1)
      //Also increase the speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })){
      updatePlayerPosition({ x: 0, y: 1, collided: false })
    } else {
      // Game over
      if (player.position.y < 1) {
        console.log('Failed')
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true })
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  }
  const dropPlayer = () => {
    setDropTime(null)
    drop()
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37:
          movePlayerHorizontally(-1)
          break
        case 38:
          rotatePlayer(stage, 1)
          break
        case 39:
          movePlayerHorizontally(1)
          break
        case 40:
          dropPlayer()
          break
        default:
          break
      }
    }
  }

  useInterval(() => {
    drop()
  }, dropTime)

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game is over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButt callback={startGame} />
          <Display text="Arrow keys are used to control the game. Down increases the speed and Up is to rotate it."/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
