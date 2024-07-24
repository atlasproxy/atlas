import type { JSX } from 'solid-js'

export default function SettingCard({ title, children }: { title: string; children: JSX.Element }) {
  return (
    <div class="flex w-80 flex-col items-center gap-4 rounded-box bg-base-200 p-4">
      <h1 class="text-2xl font-medium">{title}</h1>

      {children}
    </div>
  )
}
