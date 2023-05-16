// src/components/UserForm.tsx

import { ChangeEvent, FormEvent, useState } from 'react';

type UserFormProps = {
  onSubmit: (formData: FormData) => void;
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
      <label htmlFor="questions" className="font-semibold">Topic:</label>
      <textarea
        id="questions"
        value={questions}
        onChange={(event) => setQuestions(event.target.value)}
        className="border border-black bg-white p-2 rounded"
        required
      />

      <label htmlFor="audioFile" className="font-semibold">Upload audio file:</label>
      <input
        type="file"
        id="audioFile"
        accept="audio/*"
        onChange={(event) => handleFileChange(event, setAudioFile)}
        className="border border-black bg-white p-2 rounded"
        required
      />

      <label htmlFor="photo" className="font-semibold">Upload photo:</label>
      <input
        type="file"
        id="photo"
        accept="image/*"
        onChange={(event) => handleFileChange(event, setPhoto)}
        className="border border-black bg-white p-2 rounded"
        required
      />

      { isLoading ? (
        <button type="submit" className="border border-black bg-white p-2 font-semibold rounded" disabled>
          Generating...
        </button>
      ) : (
        <button type="submit" className="border border-black bg-white p-2 font-semibold rounded">
          Let's Talk
        </button>
      )}
      
    </form>
  );
};

export default UserForm;
