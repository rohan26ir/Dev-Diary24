import React from 'react';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const handleForm = (e) => {
    e.preventDefault();
    
    // Show SweetAlert2 popup
    Swal.fire({
      title: 'Success!',
      text: 'Your message has been sent.',
      icon: 'success',
      timer: 2000, // Auto-close after 2 seconds
      timerProgressBar: true,
      showConfirmButton: false, // Hide the "OK" button
    });
  };

  return (
    <div className="flex items-center justify-center w-11/12 mx-auto h-full">
      <form
        action=""
        onSubmit={handleForm}
        className="relative w-full h-full bg-white/20 p-8 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Decorative background element */}
        <div className="absolute -left-36 bottom-8 w-80 h-80 bg-white/20 rotate-45 rounded-3xl shadow-md z-0"></div>

        {/* Form heading */}
        <h2 className="text-3xl font-bold text-white mb-4 text-center z-10 relative">
          Contact Us
        </h2>

        {/* Name input */}
        <div className="relative mb-4 z-10">
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
          </svg>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="w-full pl-10 pr-3 py-2 text-sm text-white bg-transparent border-b-2 border-white/20 focus:border-black outline-none transition-colors"
            required
          />
        </div>

        {/* Email input */}
        <div className="relative mb-4 z-10">
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-6.236 3.742a1 1 0 0 1-.994 0L1 5.383V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.383Z" />
          </svg>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-2 text-sm text-white bg-transparent border-b-2 border-white/20 focus:border-black outline-none transition-colors"
            required
          />
        </div>

        {/* Message textarea */}
        <div className="relative mb-4 z-10">
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9ZM3.5 3A.5.5 0 0 0 3 3.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-9ZM4 5h8v1H4V5Zm0 3h5v1H4V8Z" />
          </svg>
          <textarea
            id="message"
            placeholder="Message"
            rows="4"
            className="w-full pl-10 pr-3 py-2 text-sm text-white min-h-40 rounded-lg bg-black border-b-2 border-white/20 focus:border-black outline-none transition-colors resize-none"
            required
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="button"
          className="relative w-full py-2 mt-4 text-white text-sm font-medium bg-[#E22831]/70 hover:bg-[#E22831] rounded-md transition-colors z-10"
        >
          Submit
        </button>

        {/* Support link */}
        
      </form>
    </div>
  );
};

export default ContactForm;