import { createEffect, createSignal, onCleanup, onMount, type JSX } from 'solid-js'

const [title, setTitle] = createSignal('')
const [content, setContent] = createSignal('')
const [modalOpen, setModalStatus] = createSignal(false)
const [actions, setActions] = createSignal<JSX.Element>()

export default function Dialog() {
  let ref: HTMLDialogElement
  const abort = new AbortController()
  onMount(() => {
    window.addEventListener(
      'atlas:showModal',
      (e: CustomEvent) => {
        setTitle(e.detail.title)
        setContent(e.detail.content)
        setActions(e.detail.actions)
        ref.showModal()
      },
      {
        signal: abort.signal
      }
    )
  })

  onCleanup(() => {
    abort.abort()
  })

  return (
    <dialog ref={ref!} class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{title()}</h3>
        <p class="py-4">{content()}</p>
        <div class="modal-action">
          <form method="dialog" class="space-x-4">
            {actions()}
          </form>
        </div>
      </div>
    </dialog>
  )
}

export function showModal(title: string, content: string, actions: JSX.Element) {
  window.dispatchEvent(
    new CustomEvent('atlas:showModal', {
      detail: {
        title,
        content,
        actions
      }
    })
  )
}
