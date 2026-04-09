/* src/utils/device.js */
// ═══════════════════════════════════════
//  Device — detection utilities
// ═══════════════════════════════════════

export const isMobile  = () => window.innerWidth <= 768
export const isTablet  = () => window.innerWidth > 768 && window.innerWidth <= 1024
export const isDesktop = () => window.innerWidth > 1024

export const isTouchDevice = () => (
  'ontouchstart' in window || navigator.maxTouchPoints > 0
)

export const getOS = () => {
  const ua = navigator.userAgent
  if (/android/i.test(ua))               return 'android'
  if (/iPad|iPhone|iPod/.test(ua))       return 'ios'
  if (/Win/.test(navigator.platform))    return 'windows'
  if (/Mac/.test(navigator.platform))    return 'macos'
  return 'unknown'
}

// Listen for resize and call callback
export function onResize(callback) {
  let timeout
  window.addEventListener('resize', () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, 150)
  })
}