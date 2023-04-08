import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import LoadingDots from "../components/LoadingDots";
import chroma from "chroma-js";
import React, { Fragment } from "react";
import html2canvas from "html2canvas";

import { ClipboardIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState("");

  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleDownloadClick() {
    console.log("Hello from download button");
    const cpimage = document.querySelector("#cpImage");
    if (cpimage instanceof HTMLElement) {
      html2canvas(cpimage).then(function (canvas) {
        const downloadLink = document.createElement("a");
        downloadLink.download = "cpimage.png";
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.click();
      });
    }
  }
  const prompt = `I need you to act as a UX designer and identify the 2 pain points that has ATSI communities as target users. The description of the app is ${bio} and can you build 2 real-time different persona based on that. limit the pain points in 50 characters and persona to 100 characters that should include goals etc..${
    bio.slice(-1) === "." ? "" : "."
  }`;
  console.log({
    prompt,
  });

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };
  console.log("Hello ", generatedBios);
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen sm:py-12 bg-[#040617]">
      <img
        src="/Beams-new.png"
        alt=""
        className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        width="100%"
        height="100%"
      />

      <div className="relative container max-width: 1280px flex flex-col mx-auto items-center">
        {/* Top Headline */}
        <div className="mx-auto z-50 rounded-lg max-w-6xl w-full px-4 py-8 mb-20">
          <section className="p-8">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <div
                contentEditable
                className="bg-gray-900 rounded-full h-24 w-24 flex items-center justify-center mb-6 text-4xl text-white"
              >
                🎨
              </div>
              <h1 className="text-5xl p-4 w-auto md:w-full font-bold text-center mb-4 bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent bg-clip-text text-transparent">
                Color Palette Generator
              </h1>
              <p className="text-xl font-light sm:text-2xl max-w-[708px] text-gray-300 text-center">
                Generate amazing colors for your app in seconds with our AI
                powered tool that are in compliance with ATSI communities.
              </p>
            </div>
          </section>
        </div>
        <div className=" mx-auto z-50 rounded-lg max-w-6xl flex items-center justify-center w-full px-4 py-8 mb-20 ">
          <div className="max-w-6xl w-full ">
            <div className="border-2 border-[#2F323B] p-8 rounded-xl mb-10">
              <div className="flex items-center space-x-3">
                <div
                  contentEditable
                  className="flex items-center justify-center text-xl text-left font-medium text-gray-300"
                >
                  Step - 1️⃣
                </div>
              </div>
              <div className="mt-6 flex mb-2 items-center space-x-3">
                <p className="text-left text-xl font-medium sm:text-2xl font-medium text-gray-300">
                  App description:
                </p>
              </div>
              <div className=" flex items-center space-x-3">
                <p className="text-left text-xl font-medium sm:text-xl font-light text-gray-500">
                  Enter the basic information about the functionality of the
                  application
                </p>
              </div>

              {/* Enter a paragraph */}

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full  rounded-xl text-white font-medium shadow-sm focus:border-[#2F323B] bg-[#10131C] border-2 border-[#2F323B]  mt-14
             placeholder-gray-700 placeholder-opacity-100 "
                placeholder={
                  "App that helps users to share photos and intreact with other existing users."
                }
              />
            </div>

            {!loading && (
              <div className="flex justify-center p-8">
                <button
                  type="button"
                  className=" text-white bg-gradient-to-r from-purple-400 to-blue-600 hover:bg-gradient-to-br focus:ring-4 
focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm 
px-5 py-5 text-center mr-2 mb-2"
                  onClick={(e) => generateBio(e)}
                >
                  Generate your colors 🤌🏻
                </button>
              </div>
            )}
            {loading && (
              <div className="flex justify-center">
                <button
                  className="bg-gradient-to-r from-purple-400 to-blue-600 rounded-xl text-white font-medium px-5 py-5 sm:mt-10 mt-8 hover:bg-black/80 w-1/4"
                  disabled
                >
                  <LoadingDots color="white" style="large" />
                </button>
              </div>
            )}
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <div
              
              className="inline-flex items-center justify-center w-full"
            >
              <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-white bg-[#040617]">
                Limited Credits available, please use it appropriately :D
              </span>
            </div>
            <div className="space-y-10 my-10">
              {generatedBios && (
                <>
                  <div>
                    <h2
                      className="text-5xl p-4 w-auto md:w-full font-bold text-center mb-4 bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent bg-clip-text text-transparent"
                      ref={bioRef}
                    >
                      Your generated Personas
                    </h2>
                  </div>

                  <div id="cpImage" className="flex justify-left w-full  rounded-xl border-2 bg-[#040617] p-6 sm:p-12 border-[#2F323B]">
                    <div className="space-y-8 flex flex-col items-center justify-center w-full mx-auto">
                      <div className=" flex flex-col items-center justify-center w-full">
                        <div className="flex w-full flex-row mb-6">
                          <div className="w-1/3 border-2  border-[#2F323B] rounded-xl flex justify-center bg-[#10131C] items-center text-5xl mr-6">
                            <p className="text-white">Pain points</p>
                          </div>
                          <div className="flex flex-col rounded w-2/3">
                            {generatedBios
                              .substring(
                                generatedBios.indexOf("1") + 3,
                                generatedBios.indexOf("Persona 1:")
                              )
                              .split(/\d+\./)
                              .map((generatedBio) => {
                                return (
                                  <div
                                    className=" p-4 rounded-xl text-gray-400 font-regular text-lg shadow-sm bg-[#10131C] border-[#2F323B]"
                                    key={generatedBio}
                                  >
                                    <p> 🙁 {generatedBio}</p>
                                  </div>
                                );
                              })}
                          </div>
                        </div>

                        <div className="border-2  w-full p-6 border-[#2F323B] mb-6 rounded-xl flex justify-center bg-[#10131C] items-center text-5xl">
                          <p className="text-white">User personas</p>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-6">
                          {generatedBios
                            .substring(generatedBios.indexOf("Persona 1:"))
                            .split(/Persona \d+:/)
                            .map((persona, index) => {
                              if (persona === "") {
                                return null;
                              }
                              const details = persona
                                .split("\n")
                                .map((detail, i) => <p key={i}>{detail}</p>);
                              return (
                                <div
                                  className="w-full rounded-xl text-gray-400 p-4 font-regular text-lg shadow-sm bg-[#10131C] "
                                  key={index}
                                >
                                  {details}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
               
                  <button className="p-4 bg-[#10131C] border-2 border-[#2F323B] text-sm indent-1 text-white rounded-xl hover:bg-[#040617] transition duration-200 focus:outline-none flex items-center" onClick={handleDownloadClick}>Download as PNG</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url(/Grid-new.png)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    </div>
  );
};

export default Home;
