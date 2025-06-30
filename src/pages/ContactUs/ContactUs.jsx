import React from "react";
import ContactHero from "./components/ContactHero";
import ContactCards from "./components/ContactCards";
import ContactForm from "./components/ContactForm";
import ContactLocation from "./components/ContactLocation";
import ContactImage from "./components/ContactImage";

const ContactUs = () => {
  return (
    <div className="space-y-4 mx-auto">
      <ContactHero></ContactHero>

      <ContactCards></ContactCards>

      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Get in Touch</h2>
        <p className="text-center max-w-xl mx-auto mb-2 px-4">
          Have questions, feedback, or need support? We’re here to help! Feel
          free to reach out to us using the contact form or find us on the map
          below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto justify-center items-center py-4  h-full  overflow-hidden">
          <div className="h-full w-full">
            <div className="hidden md:block h-full w-full relative z-0"><ContactLocation></ContactLocation></div>
            <div className="md:hidden"><ContactImage></ContactImage></div>
          </div>
          <div>
            <ContactForm></ContactForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
