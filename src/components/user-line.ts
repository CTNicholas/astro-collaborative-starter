import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './utils/SelfAndOthersClass'
import './avatar-and-fallback'

export const tagName = 'user-line'

@customElement(tagName)
class MyElement extends SelfAndOthersClass {
  @property({ reflect: true })
  size: number = 40

  @property({ reflect: true })
  name: string

  @property({ reflect: true })
  color: string

  @property({ reflect: true })
  picture?: string

  @property({ reflect: true })
  status?: string

  @property({ type: Boolean, reflect: true })
  tooltip: boolean = true

  static styles = css`
    
  `

  protected createRenderRoot (): Element | ShadowRoot {
    return this
  }

  render () {
    return html`
      <div part="user" class="user">
        <avatar-and-fallback
          size=${this.size}
          name=${this.name}
          color=${this.color}
          picture=${this.picture}
        ></avatar-and-fallback>
        <div part="info" class="user_info">
          <div part="name" class="user_name">
            ${this.name}
          </div>
          ${this.status ? html`
            <div part="status" class="user_status">
              ${this.status}
            </div>
          ` : null}
        </div>
      </div>
    `
  }
}
