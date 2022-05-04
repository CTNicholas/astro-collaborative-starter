import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './SelfAndOthersClass'
import './avatar-and-fallback'

export const tagName = 'user-line'

@customElement(tagName)
export class UserLine extends SelfAndOthersClass {
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
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 0.5em;
    }

    .user_info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding-left: 0.75em;
      overflow-x: hidden;
    }

    .user_name, .user_status {
      width: 100%;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .user_status {
      font-size: 0.9em;
      opacity: 0.7;
      margin-top: 0.05em;
    }
  `

  render () {
    if (!this.name) {
      return null
    }

    return html`
      <div part="user" class="user">
        <avatar-and-fallback
          exportparts="avatar, avatar_picture_wrapper, avatar_picture, avatar_fallback"
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
