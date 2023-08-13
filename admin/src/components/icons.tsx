type _svgProp = { className?: string };

export function HomeIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
    >
      <path
        d='M4 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7957 13 12 13C11.2044 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L4 10Z'
        stroke='#343A40'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
export function ExternalLinkIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='none'
      strokeWidth='0'
      viewBox='0 0 15 15'
      height='1.2em'
      width='1.2em'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z'
        fill='currentColor'
      ></path>
    </svg>
  );
}
export function TrashIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='none'
      strokeWidth='0'
      viewBox='0 0 24 24'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z'
        fill='currentColor'
      ></path>
      <path d='M9 9H11V17H9V9Z' fill='currentColor'></path>
      <path d='M13 9H15V17H13V9Z' fill='currentColor'></path>
    </svg>
  );
}
export function ChartIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      version='1'
      viewBox='0 0 48 48'
      enableBackground='new 0 0 48 48'
      height='24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g fill='#00BCD4'>
        <rect x='37' y='18' width='6' height='24'></rect>
        <rect x='29' y='26' width='6' height='16'></rect>
        <rect x='21' y='22' width='6' height='20'></rect>
        <rect x='13' y='32' width='6' height='10'></rect>
        <rect x='5' y='28' width='6' height='14'></rect>
      </g>
      <g fill='#3F51B5'>
        <circle cx='8' cy='16' r='3'></circle>
        <circle cx='16' cy='18' r='3'></circle>
        <circle cx='24' cy='11' r='3'></circle>
        <circle cx='32' cy='13' r='3'></circle>
        <circle cx='40' cy='9' r='3'></circle>
        <polygon points='39.1,7.2 31.8,10.9 23.5,8.8 15.5,15.8 8.5,14.1 7.5,17.9 16.5,20.2 24.5,13.2 32.2,15.1 40.9,10.8'></polygon>
      </g>
    </svg>
  );
}
export function UserIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16 15H8C5.79086 15 4 16.7909 4 19V21H20V19C20 16.7909 18.2091 15 16 15Z'
        stroke='#343A40'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z'
        stroke='#343A40'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
export function ImageIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
    >
      <path
        d='M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
