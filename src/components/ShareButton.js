import React from "react";
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
      {/* <WhatsappShareButton
        url={`/homes/${id}`}
        title={"next-share is a social share buttons for your next React apps."}
        separator=":: "
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={"http://localhost:3000/homes/clguzf1lc0007txgwleqhbjhq"}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <Popover className="relative">
      <Popover.Button>Solutions</Popover.Button>

      <Popover.Panel className="absolute z-10 bg-white ">
        <div className="grid grid-cols-2  w-full">
          <a href="/analytics" className="bg-white " >Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>

      </Popover.Panel>
    </Popover> */}
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
                {/* <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              /> */}
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
                    <div className="z-10 flex w-36 flex-col items-center gap-1 rounded-md bg-white p-4 shadow-md">
                      <div className="flex w-36 cursor-pointer items-center justify-start space-x-1 rounded-md p-1 hover:bg-gray-200">
                        <WhatsappShareButton
                          url={`/homes/${id}`}
                          title={
                            "next-share is a social share buttons for your next React apps."
                          }
                          separator=":: "
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <span className="">WhatsApp</span>
                      </div>
                      <div className="flex w-36 cursor-pointer items-center space-x-1 rounded-md p-1 hover:bg-gray-200">
                        <TelegramShareButton
                          url={`/homes/${id}`}
                          title={
                            "next-share is a social share buttons for your next React apps."
                          }
                        >
                          <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <span className="">Telegram</span>
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
