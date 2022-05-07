import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { spring } from '../utils/spring'
import './cursor-quick'

export const tagName = 'cursor-smooth'

const springSettings = {
  stiffness: 200,
  damping: 20,
  precision: 100,
}

@customElement(tagName)
export class CursorSmooth extends LitElement {
  @property({ reflect: true })
  color: string = '#000'

  @property({ type: Number, reflect: true })
  x: number

  @property({ type: Number, reflect: true })
  y: number

  @property({ reflect: true })
  name: string

  @property()
  localCoords = { x: 0, y: 0 }

  springs = { x: spring(0, springSettings), y: spring(0, springSettings) }

  constructor () {
    super()
      this.springs.x.onUpdate(x => {
        if (x) {
          this.localCoords.x = x
        }
      })
      this.springs.y.onUpdate(y => {
        if (y) {
          this.localCoords.y = y
        }
      })
  }

  protected update (changedProperties: PropertyValues) {
    super.update(changedProperties)
    const x = changedProperties.get('x')
    const y = changedProperties.get('y')
    if (x && y) {
      this.springs.x.transitionTo(x || this.x)
      this.springs.y.transitionTo(y || this.y)
    }
  }

  render () {
    return html`
      <cursor-quick
        exportparts="cursor, cursor_svg, cursor_name"
        x=${this.localCoords.x}
        y=${this.localCoords.y}
        color=${this.color}
        name=${this.name}
        transition=${false}
      ></cursor-quick>
    `
  }
}
