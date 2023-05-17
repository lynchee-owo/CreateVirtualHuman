import { ChangeEvent, FormEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

type UserFormProps = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

const UserForm: React.FC<UserFormProps> = ({ onSubmit, isLoading }) => {
  const [questions, setQuestions] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!questions || !audioFile || !photo) {
      alert('Please fill in all the fields and upload both files.');
      return;
    }

    const formData = new FormData();
    formData.append('questions', questions);
    formData.append('audioFile', audioFile);
    formData.append('photo', photo);

    onSubmit(formData);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setter(files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black p-8 rounded-lg w-1/2">
      <label htmlFor="questions" className="font-semibold text-white">What is the topic?</label>
      <textarea
        id="questions"
        value={questions}
        onChange={(event) => setQuestions(event.target.value)}
        className="border border-white bg-white p-2 rounded w-full"
        required
      />

      <div className="flex justify-between">
        <div>
          <label className="font-semibold text-white">Upload audio file:</label>
          <IconButton color="primary" component="label" className="bg-blue-200 rounded-full w-20 h-20 flex items-center justify-center">
            <input
              type="file"
              id="audioFile"
              accept="audio/*"
              onChange={(event) => handleFileChange(event, setAudioFile)}
              className="hidden"
              required
            />
            <MicIcon />
          </IconButton>
        </div>

        <div>
          <label className="font-semibold text-white">Upload photo:</label>
          <IconButton color="primary" component="label" className="bg-blue-200 rounded-full w-20 h-20 flex items-center justify-center">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(event) => handleFileChange(event, setPhoto)}
              className="hidden"
              required
            />
            <PhotoCameraIcon />
          </IconButton>
        </div>
      </div>

      { isLoading ? (
        <button type="submit" className="border border-white bg-white p-2 font-semibold rounded w-full" disabled>
          Generating...
        </button>
      ) : (
        <button type="submit" className="border border-white bg-white p-2 font-semibold rounded w-full">
          Create Speech!
        </button>
      )}
    </form>
  );
};

export default UserForm;
