import globals from '../../globals'

// Do not: whenRoomReady(func)
//     Do: whenRoomReady(() => func())
export const whenRoomReady = func => {
  if (globals.room) {
    func()
  } else {
    window.addEventListener('liveblocksRoomConnected', () => {
      func()
    })
  }
}
