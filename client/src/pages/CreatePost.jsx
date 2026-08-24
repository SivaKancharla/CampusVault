import { Alert, Button, TextInput } from 'flowbite-react';
import { WysiwygEditor } from '@sidieyel/wysiwyg-editor';
import '@sidieyel/wysiwyg-editor/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
//   console.log(formData);
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      // Maximum image size: 2 MB
      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize) {
        setImageUploadError('Image must be less than 2 MB');
        return;
      }

      setImageUploadError(null);
      setImageUploading(true);

      const cloudinaryFormData = new FormData();

      cloudinaryFormData.append('file', file);

      cloudinaryFormData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error?.message || 'Image upload failed'
        );
      }

      // Save Cloudinary URL
      setFormData((prev) => ({
        ...prev,
        image: data.secure_url,
      }));

      setImageUploading(false);
      setImageUploadError(null);

    } catch (error) {
      console.log(error);

      setImageUploadError('Image upload failed');
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.title || !formData.content) {
        setPublishError('Please provide a title and content');
        return;
      }

      if (!formData.image) {
        setPublishError('Please upload an image');
        return;
      }

      if (imageUploading) {
        setPublishError('Please wait for the image to finish uploading');
        return;
      }

      setPublishError(null);

      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);

      navigate(`/post/${data.slug}`);

    } catch (error) {
      console.log(error);
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">

      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a post
      </h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >

        {/* Title + Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">

          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <select
            id="category"
            className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            defaultValue="uncategorized"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
          >
            <option value="uncategorized">
              Select a category
            </option>

            <option value="javascript">
              JavaScript
            </option>

            <option value="reactjs">
              React.js
            </option>

            <option value="nextjs">
              Next.js
            </option>

            <option value="InterviewExp">
              Interview Expirence
            </option>
            <option value="OAExp">
              OA Expirence
            </option>
          </select>

        </div>

        {/* Image Upload */}
        <div className="flex flex-col sm:flex-row gap-3 items-center border-2 border-black border-dashed rounded-lg p-4 w-full">

        {/* File Picker */}
        <label
            htmlFor="image"
            className="flex-1 min-w-0 w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
            <div className="flex items-center gap-3 min-w-0">

            <span className="font-medium shrink-0">
                Choose a file
            </span>

            <span className="text-gray-500 truncate min-w-0">
                {file ? file.name : 'No file chosen'}
            </span>

            </div>

            <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            />
        </label>

        {/* Upload Button */}
        <Button
            type="button"
            className="shrink-0 whitespace-nowrap bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
            onClick={handleUploadImage}
            disabled={imageUploading || !file}
        >
            {imageUploading ? 'Uploading...' : 'Upload Image'}
        </Button>

        </div>

        {/* Image Upload Error */}
        {imageUploadError && (
          <Alert color="failure">
            {imageUploadError}
          </Alert>
        )}

        {/* Uploaded Image Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover rounded-lg"
          />
        )}

        {/* Content Editor */}
        <WysiwygEditor
          content={formData.content || ''}
          onChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              content: value,
            }));
          }}
          placeholder="Write something..."
        />

        {/* Publish */}
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          disabled={imageUploading}
        >
          {imageUploading ? 'Uploading Image...' : 'Publish'}
        </Button>

        {/* Publish Error */}
        {publishError && (
          <Alert
            className="mt-5"
            color="failure"
          >
            {publishError}
          </Alert>
        )}

      </form>

    </div>
  );
}