export function TagIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      fill='currentColor'
      viewBox='0 0 16 16'
      strokeWidth='.1px'
    >
      <path
        className='fillSecondary'
        d='M3 2V6.586L10 13.586L14.586 9L7.586 2H3ZM2 2C2 1.73478 2.10536 1.48043 2.29289 1.29289C2.48043 1.10536 2.73478 1 3 1H7.586C7.85119 1.00006 8.10551 1.10545 8.293 1.293L15.293 8.293C15.4805 8.48053 15.5858 8.73484 15.5858 9C15.5858 9.26516 15.4805 9.51947 15.293 9.707L10.707 14.293C10.5195 14.4805 10.2652 14.5858 10 14.5858C9.73484 14.5858 9.48053 14.4805 9.293 14.293L2.293 7.293C2.10545 7.10551 2.00006 6.85119 2 6.586V2Z'
      ></path>
      <path d='M5.5 5C5.36739 5 5.24021 4.94732 5.14645 4.85355C5.05268 4.75979 5 4.63261 5 4.5C5 4.36739 5.05268 4.24021 5.14645 4.14645C5.24021 4.05268 5.36739 4 5.5 4C5.63261 4 5.75979 4.05268 5.85355 4.14645C5.94732 4.24021 6 4.36739 6 4.5C6 4.63261 5.94732 4.75979 5.85355 4.85355C5.75979 4.94732 5.63261 5 5.5 5ZM5.5 6C5.89782 6 6.27936 5.84196 6.56066 5.56066C6.84196 5.27936 7 4.89782 7 4.5C7 4.10218 6.84196 3.72064 6.56066 3.43934C6.27936 3.15804 5.89782 3 5.5 3C5.10218 3 4.72064 3.15804 4.43934 3.43934C4.15804 3.72064 4 4.10218 4 4.5C4 4.89782 4.15804 5.27936 4.43934 5.56066C4.72064 5.84196 5.10218 6 5.5 6ZM1 7.086C1.00006 7.35119 1.10545 7.60551 1.293 7.793L8.75 15.25L8.707 15.293C8.51947 15.4805 8.26516 15.5858 8 15.5858C7.73484 15.5858 7.48053 15.4805 7.293 15.293L0.293 8.293C0.105451 8.10551 5.66374e-05 7.85119 0 7.586L0 3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2V7.086Z'></path>
    </svg>
  );
}
export function SettingIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M11 3H13C13.5523 3 14 3.44772 14 4V4.56879C14 4.99659 14.2871 5.36825 14.6822 5.53228C15.0775 5.69638 15.5377 5.63384 15.8403 5.33123L16.2426 4.92891C16.6331 4.53838 17.2663 4.53838 17.6568 4.92891L19.071 6.34312C19.4616 6.73365 19.4615 7.36681 19.071 7.75734L18.6688 8.1596C18.3661 8.46223 18.3036 8.92247 18.4677 9.31774C18.6317 9.71287 19.0034 10 19.4313 10L20 10C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H19.4312C19.0034 14 18.6318 14.2871 18.4677 14.6822C18.3036 15.0775 18.3661 15.5377 18.6688 15.8403L19.071 16.2426C19.4616 16.6331 19.4616 17.2663 19.071 17.6568L17.6568 19.071C17.2663 19.4616 16.6331 19.4616 16.2426 19.071L15.8403 18.6688C15.5377 18.3661 15.0775 18.3036 14.6822 18.4677C14.2871 18.6318 14 19.0034 14 19.4312V20C14 20.5523 13.5523 21 13 21H11C10.4477 21 10 20.5523 10 20V19.4313C10 19.0034 9.71287 18.6317 9.31774 18.4677C8.92247 18.3036 8.46223 18.3661 8.1596 18.6688L7.75732 19.071C7.36679 19.4616 6.73363 19.4616 6.34311 19.071L4.92889 17.6568C4.53837 17.2663 4.53837 16.6331 4.92889 16.2426L5.33123 15.8403C5.63384 15.5377 5.69638 15.0775 5.53228 14.6822C5.36825 14.2871 4.99659 14 4.56879 14H4C3.44772 14 3 13.5523 3 13V11C3 10.4477 3.44772 10 4 10L4.56877 10C4.99658 10 5.36825 9.71288 5.53229 9.31776C5.6964 8.9225 5.63386 8.46229 5.33123 8.15966L4.92891 7.75734C4.53838 7.36681 4.53838 6.73365 4.92891 6.34313L6.34312 4.92891C6.73365 4.53839 7.36681 4.53839 7.75734 4.92891L8.15966 5.33123C8.46228 5.63386 8.9225 5.6964 9.31776 5.53229C9.71288 5.36825 10 4.99658 10 4.56876V4C10 3.44772 10.4477 3 11 3Z'
        stroke='#343A40'
        strokeWidth='1.5'
      />
      <path
        d='M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z'
        stroke='#343A40'
        strokeWidth='1.5'
        className='fillSecondary'
      />
    </svg>
  );
}
export function PlusIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
    >
      <path
        d='M12 7V17M7 12H17'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
