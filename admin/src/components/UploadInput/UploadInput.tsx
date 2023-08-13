import s from './UploadInput.module.scss';
import { ImageIcon, TrashIcon } from '@/components/icons';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { deleteStoredFile } from '@/utils/firebaseStorage';

// All the image will be read as base64
// When saved it will be upload to firebase storage
export default function InputItem({
  name,
  fileUpload,
  setFileUpload,
  type,
  initial,
}: {
  name?: string;
  fileUpload: File | undefined;
  setFileUpload: Dispatch<SetStateAction<File | undefined>>;
  type: 'Image' | 'Video' | 'Subtitle';
  initial?: string;
}) {
  const [fileData, setFileData] = useState(''); // thumbnail
  const [initialFile, setInitialFile] = useState(initial);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUpload(file);
      setFileData(URL.createObjectURL(file));
      e.target.value = '';
    }
  };

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    setFileUpload(undefined);
    setFileData('');
    if (initialFile) {
      setInitialFile(undefined);
    }
  };

  return (
    <div className={`${s.InputItem} ${s[type]}`}>
      <div className={s.btnWrap}>
        {(fileData || initialFile) && (
          <button className={s.deleteBtn} onClick={handleDelete}>
            <TrashIcon className={s.icon} />
          </button>
        )}
        <input type='file' onChange={handleFileUpload} disabled={!!fileData} />

        {fileData || initialFile ? (
          type !== 'Subtitle' &&
          (type === 'Video' ? (
            <video src={initialFile || fileData + '#t=501'} />
          ) : (
            <Image
              src={initialFile || fileData}
              layout='fill'
              objectFit='contain'
              alt='background Image'
            />
          ))
        ) : (
          <>
            {type !== 'Subtitle' && <ImageIcon className={s.icon} />}
            <span className={s.annotation}>
              {type} {name || ''}
            </span>
          </>
        )}
      </div>
      <div className={s.fileName}>{fileUpload?.name}</div>
    </div>
  );
}
