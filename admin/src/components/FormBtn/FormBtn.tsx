import { _result } from '@/interface/_cases';
import s from './FormBtn.module.scss';
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function FormBtn({
  result,
  setResult,
  uploadProgress,
}: {
  result: _result;
  setResult: Dispatch<SetStateAction<_result>>;
  uploadProgress?: number;
}) {
  useEffect(() => {
    if (result && result !== 'pending') {
      setTimeout(() => setResult(null), 4000);
    }
  }, [result]);
  const isPending = result === 'pending';
  const isSuccess = result === 'success';
  const isError = result === 'error';

  return (
    <div className={s.FormBtn}>
      {
        <div
          className={isPending && uploadProgress ? `${s.prg} ${s.show}` : s.prg}
        >
          <label htmlFor='uploadProgress'>
            Progress {Math.round(uploadProgress || 0)}%:
          </label>
          <progress id='uploadProgress' value={uploadProgress} max='100'>
            {uploadProgress}%
          </progress>
        </div>
      }
      <button
        type='submit'
        className={isPending ? s.disabled : ''}
        disabled={isPending}
      >
        Submit
      </button>
      {isError ? (
        <span className={s.error}>There is an error!</span>
      ) : (
        isSuccess && (
          <span className={isSuccess ? `${s.success} ${s.active}` : s.success}>
            Successfull!
          </span>
        )
      )}
    </div>
  );
}
