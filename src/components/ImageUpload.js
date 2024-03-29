import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Image from "next/legacy/image";
import toast from "react-hot-toast";
import classNames from "classnames";
import { BsArrowUpCircle } from "react-icons/bs";
// import { ArrowUpIcon } from '@heroicons/react/outline';

const ImageUpload = ({
  label = "Image",
  initialImage = null,
  objectFit = "cover",
  accept = ".png, .jpg, .jpeg, .gif, .webp",
  sizeLimit = 10 * 1024 * 1024, // 10MB
  onChangePicture = () => null,
}) => {
  const pictureRef = useRef();

  const [image, setImage] = useState(initialImage);
  const [updatingPicture, setUpdatingPicture] = useState(false);
  const [pictureError, setPictureError] = useState(null);

  const handleOnChangePicture = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const fileName = file?.name?.split(".")?.[0] ?? "New file";

    reader.addEventListener(
      "load",
      async function () {
        try {
          setImage({ src: reader.result, alt: fileName });
          if (typeof onChangePicture === "function") {
            await onChangePicture(reader.result);
          }
        } catch (err) {
          toast.error("Unable to update image");
        } finally {
          setUpdatingPicture(false);
        }
      },
      false
    );

    if (file) {
      if (file.size <= sizeLimit) {
        setUpdatingPicture(true);
        setPictureError("");
        reader.readAsDataURL(file);
      } else {
        setPictureError("File size is exceeding 10MB.");
      }
    }
  };

  const handleOnClickPicture = () => {
    if (pictureRef.current) {
      pictureRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-600">{label}</label>

      <button
        disabled={updatingPicture}
        onClick={handleOnClickPicture}
        aria-label="Image Upload"
        className={classNames(
          "group aspect-h-9 aspect-w-16 relative overflow-hidden rounded-md transition focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          image?.src
            ? "hover:opacity-50 disabled:hover:opacity-100"
            : "border-2 border-dashed hover:border-gray-400 focus:border-gray-400 disabled:hover:border-gray-200"
        )}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image?.alt ?? ""}
            layout="fill"
            objectFit={objectFit}
          />
        ) : null}

        <div className="flex items-center justify-center">
          {!image?.src ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="shrink-0 rounded-full bg-gray-200 p-2 transition group-hover:scale-110 group-focus:scale-110">
                <BsArrowUpCircle className="h-4 w-4 text-gray-500 transition" />
              </div>
              <span className="text-xs font-semibold text-gray-500 transition">
                {updatingPicture ? "Uploading..." : "Upload"}
              </span>
            </div>
          ) : null}
          <input
            ref={pictureRef}
            type="file"
            accept={accept}
            onChange={handleOnChangePicture}
            className="hidden"
          />
        </div>
      </button>

      {pictureError ? (
        <span className="text-sm text-red-600">{pictureError}</span>
      ) : null}
    </div>
  );
};

ImageUpload.propTypes = {
  label: PropTypes.string,
  initialImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  objectFit: PropTypes.string,
  accept: PropTypes.string,
  sizeLimit: PropTypes.number,
  onChangePicture: PropTypes.func,
};

export default ImageUpload;
