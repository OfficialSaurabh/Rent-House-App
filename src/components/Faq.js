import React from "react";

export default function Faq() {
  return (
    <div>
      <section className="text-gray-700">
        <div className="container mx-auto px-5">
          
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="-mx-2 flex flex-wrap sm:mx-auto sm:mb-2 "
          >
            <div className="w-full px-4 py-2 ">
              <details className="mb-4">
                <summary className="rounded-md text-purple-700 outline outline-1 outline-purple-400 hover:bg-purple-200 px-5 py-5 font-semibold">
                How do I find rental properties on the website?
                </summary>

                <p className="pl-4 pt-4 text-left  ">
                You can search for rental properties on our website by using our search bar or filtering options. You can filter by location, price range, number of bedrooms, and other amenities.
                </p>
              </details>
              <details className="mb-4">
                <summary className="rounded-md text-purple-700 outline outline-1 outline-purple-400 hover:bg-purple-200 px-4 py-5 font-semibold">
                How do I list my property on Rent House?
                </summary>

                <p className="pl-4 pt-4 text-left antialiased ">
                Each rental property may have different application procedures, but typically you can apply by filling out an online application and submitting it along with any required documentation such as proof of income and a background check.
                </p>
              </details>
              <details className="mb-4">
                <summary className="rounded-md  text-purple-700 outline outline-1 outline-purple-400 hover:bg-purple-200 px-5 py-5 font-semibold">
                What fees do I need to pay to rent a property?
                </summary>

                <p className="pl-4 pt-4 text-left antialiased ">
                Rental fees vary depending on the property and location. Typically, you will need to pay a security deposit, first and last month&apos;s rent, and any application fees.
                </p>
              </details>
              <details className="mb-4">
                <summary className="rounded-md  text-purple-700 outline outline-1 outline-purple-400 hover:bg-purple-200 px-5 py-5 font-semibold">
                How do I contact the property owner?
                </summary>

                <p className="pl-4 pt-4 text-left antialiased ">
                You can contact the property owner or manager by filling out the contact form on the listing page or by using the phone number or email address provided in the listing. Some listings may also offer a live chat option or a scheduling tool to set up a viewing or appointment.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}