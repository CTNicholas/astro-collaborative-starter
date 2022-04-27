import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './utils/SelfAndOthersClass'
import globals from '../globals'
import './cursor-smooth'
import './cursor-quick'
import './cursor-perfect'

export const tagName = 'live-cursors'

@customElement(tagName)
class MyElement extends SelfAndOthersClass {

  @property({ reflect: true })
  movement: 'smooth' | 'quick' | 'perfect' = 'smooth'

  @property({ reflect: true })
  selector: string = 'html'

  @property()
  element: HTMLElement

  connectedCallback () {
    super.connectedCallback()
    this.element = document.querySelector(this.selector)
    this.element.addEventListener('pointermove', this.updateCursor)
    this.element.addEventListener('pointerleave', this.removeCursor)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    if (this.element) {
      this.element.removeEventListener('pointermove', this.updateCursor)
      this.element.removeEventListener('pointerleave', this.removeCursor)
    }
  }

  updateCursor (event) {
    globals.room.updatePresence({
      cursor: {
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      },
    })
  }

  removeCursor () {
    globals.room.updatePresence({
      cursor: null,
    })
  }

  static styles = css`
    .cursors {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;
    }
  `

  render () {
    return html`
      <slot></slot>
      <div part="cursors" class="cursors">
        ${this.others.map(user => {
          if (!user?.cursor?.x || !user?.cursor?.y) {
            return null
          }
          
          if (this.movement === 'quick') {
            return html`
              <cursor-quick
                color=${user.color}
                x=${user.cursor.x} 
                y=${user.cursor.y}
              ></cursor-quick>
            `
          }

          if (this.movement === 'perfect') {
            return html`
              <cursor-perfect
                color=${user.color}
                x=${user.cursor.x} 
                y=${user.cursor.y}
              ></cursor-perfect>
            `
          }
          
          return html`
            <cursor-smooth
              color=${user.color}
              x=${user.cursor.x} 
              y=${user.cursor.y}
            ></cursor-smooth>
          `
        })}
      </div>
    `
  }
}
