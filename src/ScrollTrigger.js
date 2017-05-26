/**
 * ScrollTrigger
 * Made by @esr360
 * Made better by @jahans3
 * http://github.com/esr360/ScrollTrigger
 */
class ScrollTrigger {
  elReveal = document.querySelectorAll('[data-trigger]')
  elReverseReveal = document.querySelectorAll('[data-trigger-reverse]')
  elHover = document.querySelectorAll('[data-hover]')
  elActive = document.querySelectorAll('.inactive')

  static visible ({ element, position = 'top' }) {
    const scrolled = window.scrollY + window.innerHeight
    const client = element.getBoundingClientRect()

    switch (position) {
      case 'top':
        return element.offsetTop < scrolled
      case 'middle':
        return (element.offsetTop + client.width / 2) < scrolled
      case 'bottom':
        return (element.offsetTop + client.height) < scrolled
    }
  }

  static mapReveal = element => {
    const styles = element.trigger
    const handler = () => {
      if (ScrollTrigger.visible({ element, position: 'middle' })) {
        element.style = styles
      }
    }

    window.addEventListener('scroll', handler)
    window.addEventListener('load', handler)
  }

  static mapReverseReveal = element => {
    const styles = element['trigger-reverse']
    const cachedStyles = element.style
    const handler = () => {
      if (ScrollTrigger.visible({ element })) {
        element.style = cachedStyles
      }
    }

    element.style = styles
    window.addEventListener('load', handler)
    window.addEventListener('scroll', handler)
  }

  static mapHover = element => {
    const styles = element.hover
    const cachedStyles = element.style || {}
    const enterHandler = () => {
      element.style = { ...cachedStyles, ...styles }
    }
    const leaveHandler = () => {
      element.style = cachedStyles
    }
    window.addEventListener('mouseenter', enterHandler)
    window.addEventListener('mouseleave', leaveHandler)
  }

  static mapActive = element => {
    if (ScrollTrigger.visible({ element, position: 'bottom' })) {
      element.classList.remove('inactive')
      element.classList.add('active')
    }
  }

  trigger () {
    this.elReveal.map(ScrollTrigger.mapReveal)
    this.elReverseReveal.map(ScrollTrigger.mapReverseReveal)
    this.elHover.map(ScrollTrigger.mapHover)
    this.elActive.map(ScrollTrigger.mapActive)
  }
}

new ScrollTrigger()
