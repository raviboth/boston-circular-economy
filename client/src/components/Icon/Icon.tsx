// Boston.gov Fleet pattern library icon subset for the Boston Circular Economy project.
// SVG icons sourced from assets.boston.gov/icons/circle_icons/ and adapted for React:
// fills and strokes replaced with currentColor, JSX attributes normalized.
// Source: https://github.com/CityOfBoston/patterns (City of Boston)

import type { ReactNode } from 'react'

export type IconName =
  | 'alert'
  | 'book'
  | 'building'
  | 'call'
  | 'cart'
  | 'clock'
  | 'community_centers'
  | 'food'
  | 'garden'
  | 'info'
  | 'location'
  | 'mail'
  | 'search'
  | 'trash_and_recycling'

const icons: Record<IconName, ReactNode> = {
  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/alert.svg
  alert: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M37,47.44a4,4,0,0,1-4.13,4.13,4.11,4.11,0,0,1,0-8.22A3.94,3.94,0,0,1,37,47.44Zm-1.42-8.08H30.45L29,25.67V16.91h8.07v8.76Z"
        fill="currentColor"
      />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/book.svg
  book: (
    <>
      <path
        d="M33,65.92A32.92,32.92,0,1,1,65.92,33,33,33,0,0,1,33,65.92ZM33,3.08A29.92,29.92,0,1,0,62.92,33,30,30,0,0,0,33,3.08Z"
        fill="currentColor"
      />
      <path
        d="M44.57,52.76,20.5,51.46l-.9-33.27,4.55-3.66H48.4V45.31ZM22.71,49.3l20.51,1.11,2.91-5.65V16.81H25L21.9,19.25Z"
        fill="currentColor"
      />
      <rect x="20.75" y="19.47" width="22.71" height="31.8" fill="white" />
      <path d="M44.6,52.4h-25V18.33h25ZM21.89,50.13H42.33V20.6H21.89Z" fill="currentColor" />
      <path d="M40.49,32.45H24.06v-9H40.49ZM26.34,30.17H38.21V25.72H26.34Z" fill="currentColor" />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/building.svg
  building: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <polygon
        points="40.34 31.83 40.34 20.16 28.36 20.16 28.36 18.16 24.36 18.16 24.36 20.16 21.09 20.16 21.09 49.16 29.46 49.16 40.34 49.16 48.71 49.16 48.71 31.83 40.34 31.83"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <rect x="24.36" y="41.91" width="4" height="4" fill="currentColor" />
      <rect x="33.24" y="41.91" width="4" height="4" fill="currentColor" />
      <rect x="42.11" y="41.91" width="4" height="4" fill="currentColor" />
      <rect x="24.36" y="35.87" width="4" height="4" fill="currentColor" />
      <rect x="33.24" y="35.87" width="4" height="4" fill="currentColor" />
      <rect x="42.11" y="35.87" width="4" height="4" fill="currentColor" />
      <rect x="24.36" y="29.83" width="4" height="4" fill="currentColor" />
      <rect x="33.24" y="29.83" width="4" height="4" fill="currentColor" />
      <rect x="24.36" y="23.79" width="4" height="4" fill="currentColor" />
      <rect x="33.24" y="23.79" width="4" height="4" fill="currentColor" />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/call.svg
  call: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <polygon
        points="13.02 43.77 20.75 36.04 28.26 38.83 39.84 27.25 37 19.79 44.56 12.23 51 18.66 46.45 30.42 31.43 45.44 18.39 49.13 13.02 43.77"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M25.25,48.58s-1.55,6.6,2.85,7.13,10.79,0,10.79,7.15"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </>
  ),

  // Crafted in Boston.gov Fleet circle icon style — shopping cart
  cart: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M13,20h5l6,19h19l5.5-13H22"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <circle cx="28" cy="44" r="3" fill="currentColor" />
      <circle cx="41" cy="44" r="3" fill="currentColor" />
    </>
  ),

  // Crafted in Boston.gov Fleet circle icon style — clock/time
  // Inner clock hands adapted from assets.boston.gov/icons/icon-time.svg
  clock: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <circle cx="33" cy="33" r="16" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M33 19.2v19.74l10.82 7.86"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/community_centers.svg
  community_centers: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M22.41,47h2.28v-.16c0-.1,0-.2,0-.3V30.78l.63-.05v.14l0,.3a5.52,5.52,0,0,1,.05.71c0,1.41,0,2.81,0,4.22h1.51c.06-1.77.07-3.67,0-5.81a2.62,2.62,0,0,0-2.69-2.66l-1.88,0h-2.1a2.61,2.61,0,0,0-2.93,2.85c0,1.5,0,3,0,4.48,0,.42,0,.84,0,1.26h1.6V31.69a3.68,3.68,0,0,1,.07-.58c0-.09,0-.18.05-.26l0-.13.58.07V46.54c0,.11,0,.22,0,.34a.76.76,0,0,0,0,.15H21.8v-.38c0-1.42,0-2.84,0-4.27V38.91c0-.25,0-.5,0-.74l0-.33V37.7l.54,0v3.36c0,1.83,0,3.65,0,5.47,0,.1,0,.2,0,.31Z"
        fill="currentColor"
      />
      <circle cx="22.13" cy="24.81" r="2.02" fill="currentColor" />
      <path
        d="M33.33,47h2.28v-.16c0-.1,0-.2,0-.3,0-2.76,0-13.1,0-14.48V30.78l.62-.05,0,.14c0,.1,0,.2,0,.3a5.52,5.52,0,0,1,.05.71c0,1.41,0,2.81,0,4.22h1.51c.07-1.77.07-3.67,0-5.81a2.62,2.62,0,0,0-2.69-2.66l-1.88,0h-2.1a2.61,2.61,0,0,0-2.93,2.85c0,1.5,0,3,0,4.48,0,.42,0,.84,0,1.26h1.6V31.69a2.8,2.8,0,0,1,.08-.58c0-.09,0-.18,0-.26l0-.13.58.07V46.54c0,.11,0,.22,0,.34a.76.76,0,0,0,0,.15h2.18v-.38c0-1.42,0-2.84,0-4.27V38.91c0-.25,0-.5,0-.74l0-.33V37.7l.54,0v3.36c0,1.83,0,3.65,0,5.47,0,.1,0,.2,0,.31Z"
        fill="currentColor"
      />
      <circle cx="33.05" cy="24.81" r="2.02" fill="currentColor" />
      <path
        d="M44.25,47h2.28v-.16c0-.1,0-.2,0-.3,0-2.76,0-13.1,0-14.48V30.78l.62-.05,0,.14c0,.1,0,.2,0,.3a5.52,5.52,0,0,1,0,.71c0,1.41,0,2.81,0,4.22h1.51c.07-1.77.07-3.67,0-5.81a2.62,2.62,0,0,0-2.69-2.66l-1.88,0H42.1a2.61,2.61,0,0,0-2.93,2.85c0,1.5,0,3,0,4.48,0,.42,0,.84,0,1.26h1.6V31.69a3.68,3.68,0,0,1,.08-.58c0-.09,0-.18,0-.26l0-.13.58.07V46.54c0,.11,0,.22,0,.34a.76.76,0,0,0,0,.15h2.18v-.38c0-1.42,0-2.84,0-4.27V38.91c0-.25,0-.5,0-.74l0-.33V37.7l.54,0v3.36c0,1.83,0,3.65,0,5.47,0,.1,0,.2,0,.31A.81.81,0,0,0,44.25,47Z"
        fill="currentColor"
      />
      <circle cx="43.97" cy="24.81" r="2.02" fill="currentColor" />
      <polyline
        points="14.18 47.02 14.18 21.52 33.9 7.27 51.93 21.52 51.93 46.78"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/food.svg
  food: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="white" />
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <polyline
        points="49.07 20.08 49.07 27.57 52.73 31.03 56.39 27.57 56.39 20.08"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <line x1="52.75" y1="20.08" x2="52.75" y2="30.68" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <line x1="52.75" y1="31.42" x2="52.75" y2="47.86" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M13.06,47.86V21.23C9.7,21.23,9.31,25,9.31,25V36.5h3.75"
        fill="currentColor"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <circle cx="31.29" cy="33.39" r="12.46" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/garden.svg
  garden: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M36.41,15.29c0,2.22-4,6.6-4,6.6s-4-4.38-4-6.6a4,4,0,0,1,8,0Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M28.26,35.83c0-2.22,4-6.6,4-6.6s4,4.38,4,6.6a4,4,0,0,1-8,0Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M42.61,30.23c-2.23,0-6.61-4-6.61-4s4.38-4,6.61-4a4,4,0,1,1,0,8Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M22.06,22.09c2.22,0,6.61,4,6.61,4s-4.39,4-6.61,4a4,4,0,1,1,0-8Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M42.48,21.18C40.91,22.75,35,23,35,23s.26-5.94,1.83-7.51a4,4,0,0,1,5.69,5.69Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M22.19,29.94c1.57-1.57,7.52-1.82,7.52-1.82s-.26,5.94-1.83,7.51a4,4,0,1,1-5.69-5.69Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M21.25,51.46c-2-1.35-3.44-7.59-3.44-7.59s6.35-.93,8.33.42a4.34,4.34,0,0,1-4.89,7.17Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M36.29,36.13c-1.57-1.57-1.82-7.52-1.82-7.52s5.94.26,7.51,1.83a4,4,0,1,1-5.69,5.69Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M27.53,15.84c1.57,1.57,1.82,7.52,1.82,7.52s-5.94-.26-7.51-1.83a4,4,0,0,1,5.69-5.69Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <circle
        cx="32.22"
        cy="26.13"
        r="5.99"
        fill="white"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <line x1="32.5" y1="40" x2="32.5" y2="63" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <line x1="26.59" y1="49.88" x2="32.5" y2="53.5" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M43.24,56c2-1.33,3.52-7.56,3.52-7.56s-6.34-1-8.34.34A4.34,4.34,0,0,0,43.24,56Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <line x1="37.69" y1="54.88" x2="31.77" y2="58.5" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/info.svg
  // Original used a Montserrat text element; replaced with equivalent SVG geometry
  info: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <circle cx="33" cy="21" r="3.5" fill="currentColor" />
      <rect x="30" y="28" width="6" height="20" rx="2" fill="currentColor" />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/location.svg
  location: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <path
        d="M50,29.27c0,8.89-16.09,26.44-16.09,26.44S17.84,38.16,17.84,29.27a16.09,16.09,0,0,1,32.18,0Z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <circle cx="34.07" cy="27.31" r="5.92" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/mail.svg
  mail: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <rect
        x="13.58"
        y="20.41"
        width="38.42"
        height="25.65"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <polyline
        points="52 20.41 32.79 33.23 13.58 20.41"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </>
  ),

  // Crafted in Boston.gov Fleet circle icon style — magnifying glass / search
  search: (
    <>
      <circle cx="33" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <circle cx="29" cy="28" r="10" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <line
        x1="36.5"
        y1="36.5"
        x2="48"
        y2="48"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </>
  ),

  // Boston.gov Fleet circle icon — sourced from assets.boston.gov/icons/circle_icons/trash_and_recycling.svg
  trash_and_recycling: (
    <>
      <circle cx="32.9" cy="33" r="31.42" fill="white" />
      <circle cx="32.9" cy="33" r="31.42" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="3" />
      <rect
        x="22.65"
        y="19.16"
        width="20.5"
        height="4.07"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <rect x="28.23" y="14.97" width="9.35" height="2.03" fill="currentColor" />
      <polygon
        points="39.22 49.42 26.58 49.42 23.95 27.24 41.85 27.24 39.22 49.42"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="3"
        fillRule="evenodd"
      />
    </>
  ),
}

interface IconProps {
  name: IconName
  size?: number
  className?: string
  'aria-label'?: string
}

export function Icon({ name, size = 24, className, 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      viewBox="0 0 66 66"
      width={size}
      height={size}
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {icons[name]}
    </svg>
  )
}
