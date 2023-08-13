import { BallTriangle } from 'react-loader-spinner';

export default function Loader({
  size,
  height,
  color,
}: {
  size?: string;
  height?: string;
  color?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: height || 'calc(95vh - var(--header-height))',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        zIndex: '500',
      }}
    >
      <BallTriangle
        color={color || 'var(--custom-client-color)'}
        height={size || '5vmax'}
        width={size || '5vmax'}
      />
    </div>
  );
}
