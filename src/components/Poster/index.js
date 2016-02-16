
import React, { Component } from 'react'

import classnames from 'classnames'
import style from './style.css'
import imagepath from '../../utils/imagepath'

import Title from './Title'

//import arrow from '../../assets/icons/arrow-bottom.png'
const arrow = ''
import scrollTo from '../../utils/scrollTo'
import snap from '../../utils/snap'

import { config } from '../../utils/getConfig'

class Poster extends Component {
  state = {
    loaded: false,
    width: 0,
    height: 0,
    imageWidth: 0,
    imageHeight: 0,
    y: 0
  };

  componentDidMount() {
    this._mounted = true
    this._oldScroll = null
    this._handleScroll = ::this.handleScroll
    this._scrollTimeout = requestAnimationFrame(this._handleScroll)
    window.addEventListener('scroll', (this._handleScroll = ::this.handleScroll))
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))

    this.handleResize()
    this.handleScroll()
  }

  componentWillUnmount() {
    this._mounted = false
    if (this._scrollTimeout) cancelAnimationFrame(this._scrollTimeout)
    window.removeEventListener('scroll', this._handleScroll)
    window.removeEventListener('resize', this._handleResize)
  }

  getImageSize(event) {
    this.setState({
      loaded: true,
      imageWidth: event.target.naturalWidth || event.target.offsetWidth,
      imageHeight: event.target.naturalHeight || event.target.offsetHeight
    })
  }

  handleScroll(event) {
    if (this._mounted) {
      requestAnimationFrame(this._handleScroll)
    }

    if (this._oldScroll !== window.scrollY) {
      this._oldScroll = window.scrollY

      if (! (this._oldScroll > window.innerHeight * 1.2 && window.scrollY > window.innerHeight * 1.2)) {
        this.setState({y: window.scrollY})
      }
    }
  }

  handleResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight * (config.poster_height / 100)
    })
  }

  scrollToContent() {
    scrollTo(this.state.height)
  }

  render() {
    const { file, text } = this.props

    if (file) {
      const path = imagepath(file, 'large')

      let percentage = 0
      let options = {}
      let arrowCss = {}
      let css = {}
      let imageCss = {}

      if (this.state.loaded) {
        if (this.state.width / this.state.height > this.state.imageWidth / this.state.imageHeight) {
          options.bgWidth = this.state.width
          options.bgHeight = Math.round(this.state.width / this.state.imageWidth * this.state.imageHeight)
        } else {
          options.bgHeight = this.state.height
          options.bgWidth = Math.round(this.state.height / this.state.imageHeight * this.state.imageWidth)
        }

        let difference = (options.bgHeight - this.state.height) / 2
        percentage = this.state.y / (this.state.height / 2)

        let maxPercentage = Math.min(1, percentage)
        let scale = 1 + 0.2 * maxPercentage

        options.y = 0 - difference * maxPercentage
        options.blur = snap(Math.min(20, maxPercentage * 2 * 20), 1)

        arrowCss.opacity = Math.max(0, 1 - percentage * 2)
        css.opacity = Math.max(0, 1 - percentage / 1.5)

        // if style === parallax
        //css.transform = 'translate3d(0, ' + (0 - this.state.y / 4) + 'px, 0px)'

        imageCss.width = options.bgWidth + 'px'
        imageCss.height = options.bgHeight + 'px'
        imageCss.top = (0 - difference) + 'px'
        imageCss.left = (0 - (options.bgWidth - this.state.width) / 2) + 'px'
        imageCss.transform = 'translate3d(0, ' + options.y + 'px, 0) scale(' + scale + ', ' + scale + ')'
      }

      css.width = this.state.width + 'px'
      css.height = this.state.height + 'px'

      imageCss.backgroundImage = 'url(' + path + ')'
      imageCss.backgroundSize = options.bgWidth + 'px ' + options.bgHeight + 'px'
      imageCss.WebkitFilter = 'blur(' + options.blur + 'px)'

      let className = classnames(
        this.state.loaded ? style.loaded : null,
        config.poster_vignette ? style.vignette : null,
        this.state.y > 50 ? style.scrolled : null,
        style.poster
      )

      let gradient = config.poster_gradient
        ? <div className={style.gradient} />
        : null

      return (
        <figure className={className} style={css}>
          <Title content={text} />
          <div className={style.image} style={imageCss}>
            <img src={path} onLoad={::this.getImageSize} />
          </div>
          <div className={style.arrow} style={arrowCss} onClick={::this.scrollToContent}>
            <img src={arrow} />
          </div>
          {gradient}
        </figure>
      )
    } else {
      return null
    }
  }
}

export default Poster
