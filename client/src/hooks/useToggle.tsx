import { useState } from 'react';

export default function useToggle(initial: boolean) {
  const [state, setState] = useState(initial);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
}
