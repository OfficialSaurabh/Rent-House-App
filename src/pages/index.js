import Layout from "../components/Layout";
import Housee from "../../public/house11.jpg";
import Desktop from "../../public/desktop.jpg";
import faqimage from "../../public/faq.png";
import Image from "next/image";
import CardSwiper from "../components/CardSwiper";
import Faq from "../components/Faq";
import { SiReacthookform } from "react-icons/si";
import { AiOutlineCheck } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";


const Landing = () => {
  return (
    <Layout>
      <div className="  min-h-screen bg-gray-100">
        <div className=" flex flex-wrap justify-between bg-purple-100 p-5 px-5 sm:px-10 md:px-20 ">
          <div className=" space-y-5">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-4xl md:text-6xl">
              Discover <br></br>Most Suitable <br></br>Property
            </h1>
            <p className="text-xs text-gray-600 sm:text-sm md:text-lg">
              Find a variety of properties that suit you very easy, <br></br>
              Forget all difficulties in finding a residence for you
            </p>

          </div>
          <div className="  ">
            <Image
              className=" -mb-20 rounded-br-extraLarge rounded-tl-extraLarge pt-5"
              src={Housee}
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="mx-auto max-w-screen-lg">
          <div className="  mb-10 mt-20 p-5">
            <div className=" flex justify-between py-2 ">
              <p className=" text-2xl font-bold text-gray-700 ">
                Similar Houses
              </p>
              <Link href={"/allhouses"}>
                <button
                  type="button"
                  className="ml-4 rounded-md bg-purple-600 px-3 py-2 text-white transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  View All
                </button>
              </Link>

            <Search setFilter={setFilter} />
            <div className="flex justify-center lg:flex-none  ">
              <Grid homes={homes} />
            </div>
            <CardSwiper />
          </div>
          <div className=" p-5">
            <div className=" mb-10 justify-between rounded-md border bg-white p-5 pb-10 shadow-md">
              <div className="px-5">
                <h1 className="text-xl font-bold text-gray-800 sm:text-2xl md:text-4xl">
                  So, what&apos;s Rent House?
                </h1>
                <p className="text-xs sm:text-sm md:text-base">
                  The goal of our website is to streamline the rental process
                  for both landlords and tenants, making it easier and more
                  efficient to find and manage rental properties.
                </p>
              </div>
              <hr className="my-6 border-gray-700  sm:mx-auto lg:my-8" />
              <div className="flex flex-col-reverse px-5 sm:flex-row md:flex-row lg:flex-row">
                <div className="">
                  <div className="flex items-start gap-x-5 ">
                    <div className="rounded-full p-2 text-xl text-blue-500 outline outline-blue-400">
                      <span className=" ">
                        <SiReacthookform />
                      </span>
                    </div>
                    <div className="">
                      <h2 className="flex items-center gap-x-3 text-xl  font-bold text-gray-800 sm:text-2xl  md:text-xl">
                        Register online
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base">
                        Submit digital rental applications and credit reports
                        with Rent House&apos;s.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-x-5 py-5">
                    <div className="rounded-full p-2 text-xl text-teal-500 outline outline-teal-400">
                      <span className=" ">
                        <AiOutlineCheck />
                      </span>
                    </div>
                    <div className="">
                      <h2 className="flex items-center gap-x-3 text-xl  font-bold text-gray-800 sm:text-2xl  md:text-xl">
                        Easy listings
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base">
                        Our inventory is updated in real-time, so you&apos;ll always
                        see new rentals on Rent House first.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-x-5">
                    <div className="rounded-full p-2 text-xl text-pink-500 outline outline-pink-400">
                      <span className=" ">
                        <BiSearchAlt />
                      </span>
                    </div>
                    <div className="">
                      <h2 className="flex items-center gap-x-3 text-xl  font-bold text-gray-800 sm:text-2xl  md:text-xl">
                        Quick Searches
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base">
                        Filter by location, price range, bedroom count.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="">
                  <Image
                    className="pt-5"
                    src={Desktop}
                    alt=""
                    width={400}
                    height={400}
                  />
                </div> */}
              </div>
            </div>
            <div className="">
              <div className="mb-5 text-center">
                <h1 className="title-font text-center text-2xl font-medium text-gray-900 sm:text-3xl">
                  Frequently Asked Questions
                </h1>
              </div>
              <div className="grid grid-cols-1  lg:grid-cols-3 ">
                <div className=" flex items-baseline  ">
                  <Image
                    src={faqimage}
                    alt=""
                    width={400}
                    height={400}
                    className=" drop-shadow-md "
                  />
                </div>
                <div className="col-span-0 mt-5 lg:col-span-2">
                  <Faq />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
