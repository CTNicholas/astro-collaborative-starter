import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './subcomponents/SelfAndOthersClass'
import globals from './globals'
import './subcomponents/cursor-smooth'
import './subcomponents/cursor-quick'
import './subcomponents/cursor-perfect'

export const tagName = 'live-cursor'

@customElement(tagName)
export class LiveCursors extends SelfAndOthersClass {

  @property({ reflect: true })
  movement: 'smooth' | 'quick' | 'perfect' = 'smooth'

  @property({ reflect: true })
  selector: string

  @property()
  elem: HTMLElement

  connectedCallback () {
    super.connectedCallback()
    this.elem = this.selector ? document.querySelector(this.selector) : document.body
    this.elem.addEventListener('pointermove', event => this.updateCursor(event))
    this.elem.addEventListener('pointerleave', () => this.removeCursor())
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    if (this.elem) {
      this.elem.removeEventListener('pointermove', event => this.updateCursor(event))
      this.elem.removeEventListener('pointerleave', () => this.removeCursor())
    }
  }

  updateCursor (event) {
    if (!this.elem || !globals.room?.updatePresence) {
      return
    }

    // TODO percentage as well as pixels
    globals.room.updatePresence({
      cursor: {
        x: Math.round(event.clientX + this.elem.scrollLeft),
        y: Math.round(event.clientY + this.elem.scrollTop),
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
      z-index: 100000;
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
