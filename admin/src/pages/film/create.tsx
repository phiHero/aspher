import React, { useState } from 'react';
import MainLayout from '../../layouts/mainLayout';
import s from '../../styles/form.module.scss';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import UploadInput from '@/components/UploadInput/UploadInput';
import useFileUpload from '@/hooks/useFileUpload';
import FormBtn from '@/components/FormBtn/FormBtn';
import { _result } from '@/interface/_cases';
import { GENRES } from '@/utils/CONSTANT';

export default function CreateAnime() {
  const [formValue, setFormValue] = useState<{
    title: string;
    otherName: string;
    adminRecommended: string;
    genre: string[];
    year: string;
    desc: string;
    backgroundImg: string;
    trailer: string;
    isMovie: string;
  }>(() => ({
    title: '',
    otherName: '',
    adminRecommended: 'false',
    genre: [],
    year: '2020',
    desc: '',
    backgroundImg: '',
    trailer: '',
    isMovie: 'false',
  }));
  const [result, setResult] = useState<_result>(null);
  const { fileUpload, setFileUpload, submitFile } = useFileUpload();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleGenreChange = (e: any, newValue: string[]) => {
    setFormValue({ ...formValue, genre: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('pending');
    const imUrl = await submitFile('images');

    const processedFormValue = {
      ...formValue,
      title: formValue.title.trim(),
      otherName: formValue.otherName.trim(),
      year: formValue.year.trim(),
      desc: formValue.desc.trim(),
      trailer: formValue.trailer.trim(),
      adminRecommended: JSON.parse(formValue.adminRecommended),
      isMovie: JSON.parse(formValue.isMovie),
    };
    try {
      const { data } = await axios.post('/api/film/create', {
        ...processedFormValue,
        backgroundImg: imUrl,
      });
      if (data) {
        setResult('success');
      }
    } catch (error) {
      setResult('error');
    }
  };

  return (
    <div className={s.CreateAnime}>
      <form onSubmit={handleSubmit}>
        <div className={s.flexRow}>
          <div className={s.basicInfo}>
            <div className={s.heading}>
              <h1>Add new film</h1>
              <span>Basic info</span>
            </div>
            <div className={s.inputField}>
              <TextField
                className={s.input}
                helperText='Main title of the film'
                id='demo-helper-text-aligned'
                label='Title'
                size='small'
                name='title'
                value={formValue.title}
                onChange={handleOnChange}
              />
              <TextField
                className={s.input}
                helperText='Other title of the film, help with search'
                id='demo-helper-text-aligned'
                label='Other title'
                size='small'
                name='otherName'
                value={formValue.otherName}
                onChange={handleOnChange}
              />
              <Autocomplete
                className={s.input}
                value={formValue.genre}
                onChange={handleGenreChange}
                inputValue={''}
                multiple
                options={GENRES}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                      checkedIcon={<CheckBoxIcon fontSize='small' />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label='Genres' placeholder='Genres' />
                )}
              />
              <TextField
                className={s.input}
                id='filled-multiline-static'
                label='Description'
                multiline
                rows={9}
                variant='filled'
                name='desc'
                value={formValue.desc}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className={s.requiredInfo}>
            <div className={s.inputField}>
              <TextField
                className={s.input}
                type='number'
                helperText='Release year'
                id='demo-helper-text-aligned'
                label='Year'
                size='small'
                name='year'
                value={formValue.year}
                onChange={handleOnChange}
              />
              <div className={s.inputWrap}>
                <UploadInput
                  fileUpload={fileUpload}
                  setFileUpload={setFileUpload}
                  type='Image'
                />
              </div>
              <TextField
                className={s.input}
                helperText='Trailer link from youtube'
                id='demo-helper-text-aligned'
                label='Trailer'
                size='small'
                name='trailer'
                value={formValue.trailer}
                onChange={handleOnChange}
              />
              <TextField
                className={s.input}
                select
                name='adminRecommended'
                label='Admin recommendation'
                value={formValue.adminRecommended}
                onChange={handleOnChange}
                SelectProps={{
                  native: true,
                }}
                helperText='Only recommend if the film is really good'
                variant='standard'
                size='small'
              >
                <option value='false'>No</option>
                <option value='true'>Yes</option>
              </TextField>
              <TextField
                className={s.input}
                select
                label='Type'
                name='isMovie'
                value={formValue.isMovie}
                onChange={handleOnChange}
                SelectProps={{
                  native: true,
                }}
                helperText='Film type series or movie'
                variant='standard'
                size='small'
              >
                <option value='false'>Series</option>
                <option value='true'>Movie</option>
              </TextField>
            </div>
          </div>
        </div>
        <FormBtn result={result} setResult={setResult} />
      </form>
    </div>
  );
}

CreateAnime.PageLayout = MainLayout;
// CreateAnime.Search = true;
