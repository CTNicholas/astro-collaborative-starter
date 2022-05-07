import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { contrastingTextColor } from '../utils/contrastingTextColor'

export const tagName = 'cursor-quick'

@customElement(tagName)
export class CursorQuick extends LitElement {
  @property({ reflect: true })
  color: string = '#000'

  @property({ type: Number, reflect: true })
  x: number = 0

  @property({ type: Number, reflect: true })
  y: number = 0

  @property({ reflect: true })
  name: string

  static styles = css`
    .cursor {
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.5s cubic-bezier(.17, .93, .38, 1);
    }
    
    .cursor_name {
      border-radius: 9999px;
      position: absolute;
      top: 18px;
      left: 7px;
      padding: 5px 12px;
      font-size: 0.9em;
    }
  `

  render () {
    if (this.y === 0 || this.x === 0) {
      return null
    }

    return html`
      <div class="cursor" part="cursor" style=${styleMap({
        transform: `translateX(${this.x}px) translateY(${this.y}px)`
      })}>
         <svg part="cursor_svg" style="transform: scale(1) translate(-18px, -16px); transform-origin: top left;">
           <path 
             stroke="white"
             stroke-width="2"
             fill=${this.color} 
             d="M8.482,0l8.482,20.36L8.322,17.412,0,20.36Z" 
             transform="translate(11 22.57) rotate(-35)" 
           />
         </svg>
        
        ${this.name ? html`
          <div class="cursor_name" part="cursor_name" style=${styleMap({
            background: this.color,
            color: contrastingTextColor(this.color) ? 'black' : 'white'
          })}>
            ${this.name}
          </div>
        ` : null}
        
      </div>
    `
  }
}