export function ArrowClockwiseIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'
      />
      <path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z' />
    </svg>
  );
}
export function ArrowCounterClockwiseIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z'
      />
      <path d='M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z' />
    </svg>
  );
}
export function ChatSquareQuoteIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
      <path d='M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z' />
    </svg>
  );
}
export function TypeBoldIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z' />
    </svg>
  );
}
export function TypeItalicIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z' />
    </svg>
  );
}
export function TypeUnderlineIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z' />
    </svg>
  );
}
export function AlignLeftIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z'
      />
    </svg>
  );
}
export function AlignCenterIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z'
      />
    </svg>
  );
}
export function AlignRightIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z'
      />
    </svg>
  );
}
export function JustifyAlignIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z'
      />
    </svg>
  );
}
export function LinkIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z' />
      <path d='M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z' />
    </svg>
  );
}
export function CodeIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z' />
    </svg>
  );
}
export function ChevronDownIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
      />
    </svg>
  );
}
export function StrikeThroughIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z' />
    </svg>
  );
}
export function TypeH1Icon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z' />
    </svg>
  );
}
export function TypeH2Icon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z' />
    </svg>
  );
}
export function TypeH3Icon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
    >
      <path d='M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z' />
    </svg>
  );
}
export function BulletListIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
      />
    </svg>
  );
}
export function NumberListIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z'
      />
      <path d='M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z' />
    </svg>
  );
}
export function ParagraphIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path
        fillRule='evenodd'
        d='M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z'
      />
    </svg>
  );
}
export function PenIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 512 512'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z'></path>
    </svg>
  );
}
export function CheckListIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
    >
      <path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z' />
      <path d='M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z' />
    </svg>
  );
}
export function FontColorIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 512 512'
    >
      <path
        fill='#777'
        d='M221.631 109 109.92 392h58.055l24.079-61h127.892l24.079 61h58.055L290.369 109Zm-8.261 168L256 169l42.63 108Z'
      />
    </svg>
  );
}
export function BucketIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      viewBox='0 0 16 16'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M14.54 11.811l-1.14-3.12v-.06l-4.91-4.91v-1.24a1.66 1.66 0 0 0-.11-.58 1.48 1.48 0 0 0-.83-.8 1.42 1.42 0 0 0-.58-.1 1.47 1.47 0 0 0-1.48 1.48v3.26l-3.06 3a1.52 1.52 0 0 0 0 2.12l3.63 3.63c.14.141.307.253.49.33a1.53 1.53 0 0 0 1.14 0 1.51 1.51 0 0 0 .49-.33l4.93-4.92-.66 2.2a1.19 1.19 0 0 0 0 .46c.033.152.098.296.19.42.098.121.216.223.35.3.14.07.294.11.45.12a1 1 0 0 0 .48-.09 1.14 1.14 0 0 0 .39-.29.98.98 0 0 0 .22-.44c.032-.145.035-.294.01-.44zm-8-9.33a.46.46 0 0 1 0-.2.52.52 0 0 1 .12-.17.64.64 0 0 1 .18-.1.5.5 0 0 1 .21 0 .5.5 0 0 1 .32.15.5.5 0 0 1 .12.33v1.26l-1 1 .05-2.27zm1 11.35a.36.36 0 0 1-.16.11.47.47 0 0 1-.38 0 .361.361 0 0 1-.16-.11l-3.63-3.62a.5.5 0 0 1 0-.71l4.35-4.35v2.85a.74.74 0 0 0-.24.55.75.75 0 1 0 1.17-.55v-2.83l3.85 3.87-4.8 4.79z'></path>
    </svg>
  );
}
export function SymbolIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='none'
    >
      <path
        d='M4.648 4.475 1.824 12.25H.67l3.252-8.531h.744l-.018.756Zm2.368 7.775-2.83-7.775-.018-.756h.744l3.264 8.531h-1.16Zm-.147-3.158v.926H2.076v-.926H6.87Zm6.024 2.074V7.902c0-.25-.051-.466-.153-.65a.997.997 0 0 0-.445-.434c-.2-.101-.445-.152-.738-.152-.274 0-.514.047-.721.14a1.255 1.255 0 0 0-.48.37.809.809 0 0 0-.17.492H9.101c0-.227.058-.451.175-.674.118-.223.286-.424.504-.603.223-.184.489-.329.797-.434.313-.11.66-.164 1.043-.164.461 0 .867.078 1.219.234.355.157.633.393.832.71.203.312.305.704.305 1.177v2.953c0 .211.017.436.052.674.04.238.096.443.17.615v.094h-1.13a2.022 2.022 0 0 1-.13-.498 4.011 4.011 0 0 1-.046-.586Zm.187-2.76.012.762h-1.096c-.309 0-.584.025-.826.076a1.89 1.89 0 0 0-.61.217.979.979 0 0 0-.504.879c0 .2.046.38.135.545a.98.98 0 0 0 .405.392c.183.094.408.141.674.141.332 0 .625-.07.878-.211a1.83 1.83 0 0 0 .604-.516c.152-.203.234-.4.246-.591l.463.521a1.572 1.572 0 0 1-.223.545 2.607 2.607 0 0 1-1.2 1.025 2.328 2.328 0 0 1-.927.176c-.43 0-.806-.084-1.13-.252a1.933 1.933 0 0 1-.75-.674 1.784 1.784 0 0 1-.264-.955c0-.34.066-.638.199-.896a1.73 1.73 0 0 1 .574-.65c.25-.176.551-.31.903-.399a4.76 4.76 0 0 1 1.177-.135h1.26Z'
        fill='#000'
      />
    </svg>
  );
}
export function DraggableIcon({ className }: _svgProp) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      data-name='Layer 1'
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path
        stroke='currentColor'
        d='M8.5 10a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm0 7a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm7-10a2 2 0 1 0-2-2 2 2 0 0 0 2 2Zm-7-4a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm7 14a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm0-7a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z'
      />
    </svg>
  );
}

