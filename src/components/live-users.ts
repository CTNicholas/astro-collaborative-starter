import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './utils/SelfAndOthersClass'
import './avatar-and-fallback'

export const tagName = 'live-users'

@customElement(tagName)
class MyElement extends SelfAndOthersClass {
  @property({ reflect: true })
  size: number = 40

  @property({ reflect: true })
  show: 'all' | 'self' | 'others' = 'all'

  @property({ reflect: true })
  'self-suffix': string = ' (you)'

  static styles = css`
    .main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      user-select: none;
    }

    .users {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-left: 0.5rem;
    }
    
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;
    }
    
    .user:last-of-type {
      margin-bottom: 0;
    }
    
    .user_name {
      flex-grow: 1;
      padding-left: 0.75em;
    }
  `

  render () {
    let self
    let others

    if (this.show === 'all' || this.show === 'self') {
      self = html`
        <div part="user" class="user">
          <avatar-and-fallback
            size=${this.size}
            name=${this.self.name}
            color=${this.self.color}
            picture=${this.self.picture}
          ></avatar-and-fallback>
          <div part="name self" class="user_name">
            ${this.self.name}${this['self-suffix']}
          </div>
        </div>
      `
    }

    if (this.show === 'all' || this.show === 'others') {
      others = html`
        ${this.others.map(user => html`
          <div part="user" class="user">
            <avatar-and-fallback
              size=${this.size}
              name=${user.name}
              color=${user.color}
              picture=${user.picture}
            ></avatar-and-fallback>
            <div part="name" class="user_name">
              ${user.name}
            </div>
          </div>
        `)}
      `
    }

    return html`
      <div part="users" class="users">
        ${self || null}
        ${others || null}
      </div>
    `
  }
}
