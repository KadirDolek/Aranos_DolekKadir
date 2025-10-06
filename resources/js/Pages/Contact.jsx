import Nav from '@/Components/Nav'
import Footer from '@/Components/Footer'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Contact({ bannerImage }) {
  return (
    <div>
      <Nav />
      {/* Header Section */}
      <div className="bg-[#E8FAFA] flex justify-center gap-12 items-center py-8">
        <div className="ml-[15%]">
          <h2 className="font-medium text-4xl">Contact Us</h2>
          <p className="text-gray-600 mt-2">Home - Contact us</p>
        </div>
        <div>
          <img className="w-full max-w-xs h-auto" src={bannerImage} alt="Contact Banner" />
        </div>
      </div>

      {/* === Container global === */}
      <div className="w-[80%] mx-auto my-10">
        {/* Iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.79422420027!2d4.3387872765001445!3d50.855470258119205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c38e84af80dd%3A0xe85cd9cd0218a4aa!2sPl.%20de%20la%20Minoterie%2010%2C%201080%20Molenbeek-Saint-Jean!5e1!3m2!1sfr!2sbe!4v1759241554052!5m2!1sfr!2sbe"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-md"
        />

        {/* Formulaire + Infos */}
        <div className="grid grid-cols-3 gap-10 mt-10 items-start">
          {/* Formulaire */}
          <div className="col-span-2 bg-white p-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="mb-5 text-xl font-bold">Get in Touch</h3>
            <textarea 
              placeholder="Enter Message" 
              className="w-full p-3 mb-4 rounded border border-gray-300 resize-y min-h-[120px]"
            ></textarea>
            <div className="flex gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="flex-1 p-3 rounded border border-gray-300"
              />
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="flex-1 p-3 rounded border border-gray-300"
              />
            </div>
            <input 
              type="text" 
              placeholder="Enter Subject" 
              className="w-full p-3 mb-4 rounded border border-gray-300"
            />
            <button className="bg-[#f72585] text-white py-3 px-5 rounded font-bold cursor-pointer hover:bg-[#d61a6c] transition-colors">
              SEND MESSAGE
            </button>
          </div>

          {/* Infos Contact */}
          <div className="bg-[#EBFDFC] p-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col gap-8">
            <div className="flex items-center gap-2.5">
              <span className="text-lg text-gray-700">
                <IoLocationSharp />
              </span>
              <p className="m-0 text-sm text-gray-800">
                <strong>Place de la minoterie, Molenbeek.</strong><br />
                Bruxelles, BE 1080
              </p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="text-lg text-gray-700">
                <FaPhoneAlt />
              </span>
              <p className="m-0 text-sm text-gray-800">
                <strong>0477 88 99 00</strong><br />
                Mon to Fri 9am to 6pm
              </p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="text-lg text-gray-700">
                <IoMdMail />
              </span>
              <p className="m-0 text-sm text-gray-800">
                <strong>mouss@mouss.be</strong><br />
                Send us your query anytime!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}