import { BallTriangle } from 'react-loader-spinner';

export default function Loader({
  size,
  height,
  color,
}: {
  size?: number;
  height?: string;
  color?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: height || 'calc(100vh - var(--header-height))',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        zIndex: '999',
      }}
    >
      <BallTriangle
        color={color || 'var(--custom-client-color)'}
        height={size || 80}
        width={size || 80}
      />
    </div>
  );
}
