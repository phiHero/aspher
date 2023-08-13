import React, { useEffect, useState } from 'react';
import MainLayout from '../../../layouts/mainLayout';
import s from '../../../styles/form.module.scss';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import UploadInput from '@/components/UploadInput/UploadInput';
import { deleteStoredFile, uploadFile } from '@/utils/firebaseStorage';
import FuzzySearch from '@/components/FuzzySearch/FuzzySearch';
import { _filmData } from '@/interface/_custom';
import { handleInputOnChange } from '@/utils/InputHandler';
import { LeftArrow } from '@/components/icons';
import Image from 'next/image';
import FormBtn from '@/components/FormBtn/FormBtn';
import { _result } from '@/interface/_cases';

export default function AddEpisode() {
  const [passingSearchData, setPassingSearchData] = useState<_filmData | null>(
    null
  );
  const [result, setResult] = useState<_result>(null);
  const [fileUpload, setFileUpload] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [subtitleFile, setSubtitleFile] = useState<File>();

  const [formValue, setFormValue] = useState<{
    name: string | number;
  }>(() => ({
    name: '',
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUpload || !passingSearchData) return;
    setResult('pending');
    let url;
    let subtitle = null;
    try {
      url = await uploadFile(fileUpload, 'videos', setUploadProgress);
      if (subtitleFile) subtitle = await uploadFile(subtitleFile, 'subtitles');
      const { data } = await axios.post('/api/film/episode/add', {
        ...formValue,
        belongTo: passingSearchData._id,
        video: url,
        subtitle,
      });
      if (data) {
        setResult('success');
      }
    } catch (error) {
      if (typeof url === 'string') deleteStoredFile(url);
      if (typeof subtitle === 'string') deleteStoredFile(subtitle);
      setResult('error');
    }
  };

  useEffect(() => {
    setPassingSearchData(
      JSON.parse(localStorage.getItem('add_episode') || 'null')
    );
  }, []);

  useEffect(() => {
    if (!passingSearchData?._id) return;
    localStorage.setItem('add_episode', JSON.stringify(passingSearchData));
  }, [passingSearchData]);

  return (
    <div className={s.AddEpisode}>
      <div className={s.heading}>
        <h1>New episode</h1>
      </div>
      {passingSearchData?._id && (
        <button
          className={s.iconBtn}
          onClick={() => {
            setPassingSearchData(null);
            localStorage.removeItem('add_episode');
          }}
        >
          <LeftArrow />
        </button>
      )}
      {!passingSearchData?._id ? (
        <div className={s.seachWrap}>
          <FuzzySearch setPassingSearchData={setPassingSearchData} />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={s.flexRow}>
            <div className={s.basicInfo}>
              <div className={s.filmInfo}>
                <div className={s.imWrap}>
                  <Image
                    src={passingSearchData.backgroundImg}
                    layout='fill'
                    alt={`${passingSearchData.title} ${passingSearchData.otherName}`}
                  />
                </div>
                <div>
                  <h2>{passingSearchData.title}</h2>
                  <span>
                    Episodes count: {passingSearchData.episode.length}
                  </span>
                </div>
              </div>
              <span className={s.label}>Basic info:</span>

              <div className={s.inputField}>
                <TextField
                  className={s.input}
                  helperText='Keep it short...'
                  id='demo-helper-text-aligned'
                  label='Episode'
                  size='small'
                  name='name'
                  value={formValue.name}
                  onChange={(e) =>
                    handleInputOnChange(e, formValue, setFormValue)
                  }
                />
              </div>
            </div>
            <div className={s.requiredInfo}>
              <div className={s.heading}>
                <span>Required info*:</span>
              </div>
              <div className={s.inputField}>
                <UploadInput
                  type='Video'
                  fileUpload={fileUpload}
                  setFileUpload={setFileUpload}
                />
                <UploadInput
                  type='Subtitle'
                  fileUpload={subtitleFile}
                  setFileUpload={setSubtitleFile}
                />
              </div>
            </div>
          </div>
          <FormBtn
            result={result}
            setResult={setResult}
            uploadProgress={uploadProgress}
          />
        </form>
      )}
    </div>
  );
}
AddEpisode.PageLayout = MainLayout;
// AddEpisode.Search = true;
