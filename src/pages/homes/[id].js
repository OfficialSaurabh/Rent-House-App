import Image from "next/legacy/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiBed, BiBath, BiArea, BiEditAlt } from "react-icons/bi";
import { BsStars, BsTriangleFill, BsPeople, BsTelephone } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import CardSwiper from "../../components/CardSwiper";
import AuthModal from "../../components/AuthModal";
import ShareButton from "../../components/ShareButton";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Instantiate Prisma Client
const prisma = new PrismaClient();

export async function getStaticPaths() {
  // Get all the homes IDs from the database
  const homes = await prisma.home.findMany({
    select: { id: true },
  });

  return {
    paths: homes.map(home => ({
      params: { id: home.id },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // Get the current home from the database
  const home = await prisma.home.findUnique({
    where: { id: params.id },
  });

  if (home) {
    return {
      props: JSON.parse(JSON.stringify(home)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

const ListedHome = (home = null) => {
  const { data: session } = useSession();
  const [isOwner, setIsOwner] = useState(false);

  // console.log(isOwner);
  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const owner = await axios.get(`/api/homes/${home.id}/owner`);
          setIsOwner(owner.data.email === session.user.email);
          // console.log(session.user.email);
        } catch (e) {
          setIsOwner(false);
        }
      }
    })();
  }, [session?.user, home.id]);

  // const user = session?.user;
  // const isLoadingUser = status === "loading";

  // Show onwer contact info
  const [showOnwer, setShowOwner] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setShowOwner(true);
      } catch (e) {
        setShowOwner(false);
      }
    })();
  }, [home.id]);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Retrieve the Next.js router
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const deleteHome = async () => {
    let toastId;
    try {
      toastId = toast.loading("Deleting...");
      setDeleting(true);
      // Delete home from DB
      await axios.delete(`/api/homes/${home.id}`);
      // Redirect user
      toast.success("Successfully deleted", { id: toastId });
      router.push("/homes");
    } catch (e) {
      console.log(e);
      toast.error("Unable to delete home", { id: toastId });
      setDeleting(false);
    }
  };

  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/user/favorites");
        setFavorites(data);
      } catch (e) {
        setFavorites([]);
      }
    })();
  }, []);

  const isFavorite = !!favorites.find(favoriteId => favoriteId === home.id);

  const toggleFavorite = id => {
    try {
      toast.dismiss("updateFavorite");
      setFavorites(prev => {
        const isFavorite = prev.find(favoriteId => favoriteId === id);
        // Remove from favorite
        if (isFavorite) {
          axios.delete(`/api/homes/${id}/favorite`);
          return prev.filter(favoriteId => favoriteId !== id);
        }
        // Add to favorite
        else {
          axios.put(`/api/homes/${id}/favorite`);
          return [...prev, id];
        }
      });
    } catch (e) {
      toast.error("Unable to update favorite", { id: "updateFavorite" });
    }
  };

  // Fallback version
  if (router.isFallback) {
    return "Loading...";
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 ">
        <div className="mx-auto max-w-screen-lg p-5 ">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4">
            <div>
              <h1 className="truncate text-3xl font-semibold text-gray-800 ">
                {home?.title ?? ""}
              </h1>
              <p className="text-gray-700">{home?.address ?? ""}</p>
            </div>
            <div className="flex items-center space-x-2 ">
              {isOwner ? (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    aria-label="Edit home"
                    disabled={deleting}
                    onClick={() => router.push(`/homes/${home.id}/edit`)}
                    className="flex items-center rounded-md border border-gray-800 px-4 py-1 text-lg text-gray-800 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-800 disabled:opacity-50"
                  >
                    Edit
                    <span className="pl-1 text-center  text-xl">
                      <BiEditAlt />
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-label="Delete home"
                    disabled={deleting}
                    onClick={deleteHome}
                    className=" flex items-center rounded-md border  border-red-700 px-4 py-1 text-center text-lg text-red-700 transition hover:bg-red-700 hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-purple-700 disabled:text-white disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                    <span className="pl-1 text-center  text-xl">
                      <MdDeleteOutline />
                    </span>
                  </button>
                </div>
              ) : null}
              <ShareButton id={home.id} />
            </div>
          </div>
          <div className="aspect-h-9 aspect-w-16 relative mt-6 overflow-hidden rounded-lg bg-gray-200 shadow-md">
            {home?.image ? (
              <Image
                src={home.image}
                alt={home.title}
                layout="fill"
                objectFit="cover"
              />
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-5 py-5  lg:grid-cols-3">
            <div className="col-span-0 space-y-10 lg:col-span-2 ">
              <div className=" flex items-center justify-between rounded-md border border-gray-300 bg-white px-5 py-3 shadow-sm ">
                <div className=" space-y-1 ">
                  <span className="hidden font-semibold text-gray-500 md:block">
                    Bedrooms
                  </span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BiBed />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.beds ?? 0}
                    </span>
                  </div>
                </div>
                <div className=" space-y-1 ">
                  <span className="hidden font-semibold text-gray-500 md:block">
                    Bathrooms
                  </span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BiBath />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.baths ?? 0}
                    </span>
                  </div>
                </div>
                <div className=" space-y-1 ">
                  <span className="hidden font-semibold text-gray-500 md:block">
                    SqFeet
                  </span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BiArea />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.sqfeet ?? 0}
                    </span>
                  </div>
                </div>
                <div className=" space-y-1 ">
                  <span className="hidden font-semibold text-gray-500 md:block">
                    Guests
                  </span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BsPeople />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.guests ?? 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <h1 className="text-2xl font-bold text-gray-700 ">
                  About this house
                </h1>
                <p className=" text-lg text-gray-800  ">
                  {home?.description ?? ""}
                </p>
              </div>
            </div>
            <div className="h-80 space-y-3 rounded-md bg-white p-5 py-10 shadow-md lg:h-96 lg:space-y-5 ">
              <div className="flex  justify-between items-center">
                <div className="">
                  <span className=" font-semibold text-gray-500 ">
                    Rent Price
                  </span>
                  <p className="mb-2 text-xl font-bold tracking-tight text-purple-700 ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(home.price ?? 0)}{" "}
                    <span className=" text-sm font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Favorite home"
                  onClick={e => {
                    e.preventDefault();
                    session?.user ? toggleFavorite(home.id) : openModal();
                  }}
                  className=" flex h-10 w-10 items-center justify-center  rounded-full border border-purple-700 text-xl text-purple-800 "
                >
                  {/* <AiFillHeart className={`w-7 h-7  transition ${
              favorite ? 'text-purple-800' : ' text-purple-300'
            }`}  /> */}
                  {isFavorite ? (
                    <AiFillHeart className="h-7 w-7  text-purple-800 transition" />
                  ) : (
                    <AiOutlineHeart className="h-7 w-7  text-purple-700 transition" />
                  )}
                </button>
              </div>
              <div className="">
                <span className=" font-semibold text-gray-500 ">Owner</span>
                <p className="mb-3 line-clamp-1 font-bold text-gray-700   ">
                  {home.ownerName ?? ""}
                </p>
              </div>
              <div className="space-y-2">
                <span className=" font-semibold text-gray-500 ">Posted On</span>
                <p className="mb-3 line-clamp-1 w-36 rounded-md bg-purple-200 p-1 font-medium text-purple-700 outline outline-1 outline-purple-400  ">
                  {new Date(home.createdAt).toDateString() ?? ""}
                </p>
              </div>
              {/* Dextop View Show owner contact */}
              <div className="hidden space-y-2 p-5 text-center lg:block  ">
                <Link href="tel:${showOnwer}" className=" ">
                  {showOnwer}
                </Link>
                <button
                  onClick={() => {
                    session?.user
                      ? setShowOwner(`${home.contact}`)
                      : openModal();
                  }}
                  type="button"
                  aria-label="Show Contact"
                  className="flex w-full items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-white transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <span className="px-2 ">
                    <BsTelephone />
                  </span>
                  Show Contact
                </button>
              </div>
              {/* Mobile view Contact onwer button */}
              <div className=" block p-5 lg:hidden ">
                <button
                  onClick={() => {
                    session?.user
                      ? router.push(`tel:${home.contact}`)
                      : openModal();
                  }}
                  type="button"
                  aria-label="Contact Owner"
                  className="flex w-full items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-white transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <span className="px-2 ">
                    <BsTelephone />
                  </span>
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
          <div className=" mt-10 ">
            <p className=" py-5 text-2xl font-bold text-gray-700 ">
              Similar Houses
            </p>
            <CardSwiper />
          </div>
          <AuthModal show={showModal} onClose={closeModal} />
        </div>
      </div>
    </Layout>
  );
};
export default ListedHome;
