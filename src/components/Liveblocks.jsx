import globals from '../globals.ts'
import { createClient } from '@liveblocks/client'

export default function Liveblocks ({ children }) {
  globals.client = createClient({ publicApiKey: import.meta.env.PUBLIC_LIVEBLOCKS_PUBLIC_KEY })
  //globals.room = client.enter('')

  console.log(test)

  return (
    <div>
      {children}
    </div>
  )
}
