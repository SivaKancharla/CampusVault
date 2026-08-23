import { Button, TextInput,Alert } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        // Maximum file size: 2 MB
        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
        setImageFileUploadError('Image must be less than 2 MB');
        setImageFile(null);
        setImageFileUrl(null);
        return;
        }

        setImageFileUploadError(null);
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
    }
    };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    try {
      setImageFileUploading(true);
      setImageFileUploadError(null);

      const formData = new FormData();

      formData.append('file', imageFile);
      formData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Image upload failed');
      }

      console.log('Cloudinary URL:', data.secure_url);

      setImageFileUrl(data.secure_url);
      setFormData({ ...formData, profilePicture: data.secure_url });
      setImageFileUploading(false);

    } catch (error) {
      console.log(error);

      setImageFileUploadError('Could not upload image');
      setImageFile(null);
      setImageFileUrl(null);
      setImageFileUploading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setUpdateUserError(null);
    // setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        {imageFileUploading && (
          <p className="text-center text-sm text-gray-500">
            Uploading image...
          </p>
        )}

        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username} onChange={handleChange}
        />

        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email} onChange={handleChange}
        />

        <TextInput
          type="password"
          id="password"
          placeholder="New password" onChange={handleChange}
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 via-purple-600
          to-blue-500 text-white
          hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300"
          disabled={imageFileUploading}
        >
          {imageFileUploading ? 'Uploading...' : 'Update'}
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">
          Delete Account
        </span>

        <span className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
    </div>
  );
}