import { uploadFile } from '@/utils/firebaseStorage';
import { useState } from 'react';

export default function useFileUpload() {
  const [fileUpload, setFileUpload] = useState<File>();
  const submitFile = async (type: 'images' | 'videos') => {
    if (!fileUpload) return;
    try {
      const url = await uploadFile(fileUpload, type);
      return url;
    } catch (error) {
      throw error;
    }
  };
  return { fileUpload, setFileUpload, submitFile };
}
