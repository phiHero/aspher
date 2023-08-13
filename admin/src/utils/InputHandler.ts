export const handleInputOnChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  state: any,
  setState: React.Dispatch<React.SetStateAction<any>>
): void => {
  const { name, value } = e.target;
  if (!name) return;
  setState({ ...state, [name]: value });
};
