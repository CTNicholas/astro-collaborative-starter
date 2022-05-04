import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './subcomponents/SelfAndOthersClass'
import './subcomponents/avatar-and-fallback'
import './subcomponents/user-line'
import type { UserShow } from './types'

export const tagName = 'live-users'

@customElement(tagName)
export class LiveUsers extends SelfAndOthersClass {
  @property({ reflect: true })
  size: string = '40'

  @property({ reflect: true })
  show: UserShow = 'all'

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

    .user_line_user:last-of-type {
      margin-bottom: 0;
    }
  `

  render () {
    if (!this.self?.name) {
      // Causes hydration value mismatch, but necessary
      return null
    }

    let self
    let others

    if (this.show === 'all' || this.show === 'self') {
      self = html`
        <user-line
          exportparts="user, name, status, avatar, avatar_picture_wrapper, avatar_picture, avatar_fallback"
          class="user_line_user"
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
            exportparts="user, name, status, avatar, avatar_picture_wrapper, avatar_picture, avatar_fallback"
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
