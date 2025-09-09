import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import Input from "./Input";
import ImageUpload from "./ImageUpload";

const ListingSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  address: Yup.string().trim().required(),
  locality: Yup.string().trim().required(),
  sqfeet: Yup.number().positive().integer().min(1).required(),
  description: Yup.string().trim().required(),
  price: Yup.number().positive().integer().min(1).required(),
  guests: Yup.number().positive().integer().min(1).required(),
  beds: Yup.number().positive().integer().min(1).required(),
  baths: Yup.number().positive().integer().min(1).required(),
  ownerName: Yup.string().trim().required(),
  contact: Yup.string().trim().required(),
});

const ListingForm = ({
  initialValues = null,
  redirectPath = "",
  buttonText = "Submit",
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? "");

  const upload = async image => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Uploading...");
      const { data } = await axios.post("/api/image-upload", { image });
      setImageUrl(data?.url);
      toast.success("Successfully uploaded", { id: toastId });
    } catch (e) {
      toast.error("Unable to upload", { id: toastId });
      setImageUrl("");
    } finally {
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading("Submitting...");
      // Submit data
      if (typeof onSubmit === "function") {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success("Successfully submitted", { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error("Unable to submit", { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: "",
    title: "",
    description: "",
    address: "",
    locality: "",
    price: "",
    guests: 1,
    beds: 1,
    baths: 1,
    ownerName: "",
    contact: "",
  };

  return (
    <div className="">
      <div className="mb-8 max-w-md  ">
        <ImageUpload
          initialImage={{ src: image, alt: initialFormValues.title }}
          onChangePicture={upload}
        />
      </div>

      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-8 text-gray-900 ">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Entire rental unit - Durgapur"
                disabled={disabled}
              />

              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Very charming and modern house, apartment in Durgapur..."
                disabled={disabled}
                rows={5}
              />
              <Input
                name="address"
                type="text"
                label="Address"
                placeholder="address"
                disabled={disabled}
              />
              <Input
                name="locality"
                type="text"
                label="Locality"
                placeholder="Locality"
                disabled={disabled}
              />
              <Input
                name="sqfeet"
                type="number"
                min="0"
                label="Sqfeet"
                placeholder="100"
                disabled={disabled}
              />

              <Input
                name="price"
                type="number"
                min="0"
                label="Price per month"
                placeholder="1000"
                disabled={disabled}
              />

              <div className="flex space-x-4">
                <Input
                  name="guests"
                  type="number"
                  min="0"
                  label="Guests"
                  placeholder="2"
                  disabled={disabled}
                />
                <Input
                  name="beds"
                  type="number"
                  min="0"
                  label="Beds"
                  placeholder="1"
                  disabled={disabled}
                />
                <Input
                  name="baths"
                  type="number"
                  min="0"
                  label="Baths"
                  placeholder="1"
                  disabled={disabled}
                />
              </div>
              <Input
                name="ownerName"
                type="text"
                label="Name"
                placeholder="Name"
                disabled={disabled}
              />
              <Input
                name="contact"
                type="tel"
                label="Contact"
                placeholder="123-456-789"
                disabled={disabled}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                aria-label="Submit"
                disabled={disabled || !isValid}
                className="rounded-md bg-purple-600 px-6 py-2 text-white transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-purple-600"
              >
                {isSubmitting ? "Submitting..." : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ListingForm.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    locality: PropTypes.string,
    sqfeet: PropTypes.number,
    description: PropTypes.string,
    price: PropTypes.number,
    guests: PropTypes.number,
    beds: PropTypes.number,
    baths: PropTypes.number,
    ownerName: PropTypes.string,
    contact: PropTypes.string,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ListingForm;
