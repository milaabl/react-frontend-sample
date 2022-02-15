import React from 'react'

import { StyledCell } from './styles/StyledCell'
import { TETROMINOS } from '../gameUtils/tetrominos'

export default React.memo(({ type }) => (
<StyledCell type={type} color={TETROMINOS[type].color}/>
))
