import toast from 'solid-toast'
import Setting from './settingcard'
import { createEffect, createSignal, onMount } from 'solid-js'
import store from 'store2'
import { clearRegistrations, registerSW } from '../lib/sw'
import { cloaks, handleCloak } from '../lib/cloak'

export default function Settings() {
  const [cloak, setCloak] = createSignal<string>('')
  const [theme, setTheme] = createSignal<string>('')
  const [abortKey, setAbortKey] = createSignal<string>('')
  const [transport, setTransport] = createSignal<string>('')
  const [wispServer, setWispServer] = createSignal<string>('')

  onMount(() => {
    if (store('cloak')) setCloak(store('cloak'))
    if (store('abortKey')) setAbortKey(store('abortKey'))
    if (store('transport')) setTransport(store('transport'))
    if (store('wispServer')) setWispServer(store('wispServer'))
    if (store('theme')) setTheme(store('theme'))
  })

  async function save() {
    store('cloak', cloak())
    store('theme', theme())
    store('abortKey', abortKey())
    store('transport', transport())
    store('wispServer', wispServer())

    await clearRegistrations()
    await registerSW()
    handleCloak(cloak() as keyof typeof cloaks)

    document.documentElement.dataset.theme = theme()

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

        <Setting title="Theme">
          <select class="select w-full max-w-xs" value={theme()} onChange={(e) => setTheme(e.currentTarget.value)}>
            <option value="atlas">Default</option>
            <option value="light">Light</option>
            <option value="aqua">Aqua</option>
            <option value="pastel">Pastel</option>
            <option value="dim">Dim</option>
            <option value="sunset">Sunset</option>
          </select>
        </Setting>

        <Setting title="Abort Key">
          <input type="text" class="input w-full" value={abortKey()} onInput={(e) => setAbortKey(e.currentTarget.value)} />
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
