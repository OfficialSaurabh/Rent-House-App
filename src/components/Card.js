import Link from "next/link";
import Image from "next/legacy/image";
import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { BsStars, BsTriangleFill } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import {IoLocationOutline} from "react-icons/io5";


// import { HeartIcon } from '@heroicons/react/solid';

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
}) => (

  <Link href={`/homes/${id}`}>
    <div className="relative max-w-sm xl:w-80 md:w-full rounded-lg shadow-md hover:shadow-xl bg-white">
      {/* <Image className="rounded-t-lg  " src="/dummyhouse.png" width={369} height={100} alt="" /> */}
     <div className=" overflow-hidden aspect-w-16 aspect-h-10 ">
     {image ? (
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="hover:opacity-80 transition rounded-t-lg  "
        />
      ) : 
      <div className="flex items-center justify-center h-full w-full bg-gray-200 rounded-t-lg">
        <BiBuildingHouse className="text-4xl text-purple-500" />
      </div>
      }
     </div>

      <div className=" absolute  z-10 -mt-5 -ml-3 flex  items-center gap-x-1 rounded-tl-lg rounded-tr-md rounded-br-lg bg-purple-700 py-1 px-7 text-white ">
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
           if (typeof onClickFavorite === 'function') {
             onClickFavorite(id);
           }
         }}
         className=" flex h-10 w-10 items-center justify-center  rounded-full border border-purple-700 text-xl text-purple-800 ">
          {/* <AiFillHeart className={`w-7 h-7  transition ${
              favorite ? 'text-purple-800' : ' text-purple-300'
            }`}  /> */}
            {favorite ? (
              <AiFillHeart className="w-7 h-7  transition text-purple-800" />
            ) : (
              <AiOutlineHeart className="w-7 h-7  transition text-purple-700" />
            )}
        </button>
      </div>
      <div className="space-y-4  px-5 ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  line-clamp-1 ">
          {title ?? ""}
        </h5>
      </div>
      <div className="divide-y-2 px-5">
        <p className="mb-3 flex items-center font-normal text-gray-700 line-clamp-1   ">
          <IoLocationOutline className="text-xl text-purple-800 font-bold mr-1 " />
          {address ?? ""}
        </p>
        <div className="flex flex-wrap justify-between py-3">
          <p className="flex items-center py-2   ">
            <span className=" text-purple-800 ">
              <BiBed />
            </span>
            <span className="px-1 text-sm text-gray-700">{beds ?? 0} Beds</span>
          </p>
          <p className="flex items-center   ">
            <span className=" text-purple-800 ">
              <BiBath />
            </span>
            <span className="px-1 text-sm text-gray-700">
              {baths ?? 0} Bathrooms
            </span>
          </p>
          <p className=" flex items-center   ">
            <span className=" text-purple-800 ">
              <BiArea />
            </span>
            <span className="px-1 text-sm text-gray-700">
              {" "}
              {sqfeet ?? 0} Sqfeet
            </span>
          </p>
        </div>
      </div>
    </div>
  </Link>
);

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
