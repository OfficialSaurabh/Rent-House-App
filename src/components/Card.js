import Link from "next/link";
import Image from "next/legacy/image";
import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { BsStars, BsTriangleFill } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "./AuthModal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

// import { HeartIcon } from '@heroicons/react/solid';
// create fuction to classes and filter
const cn = (...classes ) => {
  return classes.filter(Boolean).join(' ')
}

const Card = ({
  id = "",
  image = "",
  title = "",
  address = "",
  sqfeet = 0,
  guests = 0,
  beds = 0,
  baths = 0,
  price = 0,
  favorite = false,
  onClickFavorite = () => null,
}) => {
  // const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === "loading";
  const [isLoading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Link href={`/homes/${id}`}>
      <div className="relative max-w-sm rounded-lg bg-white shadow-md hover:shadow-xl md:w-full xl:w-80">
        {/* <Image className="rounded-t-lg  " src="/dummyhouse.png" width={369} height={100} alt="" /> */}
        <div className=" aspect-h-10 rounded-t-md aspect-w-16 overflow-hidden ">
          {image ? 
          (
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className={cn(
                'duration-700 ease-in-out group-hover:opacity-75',
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0'
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-gray-200">
              <BiBuildingHouse className="text-4xl text-purple-500" />
            </div>
          )}
        </div>

        <div className=" absolute  z-10 -ml-3 -mt-5 flex  items-center gap-x-1 rounded-br-lg rounded-tl-lg rounded-tr-md bg-purple-700 px-7 py-1 text-white ">
          {" "}
          <BsStars /> POPULAR
        </div>
        <BsTriangleFill className=" absolute  -ml-2.5 rotate-12  text-purple-900" />
        <div className="flex justify-between px-5 pt-8">
          <p className="mb-2 text-xl font-bold tracking-tight text-purple-700 ">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(price ?? 0)}{" "}
            <span className=" text-sm font-normal text-gray-500">/month</span>
          </p>
          <button
            type="button"
            onClick={e => {
              e.preventDefault();
              session?.user && typeof onClickFavorite === "function"
                ? onClickFavorite(id)
                : openModal();

              // if (typeof onClickFavorite === "function") {
              //   onClickFavorite(id);
              // }
            }}
            className=" flex h-10 w-10 items-center justify-center  rounded-full border border-purple-700 text-xl text-purple-800 "
          >
            {/* <AiFillHeart className={`w-7 h-7  transition ${
              favorite ? 'text-purple-800' : ' text-purple-300'
            }`}  /> */}
            {favorite ? (
              <AiFillHeart className="h-7 w-7  text-purple-800 transition" />
            ) : (
              <AiOutlineHeart className="h-7 w-7  text-purple-700 transition" />
            )}
          </button>
        </div>
        <div className="space-y-4  px-5 ">
          <h5 className="mb-2 line-clamp-1 text-2xl font-bold tracking-tight  text-gray-900 ">
            {title ?? ""}
          </h5>
        </div>
        <div className="divide-y-2 px-5">
          <p className="mb-3 line-clamp-1 font-normal text-gray-700   ">
            {/* <IoLocationOutline className="mr-1 text-xl font-bold text-purple-800 " /> */}
            {address ?? ""}
          </p>

          <div className="">
            <div className=" flex flex-wrap justify-between py-3">
              <p className="flex items-center py-2   ">
                <span className="text-xl text-purple-800  sm:text-base ">
                  <BiBed />
                </span>
                <span className="px-1 text-lg text-gray-700 sm:text-sm">
                  {beds ?? 0}
                </span>
                <span className="hidden text-sm text-gray-700 sm:block ">
                  Beds
                </span>
              </p>
              <p className="flex items-center   ">
                <span className=" text-xl text-purple-800  sm:text-base ">
                  <BiBath />
                </span>
                <span className="px-1 text-lg text-gray-700 sm:text-sm">
                  {baths ?? 0} 
                </span>
                <span className="hidden text-sm text-gray-700 sm:block ">
                Bathrooms
                </span>
              </p>
              <p className=" flex items-center   ">
                <span className=" text-xl text-purple-800  sm:text-base ">
                  <BiArea />
                </span>
                <span className="px-1 text-lg text-gray-700 sm:text-sm">
                  {" "}
                  {sqfeet ?? 0} 
                </span>
                <span className="hidden text-sm text-gray-700 sm:block ">
                Sqfeet
                </span>
              </p>
            </div>
          </div>
        </div>
        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  sqfeet: PropTypes.number,
  guests: PropTypes.number,
  beds: PropTypes.number,
  baths: PropTypes.number,
  price: PropTypes.number,
  favorite: PropTypes.bool,
  onClickFavorite: PropTypes.func,
};

export default Card;
