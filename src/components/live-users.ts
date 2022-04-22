import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './utils/SelfAndOthersClass'
import './avatar-and-fallback'
import './user-line'

export const tagName = 'live-users'

@customElement(tagName)
class MyElement extends SelfAndOthersClass {
  @property({ reflect: true })
  size: string = '40'

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

    .user {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;
    }

    .user:last-of-type {
      margin-bottom: 0;
    }

    .user_info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding-left: 0.75em;
    }

    .user_status {
      font-size: 0.9em;
      opacity: 0.7;
      margin-top: 0.05em;
    }
  `

  render () {
    let self
    let others

    if (this.show === 'all' || this.show === 'self') {
      self = html`
        <user-line
          size=${this.size}
          name=${this.self.name + this['self-suffix']}
          color=${this.self.color}
          picture=${this.self.picture}
          status=${this.self.status}
        ></user-line>
      `
    }

    if (this.show === 'all' || this.show === 'others') {
      others = html`
        ${this.others.map(user => html`
          <user-line
            part="user"
            size=${this.size}
            name=${user.name}
            color=${user.color}
            picture=${user.picture}
            status=${user.status}
          ></user-line>
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
