import { storage } from '../config/firebase';
import {
  getDownloadURL,
  ref,
  uploadString,
  deleteObject,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import { getCookie } from './cookie';

export async function uploadBase64Image(
  base64: string,
  dir?: 'gallery' | 'desc'
) {
  const imgRef = ref(storage, `images/products/${dir ?? 'logo'}/${nanoid(10)}`);
  try {
    const snapshot = await uploadString(imgRef, base64, 'data_url');
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(
  file: File,
  dir?: 'videos' | 'images' | 'subtitles',
  setUploadProgress?: React.Dispatch<React.SetStateAction<number>>
) {
  if (!file) throw new Error('No file specified');
  // http-only cookie cannot be accessed
  if (!getCookie('atk')) return alert('Unauthorized');

  const fileRef = ref(storage, `${dir ?? 'videos'}/${nanoid(9)}-${file.name}`);
  if (!setUploadProgress) {
    try {
      const uploadTask = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      return url;
    } catch (error) {
      throw error;
    }
  } else {
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(fileRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          reject(error); //!! handles error
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }
}

export async function deleteStoredFile(url: string) {
  const fileRef = ref(storage, url);
  await deleteObject(fileRef)
    .then(() => console.log('deleted'))
    .catch((error) => {
      throw error;
    });
}
