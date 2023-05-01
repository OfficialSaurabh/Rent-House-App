import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import Input from "./Input";
// import { HiOutlineSparkles, HiOutlineMailOpen, AiOutlineClose } from '@heroicons/react/outline';
import { HiOutlineSparkles, HiOutlineMailOpen } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .required("This field is required"),
});

const Confirm = ({ show = false, email = "" }) => (
  <Transition appear show={show} as={Fragment}>
    <div className="fixed inset-0 z-50">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-white" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="flex h-full items-center justify-center p-8 text-gray-800">
          <div className="transform overflow-hidden transition-all">
            <h3 className="text-center text-lg font-medium leading-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <HiOutlineMailOpen className="h-12 w-12 shrink-0 text-purple-500" />
              </div>
              <p className="mt-2 text-2xl font-semibold">Confirm your email</p>
            </h3>

            <p className="mt-4 text-center text-lg">
              We emailed a magic link to <strong>{email ?? ""}</strong>.
              <br />
              Check your inbox and click the link in the email to login or sign
              up.
            </p>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Transition>
);

const AuthModal = ({ show = false, onClose = () => null }) => {
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const signInWithEmail = async ({ email }) => {
    let toastId;
    try {
      toastId = toast.loading("Loading...");
      setDisabled(true);
      // Perform sign in
      const { error } = await signIn("email", {
        redirect: false,
        callbackUrl: window.location.href,
        email,
      });
      // Something went wrong
      if (error) {
        throw new Error(error);
      }
      setConfirm(true);
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Unable to sign in", { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

  const signInWithGoogle = () => {
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign in
    signIn("google", {
      callbackUrl: window.location.href,
    });
  };

  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  // Reset modal
  useEffect(() => {
    if (!show) {
      // Wait for 200ms for aniamtion to finish
      setTimeout(() => {
        setDisabled(false);
        setConfirm(false);
        setShowSignIn(false);
      }, 200);
    }
  }, [show]);

  // Remove pending toasts if any
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-md transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all sm:rounded-md  ">
              {/* Close icon */}
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-2 top-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                <AiOutlineClose className="h-5 w-5 text-black " />
              </button>

              <div className="p-12">
                <div className="">
                  <div className="flex justify-center">
                    <Link legacyBehavior href="/">
                      <a className="flex items-center space-x-1">
                        <HiOutlineSparkles className="h-8 w-8 shrink-0 text-purple-800" />
                        <span className="text-xl  font-semibold tracking-wide">
                          <span className="text-xl font-semibold text-black">
                            Rent
                          </span>
                          <span className="text-purple-800">House</span>
                        </span>
                      </a>
                    </Link>
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-center text-lg font-bold text-gray-900 sm:text-2xl "
                  >
                    {showSignIn ? "Welcome back!" : "Create your account"}
                  </Dialog.Title>

                  {!showSignIn ? (
                    <Dialog.Description className="mt-2 text-center text-base text-gray-500">
                      Please create an account to list your homes and bookmark
                      your favorite ones.
                    </Dialog.Description>
                  ) : null}

                  <div className="mt-10">
                    {/* Sign with Google */}
                    <button
                      disabled={disabled}
                      aria-label="Sign in with Google"
                      onClick={() => signInWithGoogle()}
                      className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border p-2 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                    >
                      <FcGoogle className=" h-8 w-8 " />
                      <span>Sign {showSignIn ? "in" : "up"} with Google</span>
                    </button>

                    {/* Sign with email */}
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={SignInSchema}
                      validateOnBlur={false}
                      onSubmit={signInWithEmail}
                    >
                      {({ isSubmitting, isValid, values, resetForm }) => (
                        <Form className="mt-4">
                          <Input
                            name="email"
                            type="email"
                            placeholder="elon@spacex.com"
                            disabled={disabled}
                            spellCheck={false}
                          />

                          <button
                            type="submit"
                            aria-label="Submit"
                            disabled={disabled || !isValid}
                            className="mt-6 w-full rounded-md bg-purple-600 px-8 py-2 text-white transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-purple-600"
                          >
                            {isSubmitting
                              ? "Loading..."
                              : `Sign ${showSignIn ? "in" : "up"}`}
                          </button>

                          <p className="mt-2 text-center text-sm text-gray-500">
                            {showSignIn ? (
                              <>
                                Don&apos;t have an account yet?{" "}
                                <button
                                  type="button"
                                  aria-label="Sign up"
                                  disabled={disabled}
                                  onClick={() => {
                                    setShowSignIn(false);
                                    resetForm();
                                  }}
                                  className="font-semibold text-purple-500 underline underline-offset-1 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-purple-500"
                                >
                                  Sign up
                                </button>
                                .
                              </>
                            ) : (
                              <>
                                Already have an account?{" "}
                                <button
                                  type="button"
                                  aria-label="Log in"
                                  disabled={disabled}
                                  onClick={() => {
                                    setShowSignIn(true);
                                    resetForm();
                                  }}
                                  className="font-semibold text-purple-500 underline underline-offset-1 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-purple-500"
                                >
                                  Log in
                                </button>
                                .
                              </>
                            )}
                          </p>

                          <Confirm
                            show={showConfirm}
                            email={values?.email ?? ""}
                          />
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

AuthModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AuthModal;
