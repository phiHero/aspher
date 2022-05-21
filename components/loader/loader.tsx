import zIndex from '@mui/material/styles/zIndex';
import { BallTriangle } from 'react-loader-spinner';

export default function Loader({ size }: { size?: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        zIndex: '999',
      }}
    >
      <BallTriangle
        color='var(--custom-client-color)'
        height={size || 80}
        width={size || 80}
      />
    </div>
  );
}
