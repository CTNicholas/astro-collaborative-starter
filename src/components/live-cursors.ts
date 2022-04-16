import { html, css } from 'lit'
import { customElement, queryAsync } from 'lit/decorators.js'
import { SelfAndOthers } from './utils/SelfAndOthers'
import globals from '../globals'
import './live-cursor'

export const tagName = 'live-cursors'

@customElement(tagName)
class MyElement extends SelfAndOthers {

  static styles = css`
    .cursors {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `

  @queryAsync('.cursors')
  cursorWrapper

  connectedCallback () {
    super.connectedCallback()

    this.cursorWrapper.then((cursorWrapper) => {
      cursorWrapper.addEventListener('pointermove', this.updateCursor)
      cursorWrapper.addEventListener('pointerleave', this.removeCursor)
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    if (this.cursorWrapper) {
      this.cursorWrapper.removeEventListener('pointermove', this.updateCursor)
      this.cursorWrapper.removeEventListener('pointerleave', this.removeCursor)
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

  render () {
    return html`
      <slot></slot>
      <div class="cursors">
        ${this.others.map(user => {
          if (!user.cursor) {
            return null
          }
          
          return html`
            <live-cursor x=${user?.cursor?.x} y=${user?.cursor?.y}></live-cursor>
          `
        })}
      </div>
    `
  }
}
