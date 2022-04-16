import { html, css, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js';
import { PerfectCursor } from 'perfect-cursors'

export const tagName = 'live-cursor'

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
        <svg
          width="24"
          height="36"
          viewBox="0 0 24 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            fill=${this.color}
          />
        </svg>
      </div>
    `
  }
}
