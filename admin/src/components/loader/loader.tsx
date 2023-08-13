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
        height: height || '100vh',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        zIndex: '500',
        background: 'white',
      }}
    >
      <BallTriangle
        color={color || 'black'}
        height={size || '4vmax'}
        width={size || '4vmax'}
      />
    </div>
  );
}
