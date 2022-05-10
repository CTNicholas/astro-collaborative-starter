import globals from '../globals'

// Do not: whenRoomReady(func)
//     Do: whenRoomReady(() => func())
export const whenRoomReady = func => {
  if (globals.room?.id) {
    func()
  } else {
    window.addEventListener('liveblocksRoomConnected', () => {
      func()
    })
  }
}
