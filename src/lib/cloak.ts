export const cloaks = {
  none: {
    title: 'Atlas',
    icon: '/favicon.svg'
  },
  google: {
    title: 'Google',
    icon: 'https://google.com/favicon.ico'
  },
  classroom: {
    title: 'Home',
    icon: 'https://www.gstatic.com/classroom/ic_product_classroom_32.png'
  },
  drive: {
    title: 'My Drive',
    icon: 'https://ssl.gstatic.com/images/branding/product/2x/hh_drive_96dp.png'
  },
  desmos: {
    title: 'Desmos | Graphing Calculator',
    icon: 'https://www.desmos.com/assets/img/apps/graphing/favicon.ico'
  }
}

export function handleCloak(cloak: keyof typeof cloaks) {
  document.title = cloaks[cloak].title
  ;(document.querySelector("link[rel='shortcut icon']") as HTMLLinkElement).href = cloaks[cloak].icon
}
