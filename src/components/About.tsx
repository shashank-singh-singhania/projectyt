// About.tsx
"use client";
// import dotenv from "dotenv"
// dotenv.config()

import React from "react";
// import SideNav from "@/components/SideNav";

const domain = process.env.DOMAIN
const uri = process.env.MONGODB_URI
console.log(domain)
console.log(uri)

const About: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* <SideNav /> */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is Our Site?</h2>
            <p className="text-gray-300 text-lg">
              Our site is a platform designed to provide users with high-quality video content across various categories. Whether you&apos;re looking for educational materials, entertainment, or inspirational videos, our site offers a curated selection to meet your needs. Our mission is to deliver an exceptional viewing experience through a user-friendly interface and a vast collection of videos.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Meet the Team GTC</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-gray-700 p-4 rounded-lg shadow-md">
                  <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-bold text-center">{member.name}</h3>
                  <p className="text-gray-400 text-center">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Project Manager",
    photo: "https://random.imagecdn.app/200/200",
  },
  {
    name: "Bob Smith",
    role: "Lead Developer",
    photo: "https://random.imagecdn.app/300/300",
  },
  {
    name: "Charlie Brown",
    role: "UI/UX Designer",
    photo: "https://random.imagecdn.app/400/400",
  },
  {
    name: "Daisy Ridley",
    role: "Content Strategist",
    photo: "https://random.imagecdn.app/500/500",
  },
  {
    name: "Ethan Hunt",
    role: "Marketing Specialist",
    photo: "https://random.imagecdn.app/600/600",
  },
  {
    name: "Tom Hanks",
    role: "Marketing Specialist",
    photo: "https://random.imagecdn.app/700/700",
  },
];

export default About;
