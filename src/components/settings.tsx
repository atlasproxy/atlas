import toast from 'solid-toast'
import Setting from './settingcard'
import { createEffect, createSignal, onMount } from 'solid-js'
import store from 'store2'
import { clearRegistrations, registerSW } from '../lib/sw'
import { cloaks, handleCloak } from '../lib/cloak'

export default function Settings() {
  const [cloak, setCloak] = createSignal<string>('')
  const [panicKey, setPanicKey] = createSignal<string>('')
  const [transport, setTransport] = createSignal<string>('')
  const [wispServer, setWispServer] = createSignal<string>('')

  onMount(() => {
    if (store('cloak')) setCloak(store('cloak'))
    if (store('panicKey')) setPanicKey(store('panicKey'))
    if (store('transport')) setTransport(store('transport'))
    if (store('wispServer')) setWispServer(store('wispServer'))
  })

  async function save() {
    store('cloak', cloak())
    store('panicKey', panicKey())
    store('transport', transport())
    store('wispServer', wispServer())

    await clearRegistrations()
    await registerSW()
    handleCloak(cloak() as keyof typeof cloaks)

    toast.success('Settings saved', {
      style: {
        background: '#1f2937',
        color: '#f3f4f6'
      },
      iconTheme: {
        primary: '#38bdf8',
        secondary: '#1f2937'
      }
    })
  }

  return (
    <div class="flex flex-col items-center pt-20">
      <div class="box-border flex flex-wrap justify-center gap-6 p-8">
        <Setting title="Cloak">
          <select class="select w-full max-w-xs" value={cloak()} onChange={(e) => setCloak(e.currentTarget.value)}>
            <option value="none">None</option>
            <option value="google">Google</option>
            <option value="classroom">Google Classroom</option>
            <option value="drive">Google Drive</option>
            <option value="desmos">Desmos</option>
          </select>
        </Setting>
        <Setting title="Panic Key">
          <input type="text" class="input w-full" value={panicKey()} onInput={(e) => setPanicKey(e.currentTarget.value)} />
        </Setting>

        <Setting title="Transport">
          <select class="select w-full max-w-xs" value={transport()} onChange={(e) => setTransport(e.currentTarget.value)}>
            <option value="/epoxy/index.mjs">Epoxy</option>
            <option value="/libcurl/index.mjs">Libcurl</option>
          </select>
        </Setting>

        <Setting title="Wisp Server">
          <input type="text" value={wispServer()} class="input w-full" onInput={(e) => setWispServer(e.target.value)} />
        </Setting>
      </div>

      <button class="btn btn-primary font-semibold w-48" onClick={save}>
        Save
      </button>
    </div>
  )
}
