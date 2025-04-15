import React from "react";
import teamP1 from "../../../assets/aboutus/new-team-01-circle.png";
import teamP2 from "../../../assets/aboutus/new-team-02-circle.png";
import teamP3 from "../../../assets/aboutus/new-team-03-circle.png";
import teamP4 from "../../../assets/aboutus/new-team-04-circle.png";
import teamP5 from "../../../assets/aboutus/new-team-05-circle.png";

const TheTeam = () => {
  const teamMembers = [
    { id: 1, image: teamP1, name: "Rohan", role: "Full Stack Developer" },
    { id: 2, image: teamP2, name: "Rohan", role: "Full Stack Developer" },
    { id: 3, image: teamP3, name: "Rohan", role: "Full Stack Developer" },
    { id: 4, image: teamP4, name: "Rohan", role: "Full Stack Developer" },
    { id: 5, image: teamP5, name: "Rohan", role: "Full Stack Developer" },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-5 ">
      {/* images Section */}
      <div className="grid gap-2 w-1/2  py-8">
  {/* First row with 2 centered images */}
  <div className="col-span-2 flex justify-center gap-2">
    {teamMembers.slice(0, 2).map((member) => (
      <div key={member.id} className="flex justify-center items-center border-8 rounded-full hover:border-[#E22831] transition-all duration-300 ease-in-out">
        <img src={member.image} alt="" className="h-28" />
      </div>
    ))}
  </div>

  {/* Second row with 3 images */}
  <div className="col-span-2 flex justify-center gap-2">
    {teamMembers.slice(2).map((member) => (
      <div key={member.id} className="flex justify-center items-center border-8 rounded-full hover:border-[#E22831] transition-all duration-300 ease-in-out ">
        <img src={member.image} alt="" className="h-32" />
      </div>
    ))}
  </div>
</div>


      {/* text section */}
      <div className="space-y-2 w-1/2">
        <p className="font-bold text-white/40 w-fit">The Team</p>
        <h2 className="text-8xl text-white/80 leading-20 font-bold max-w-xl ">
          Our creative team
        </h2>
        <p className="text-gray-300 max-w-xl">
          <span className="text-2xl font-bold">W</span>e are a group of
          passionate designers, developers, and strategists dedicated to
          crafting beautiful and functional digital experiences. Our team
          combines creativity and technology to bring your ideas to life with
          precision and purpose.
        </p>
      </div>
    </div>
  );
};

export default TheTeam;
