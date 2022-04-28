import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { PerfectCursor } from 'perfect-cursors'
import './cursor-quick'

export const tagName = 'cursor-perfect'

@customElement(tagName)
class MyElement extends LitElement {

  @property({ reflect: true })
  color: string = '#000'

  @property({ type: Number, reflect: true })
  x: number = 0

  @property({ type: Number, reflect: true })
  y: number = 0

  @property()
  localCoords = { x: 0, y: 0 }

  pc = new PerfectCursor(([x, y]) => this.localCoords = { x, y })

  protected update (changedProperties: PropertyValues) {
    super.update(changedProperties)
    const x = changedProperties.get('x')
    const y = changedProperties.get('y')
    if (x !== undefined || y !== undefined) {
      this.pc.addPoint([
        x || this.x,
        y || this.y
      ])
    }
  }

  render () {
    return html`
      <cursor-quick
        x=${this.localCoords.x}
        y=${this.localCoords.y}
        color=${this.color}
      ></cursor-quick>
    `
  }
}
