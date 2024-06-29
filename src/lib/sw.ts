// @ts-ignore
import { SetTransport } from '@mercuryworkshop/bare-mux'
export async function clearRegistrations() {
  if (!('serviceWorker' in navigator)) return

  const registrations = await navigator.serviceWorker.getRegistrations()

  for await (let registration of registrations) {
    await registration.unregister()
  }
}

// please stop changing this
export const defaultWispUrl = `${window.location.protocol == 'https:' ? 'wss' : 'ws'}://${window.location.host}/wisp/`

export async function registerSW() {
  if (!('serviceWorker' in navigator)) return

  const registration = await navigator.serviceWorker.register('/sw.js')
  await registration.update()

  SetTransport('CurlMod.LibcurlClient', { wisp: defaultWispUrl })
  console.log('Service worker registered')
}
