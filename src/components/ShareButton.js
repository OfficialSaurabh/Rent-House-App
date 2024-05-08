import React from "react";
import Head from "next/head";

import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiShareAlt } from "react-icons/bi";
function ShareButton({ id = home.id }) {
  return (
    <div>
      <Head>
        <title>RentHouse</title>
        <meta
          name="The Rent House web app"
          content="Find your next home with ease on our Rent House web app."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" w-full ">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center space-x-1 rounded-md border border-purple-700 px-4 py-1 text-center text-lg text-purple-800 transition hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2    `}
              >
                <BiShareAlt />
                <span>Share</span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className=" absolute z-50 ">
                  <div className=" ">
                    <div className="z-10 flex w-36 flex-col items-center justify-start gap-1 rounded-md bg-white p-4 shadow-md">
                      <div className="  rounded-md p-1 hover:bg-gray-200">
                        <WhatsappShareButton
                          url={`https://rent-house-app.vercel.app///homes/${id}`}
                          title={
                            "Check this out! I found this awesome property on RentHouse."
                          }
                          separator=":: "
                          // className="flex items-center justify-start space-x-1"
                        >
                          <div className="flex items-center space-x-1 ">
                            <WhatsappIcon size={32} round />
                            <span className="">WhatsApp</span>
                          </div>
                        </WhatsappShareButton>
                      </div>
                      <div className="items-center rounded-md p-1 hover:bg-gray-200">
                        <TelegramShareButton
                          url={`https://rent-house.tech//homes/${id}`}
                          title={
                            "Check this out! I found this awesome property on RentHouse."
                          }
                        >
                          <div className="flex items-center space-x-1 ">
                            <TelegramIcon size={32} round />
                            <span className="">Telegram</span>
                          </div>
                        </TelegramShareButton>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
}

export default ShareButton;
