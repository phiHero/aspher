import { useState, useEffect } from 'react';
import MainLayout from '../../layouts/mainLayout';
import s from '../../styles/form.module.scss';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';
import { _filmData } from '@/interface/_custom';
import { handleInputOnChange } from '@/utils/InputHandler';
import FuzzySearch from '@/components/FuzzySearch/FuzzySearch';
import { LeftArrow } from '@/components/icons';
import Image from 'next/image';
import UploadInput from '@/components/UploadInput/UploadInput';
import useFileUpload from '@/hooks/useFileUpload';
import { deleteStoredFile } from '@/utils/firebaseStorage';
import FormBtn from '@/components/FormBtn/FormBtn';
import { _result } from '@/interface/_cases';

export default function EditAnime() {
  const [passingSearchData, setPassingSearchData] = useState<_filmData | null>(
    null
  );

  const [result, setResult] = useState<_result>(null);
  const { fileUpload, setFileUpload, submitFile } = useFileUpload();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    handleInputOnChange(e, passingSearchData, setPassingSearchData);

  const handleGenreChange = (e: any, newValue: string[]) => {
    if (passingSearchData?._id)
      setPassingSearchData({ ...passingSearchData, genre: newValue });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let bgUrl;
    setResult('pending');
    if (fileUpload) {
      bgUrl = await submitFile('images');
      passingSearchData?.backgroundImg &&
        bgUrl &&
        deleteStoredFile(passingSearchData.backgroundImg);
    }

    if (!passingSearchData?._id) return;

    const processedpassingSearchData = {
      ...passingSearchData,
      title: passingSearchData.title.trim(),
      otherName: passingSearchData.otherName.trim(),
      year: (passingSearchData.year + '').trim(),
      desc: passingSearchData.desc.trim(),
      backgroundImg: bgUrl ? bgUrl : passingSearchData.backgroundImg,
      trailer: passingSearchData.trailer.trim(),
      adminRecommended: JSON.parse(passingSearchData.adminRecommended + ''),
      isMovie: JSON.parse(passingSearchData.isMovie + ''),
    };
    try {
      const { data } = await axios.post(
        '/api/film/edit?id=' + passingSearchData._id,
        processedpassingSearchData
      );
      if (data) {
        setPassingSearchData(data);
        setResult('success');
      }
    } catch (error) {
      setResult('error');
    }
  };

  // persist when reload & close window

  useEffect(() => {
    setPassingSearchData(
      JSON.parse(localStorage.getItem('edit_episode') || 'null')
    );
  }, []);

  useEffect(() => {
    if (!passingSearchData?._id) return;
    localStorage.setItem('edit_episode', JSON.stringify(passingSearchData));
  }, [passingSearchData]);

  return (
    <div className={s.EditAnime}>
      <div className={s.heading}>
        <h1>Editing</h1>
      </div>
      {passingSearchData?._id && (
        <button
          className={s.iconBtn}
          onClick={() => {
            setPassingSearchData(null);
            localStorage.removeItem('edit_episode');
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
              <span className={s.label}>Basic Info</span>

              <div className={s.inputField}>
                <TextField
                  className={s.input}
                  helperText='Main title of the film'
                  id='demo-helper-text-aligned'
                  label='Title'
                  size='small'
                  name='title'
                  value={passingSearchData.title}
                  onChange={handleOnChange}
                />
                <TextField
                  className={s.input}
                  helperText='Other title of the film, help with search, not required'
                  id='demo-helper-text-aligned'
                  label='Other title'
                  size='small'
                  name='otherName'
                  value={passingSearchData.otherName}
                  onChange={handleOnChange}
                />
                <Autocomplete
                  className={s.input}
                  value={passingSearchData.genre}
                  onChange={handleGenreChange}
                  inputValue={''}
                  multiple
                  options={genreOptions}
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
                    <TextField
                      {...params}
                      label='Genres'
                      placeholder='Genres'
                    />
                  )}
                />

                <TextField
                  className={s.input}
                  helperText='Trailer link from youtube'
                  id='demo-helper-text-aligned'
                  label='Trailer'
                  size='small'
                  name='trailer'
                  value={passingSearchData.trailer}
                  onChange={handleOnChange}
                />
                <TextField
                  className={s.input}
                  type='number'
                  helperText='Release year'
                  id='demo-helper-text-aligned'
                  label='Year'
                  size='small'
                  name='year'
                  value={passingSearchData.year}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className={s.requiredInfo}>
              <div className={s.heading}></div>
              <div className={s.inputField}>
                <div className={s.inputWrap}>
                  <UploadInput
                    fileUpload={fileUpload}
                    setFileUpload={setFileUpload}
                    type='Image'
                    initial={passingSearchData.backgroundImg}
                  />
                </div>
                <TextField
                  className={s.input}
                  select
                  name='adminRecommended'
                  label='Admin recommendation'
                  value={passingSearchData.adminRecommended}
                  onChange={handleOnChange}
                  SelectProps={{
                    native: true,
                  }}
                  helperText='Only recommend if the film is really good'
                  variant='standard'
                  size='small'
                >
                  <option value='false'>Không</option>
                  <option value='true'>Có</option>
                </TextField>
                <TextField
                  className={s.input}
                  select
                  label='Type'
                  name='isMovie'
                  value={passingSearchData.isMovie}
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
                <TextField
                  className={s.input}
                  id='filled-multiline-static'
                  label='Description'
                  multiline
                  rows={9}
                  variant='filled'
                  name='desc'
                  value={passingSearchData.desc}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>
          <FormBtn result={result} setResult={setResult} />
        </form>
      )}
    </div>
  );
}
const genreOptions: string[] = [
  'hành động',
  'viễn tưởng',
  'harem',
  'ecchi',
  'kinh dị',
  'tình cảm',
  'hài hước',
  'học đường',
  'máy móc',
  'thể thao',
];
EditAnime.PageLayout = MainLayout;
EditAnime.Search = true;
