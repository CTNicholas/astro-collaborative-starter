import { html, css, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { PerfectCursor } from 'perfect-cursors'

export const tagName = 'cursor-smooth'

@customElement(tagName)
class MyElement extends LitElement {

  @property({ reflect: true })
  color: string = '#000'

  @property({ reflect: true })
  x: number = 0

  @property({ reflect: true })
  y: number = 0

  @property()
  localCoords = { x: 0, y: 0 }

  pc = new PerfectCursor(([x, y]) => this.localCoords = { x, y })

  static styles = css`
    .cursor {
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.5s cubic-bezier(.17, .93, .38, 1);
    }
  `

  protected update (changedProperties: PropertyValues) {
    super.update(changedProperties)
    const x = changedProperties.get('x')
    const y = changedProperties.get('y')
    if (x !== undefined || y !== undefined) {
      this.pc.addPoint([x || this.x, y || this.y])
    }
  }

  render () {
    return html`
      <div class="cursor" style=${styleMap({
        transform: `translateX(${this.localCoords.x}px) translateY(${this.localCoords.y}px)`
      })}>
         <svg style="transform: scale(0.86) translate(-18px, -16px); transform-origin: top left;">
           <path 
             fill=${this.color} 
             d="M8.482,0l8.482,20.36L8.322,17.412,0,20.36Z" 
             transform="translate(11 22.57) rotate(-35)" 
           />
         </svg>
      </div>
    `
  }
}
