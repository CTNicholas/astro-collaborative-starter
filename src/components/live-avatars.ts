import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './utils/SelfAndOthersClass'
import './avatar-and-fallback'

export const tagName = 'live-avatars'

@customElement(tagName)
class MyElement extends SelfAndOthersClass {
  @property({ reflect: true })
  size: string = '40'

  @property({ reflect: true })
  show: 'all' | 'self' | 'others' = 'all'

  static styles = css`
    .main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      user-select: none;
    }

    .avatars {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      padding-left: 0.75rem;
    }

    .current_user_container {
      position: relative;
      margin-left: 2rem;
    }

    .more {
      border-width: 4px;
      border-radius: 9999px;
      border-color: white;
      background-color: #9ca3af;
      min-width: 56px;
      width: 56px;
      height: 56px;
      margin-left: -0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
  `

  render () {
    let self
    let others

    if (this.show === 'all' || this.show === 'self') {
      self = html`
        <avatar-and-fallback
          size=${this.size}
          name=${this.self.name}
          color=${this.self.color}
          picture=${this.self.picture}
        ></avatar-and-fallback>
      `
    }

    if (this.show === 'all' || this.show === 'others') {
      others = html`
        ${this.others.map(user => html`
          <avatar-and-fallback
            size=${this.size}
            name=${user.name}
            color=${user.color}
            picture=${user.picture}
          ></avatar-and-fallback>
        `).reverse()}
      `
    }

    return html`
      <div class="avatars">
        ${others || null}
        ${self || null}
      </div>
    `
  }
}
