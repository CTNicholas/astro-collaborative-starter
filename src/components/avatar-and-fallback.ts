import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SelfAndOthersClass } from './utils/SelfAndOthersClass'
import { contrastingTextColor } from './utils/contrastingTextColor'

export const tagName = 'avatar-and-fallback'

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

  @property({ type: Boolean, reflect: true })
  tooltip: boolean = true

  static styles = css`
    .avatar {
      border-radius: 9999px;
      position: relative;
      box-shadow: 2px 0 0 #fff;
      margin-left: -6px;
      user-select: none;
    }

    .avatar::before {
      content: attr(data-tooltip);
      position: absolute;
      opacity: 0;
      transition: all 0.15s ease;
      padding: 5px 10px;
      color: white;
      font-size: 0.75em;
      border-radius: 8px;
      z-index: 1;
      background: black;
      white-space: nowrap;
      top: 50%;
      left: calc(100% + 0.5em);
      transform: translateY(-50%);
      pointer-events: none;
    }

    .avatar:hover::before {
      opacity: 1;
    }
    
    .avatar_picture {
      min-width: 100%;
      min-height: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
      border-radius: 9999px;
    }
    
    .avatar_fallback {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      border-radius: 9999px;
    }
  `

  render () {
    return html`
      <div part="avatar" class="avatar" data-tooltip=${this.name}>
        <div
          part="avatar_picture_wrapper"
          class="avatar_picture_wrapper"
          style="width: ${this.size}px; height: ${this.size}px;"
        >
          ${this.picture ? html`
            <img
              part="avatar_picture"
              class="avatar_picture"
              alt=${this.name}
              src=${this.picture}
              height=${this.size}
              width=${this.size}
            />
          ` : html`
                <div 
                  part="avatar_fallback"
                  class="avatar_fallback"
                  style="background: ${this.color}; color: ${contrastingTextColor(this.color) ? 'black' : 'white'};">
                  ${this.name.charAt(0)}
                </div>
              `}
        </div>
      </div>
    `
  }
}
