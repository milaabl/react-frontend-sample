import { useState, useCallback } from 'react'

import { TETROMINOS, randomTetromino } from '../gameUtils/tetrominos'
import { STAGE_WIDTH, checkCollision } from '../gameUtils/gameHelpers'

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    position: {
      x: 0,
      y: 0
    },
    tetromino: TETROMINOS[0].shape,
    collided: false
  })

  const rotate = (tetromino, direction) => {
    // Make the rows columns
    const rotatedTetromino = tetromino.map((_, index) =>
      tetromino.map(column => column[index])
    )
    // Reverse each row
    if (direction > 0) return rotatedTetromino.map(row => row.reverse())
    return rotatedTetromino.reverse()
  }

  const rotatePlayer = (stage, direction) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player))
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction)

    const position = clonedPlayer.position.x
    let offset = 1
    while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -direction)
        clonedPlayer.position.x = position
        return
      }
    }
    setPlayer(clonedPlayer)
  }

  const updatePlayerPosition = ({ x, y, collided }) => {
    setPlayer(previous => ({
      ...previous,
      position: {
        x: (previous.position.x += x),
        y: (previous.position.y += y)
      },
      collided
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: {
        x: STAGE_WIDTH / 2 -2,
        y: 0
      },
      tetromino: randomTetromino().shape,
      collided: false
    })
  }, [])

  return [player, updatePlayerPosition, resetPlayer, rotatePlayer]
}
