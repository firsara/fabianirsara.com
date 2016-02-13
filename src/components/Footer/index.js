
import React, { Component } from 'react'
import style from './style.css'
import grid from '../../assets/css/grid.css'

import superb from 'superb'
import weekday from '../../utils/weekday'
import transformText from '../../utils/transformText'

class Footer extends Component {
  componentDidMount() {
    this.nextCycle()
  }

  componentWillUnmount() {
    if (this._cycleTimeout) {
      clearTimeout(this._cycleTimeout)
    }
  }

  nextCycle() {
    if (this._cycleTimeout) clearTimeout(this._cycleTimeout)
    this._cycleTimeout = setTimeout(::this.cycle, 3500 + Math.random() * 900)
  }

  cycle() {
    this.nextCycle()
    transformText(this.refs.word, superb.prefix())
  }

  render() {
    return (
      <footer className={style.footer}>
        <div className={grid.container}>
          <p>Have <span ref="word">{superb.prefix()}</span> {weekday()}</p>
        </div>
      </footer>
    )
  }
}

export default Footer
