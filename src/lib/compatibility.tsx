import store from 'store2'
import { showModal } from '../components/modal'

export const compatibility = {
  doesntWork: ['instagram.com', 'play.geforcenow.com'],
  epoxy: [],
  libcurl: ['neal.fun']
}

export function handleCompatibility(url: URL, reload: () => void) {
  store.set('showUnworkingSites', true, false)
  store.set('transportSuggestions', true, false)
  const transport = store('transport')
  if (compatibility.doesntWork.some((host) => url.hostname.includes(host)) && store('showUnworkingSites')) {
    showModal(
      'Compatibility Warning',
      'This site is known not to work on Atlas due to proxy functionality.',
      <>
        <button
          class="btn bg-base-300"
          onClick={() => {
            store('showUnworkingSites', false)
          }}
        >
          Do not show again
        </button>
        <button class="btn bg-base-300">Close</button>
      </>
    )
  }

  if (compatibility.epoxy.some((host) => url.hostname.includes(host)) && transport !== '/epoxy/index.mjs') {
    showModal(
      'Compatibility Warning',
      'This site is may function better by switching to the Libcurl transport.',
      <>
        <button
          class="btn bg-base-300"
          onClick={() => {
            store('transport', '/epoxy/index.mjs')
            reload()
          }}
        >
          Switch to Epoxy
        </button>
        <button
          class="btn bg-base-300"
          onClick={() => {
            store('transportSuggestion', false)
          }}
        >
          Do not show again
        </button>
        <button class="btn bg-base-300">Close</button>
      </>
    )
  }

  if (compatibility.libcurl.some((host) => url.hostname.includes(host)) && transport !== '/libcurl/index.mjs') {
    showModal(
      'Compatibility Warning',
      'This site is may function better by switching to the Libcurl transport.',
      <>
        <button
          class="btn bg-base-300"
          onClick={() => {
            store('transport', '/libcurl/index.mjs')
            reload()
          }}
        >
          Switch to Libcurl
        </button>
        <button
          class="btn bg-base-300"
          onClick={() => {
            store('transportSuggestion', false)
          }}
        >
          Do not show again
        </button>
        <button class="btn bg-base-300">Close</button>
      </>
    )
  }

  return true
}