export function RightArrow({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      className={className}
      id={id}
      xmlns='http://www.w3.org/2000/svg'
      width='49'
      height='18'
      viewBox='0 0 49 18'
      fill='currentColor'
    >
      <path
        d='M1.44532 10.4063H44.054L38.9835 15.4521C38.4178 16.0152 38.4156 16.9303 38.9787 17.4961C39.5418 18.0619 40.4569 18.064 41.0227 17.501L48.5748 9.98539L48.5761 9.98399C49.1404 9.4209 49.1422 8.50284 48.5762 7.93786L48.5749 7.93649L41.0229 0.420871C40.4572 -0.142079 39.542 -0.140128 38.9788 0.425784C38.4157 0.991548 38.4179 1.90665 38.9837 2.46975L44.054 7.51562H1.44531C0.647067 7.51562 -6.98e-08 8.16269 0 8.96093C6.98e-08 9.75919 0.647069 10.4063 1.44532 10.4063Z'
        fill='currentColor'
      />
    </svg>
  );
}
export function RightArrowShort({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='12'
      viewBox='0 0 13 12'
      fill='currentColor'
      className={className}
      id={id}
    >
      <path d='M6.54901 11.4205L5.37855 10.2614L8.88423 6.75568H0.367188V5.0625H8.88423L5.37855 1.5625L6.54901 0.397727L12.0604 5.90909L6.54901 11.4205Z' />
    </svg>
  );
}

export function LeftArrow({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      className={className}
      id={id}
      xmlns='http://www.w3.org/2000/svg'
      width='49'
      height='18'
      viewBox='0 0 49 18'
      fill='currentColor'
    >
      <path d='M47.5547 7.51562H4.94603L10.0165 2.46975C10.5822 1.90665 10.5844 0.991548 10.0213 0.425784C9.45823 -0.140056 8.54305 -0.142151 7.97729 0.42087L0.425238 7.93649L0.423938 7.93787C-0.140385 8.50096 -0.142191 9.41902 0.423793 9.98397L0.425094 9.98537L7.97714 17.501C8.54284 18.064 9.45801 18.062 10.0212 17.4961C10.5843 16.9303 10.5821 16.0152 10.0163 15.4521L4.94603 10.4063H47.5547C48.353 10.4063 49 9.75917 49 8.96093C49 8.16269 48.353 7.51562 47.5547 7.51562Z' />
    </svg>
  );
}
export function LeftArrowShort({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      className={className}
      id={id}
      xmlns='http://www.w3.org/2000/svg'
      width='36'
      height='21'
      viewBox='0 0 36 21'
      fill='currentColor'
    >
      <path d='M10.3878 21L0.205966 10.8182L10.3878 0.636364L12.1378 2.36364L4.93324 9.56818H35.956V12.0682H4.93324L12.1378 19.25L10.3878 21Z' />
    </svg>
  );
}

export function ExternalIcon({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      className={className}
      id={id}
      stroke='currentColor'
      fill='none'
      strokeWidth='0'
      viewBox='0 0 15 15'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z'
        fill='currentColor'
      ></path>
    </svg>
  );
}
