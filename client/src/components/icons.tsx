import { ComponentPropsWithoutRef } from 'react';
type _svgProp = ComponentPropsWithoutRef<'svg'>;

export function DashboardIcon({ ...svgProps }: _svgProp) {
  return (
    <svg focusable='false' aria-hidden='true' viewBox='0 0 24 24' {...svgProps}>
      <path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'></path>
    </svg>
  );
}
export function AssignmentIcon({ ...svgProps }: _svgProp) {
  return (
    <svg focusable='false' aria-hidden='true' viewBox='0 0 24 24' {...svgProps}>
      <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'></path>
    </svg>
  );
}
export function CustomizeIcon({ ...svgProps }: _svgProp) {
  return (
    <svg focusable='false' aria-hidden='true' viewBox='0 0 24 24' {...svgProps}>
      <path d='M7.5 5.6 10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.9959.9959 0 0 0-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.03 5.49-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z'></path>
    </svg>
  );
}
export function FavoriteRoundedIcon({ ...svgProps }: _svgProp) {
  return (
    <svg focusable='false' aria-hidden='true' viewBox='0 0 24 24' {...svgProps}>
      <path d='M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z'></path>
    </svg>
  );
}
export function TrashIcon({ ...svgProps }: _svgProp) {
  return (
    <svg
      stroke='white'
      fill='white'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='1.2em'
      width='1.2em'
      xmlns='http://www.w3.org/2000/svg'
      {...svgProps}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z'
        fill='white'
      ></path>
      <path d='M9 9H11V17H9V9Z' fill='white'></path>
      <path d='M13 9H15V17H13V9Z' fill='white'></path>
    </svg>
  );
}
