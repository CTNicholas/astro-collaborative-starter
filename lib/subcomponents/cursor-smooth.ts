import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { animate, spring } from 'motion'
import './cursor-quick'

export const tagName = 'cursor-smooth'

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

  @query('cursor-quick')
  cursor: HTMLElement

  protected update (changedProperties: PropertyValues) {
    super.update(changedProperties)

    if (!this.cursor) {
      return
    }

    const x = changedProperties.get('x')
    const y = changedProperties.get('y')
    if (x !== undefined || y !== undefined) {
      const coords = {
        x: x || this.x,
        y: y || this.y
      }
      if (this.cursor.style.transform !== 'translateX(var(--motion-translateX)) translateY(var(--motion-translateY))') {
        animate(this.cursor, coords, { duration: 0 })
      } else {
        animate(this.cursor, coords, {
          easing: spring({
            stiffness: 300,
            damping: 30,
            mass: 0.7
          })
        })
      }
      this.cursor.style.opacity = '1'
    } else {
      this.cursor.style.opacity = '0'
    }
  }

  render () {
    return html`
      <cursor-quick
        exportparts="cursor, cursor_svg, cursor_name"
        style=${styleMap({
          position: 'absolute',
          opacity: '0'
        })}
        x=${1}
        y=${1}
        color=${this.color}
        name=${this.name}
        transition=${false}
      ></cursor-quick>
    `
  }
}
