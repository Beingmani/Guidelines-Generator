import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import Footer from "../components/Footer";
import LoadingDots from "../components/LoadingDots";
import chroma from "chroma-js";
import React, { Fragment } from "react";
import { ClipboardIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState("");

  const [generatedBios, setGeneratedBios] = useState<String>("");
  const [showPainPoints, setShowPainPoints] = useState(false);

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate a set of  conversation between a Ux designer and an Aborignal User. Try to get to the conversation in such a way that you can able to analyse the pain points in the idea "${bio}". Lable the conversation as ux designer , user. Finally sumamrize the pain points using the lable pain points. Stricly ask driect question and gather as many as information and pain points within the limited conversation${
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
                className="w-full border-gray-300 rounded-xl text-white font-medium shadow-sm focus:border-[#2F323B] bg-[#10131C] border-2 border-[#2F323B]  mt-14
             placeholder-gray-700 placeholder-opacity-100 "
                placeholder={
                  "App that helps users to share photos and intreact with other existing users."
                }
              />
            </div>

            <div className="border-2 border-[#2F323B] p-8 rounded-xl">
              <div className="flex items-center space-x-3">
                <div
                  contentEditable
                  className="flex items-center justify-center text-xl text-left font-medium text-gray-300"
                >
                  Step - 2️⃣
                </div>
              </div>
              <div className="mt-6 flex mb-2 items-center space-x-3">
                <p className="text-left text-xl font-medium sm:text-2xl font-medium text-gray-300">
                  App Category:
                </p>
              </div>
              <div className=" flex items-center space-x-3">
                <p className="text-left text-xl font-medium sm:text-xl font-light text-gray-500">
                  Enter the category of the application
                </p>
              </div>

              {/* Enter a paragraph */}

              <input
                type="text"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className=" w-full border-gray-300 rounded-xl text-white font-medium shadow-sm focus:border-[#2F323B] bg-[#10131C] border-2 border-[#2F323B]  mt-14
             placeholder-gray-700 placeholder-opacity-100 "
                placeholder="Social, Photo Sharing, Entertainment"
              />
            </div>
            {!loading && (
              <div className="flex justify-center p-24">
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
            <div className="inline-flex items-center justify-center w-full">
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
                      Your generated Colors
                    </h2>
                  </div>

                  <div className="flex justify-left w-full rounded-xl border-2 bg-[#040617] p-6 sm:p-12 border-[#2F323B]">
                    <div className="space-y-8 flex flex-col items-center justify-center w-full ">
                      <div className="space-y-8 flex flex-col items-center justify-center w-full ">
                        {generatedBios
                          .substring(generatedBios.indexOf("UX Designer"))
                          .split("\n")
                          .map((line, index) => {
                            if (line === "" || line === " ") {
                              return null;
                            }
                            const speaker = line.startsWith("UX Designer")
                              ? "UX Designer"
                              : line.startsWith("User")
                              ? "User"
                              : null;
                            if (!speaker) {
                              return null;
                            }
                            const message = line.replace(
                              /(UX Designer|User): /,
                              ""
                            );
                            return (
                              <div
                                key={index}
                                className={`flex w-full ${
                                  speaker === "UX Designer"
                                    ? "justify-start"
                                    : "justify-end"
                                }`}
                              >
                                <div className="flex flex-column items-center ">
                                  {speaker === "UX Designer" && (
                                    <div className="h-10 w-11 p-1 bg-white rounded-full flex items-center justify-center">
                                      <span role="img" aria-label="Designer">
                                        👨‍🎨
                                      </span>
                                    </div>
                                  )}

                                  <div
                                    className={`rounded-xl w-full border-2 border-[#2F323B] shadow-md p-4 ${
                                      speaker === "UX Designer"
                                        ? "bg-[#2567dd]"
                                        : "bg-[#1f2435]"
                                    } ${
                                      speaker === "UX Designer"
                                        ? "text-white"
                                        : "text-gray-400"
                                    } ${
                                      speaker === "UX Designer"
                                        ? "ml-4"
                                        : "mr-4"
                                    }`}
                                  >
                                    <p>{message}</p>
                                  </div>

                                  {speaker === "User" && (
                                    <div className="h-10 w-11 bg-white p-1 rounded-full flex items-center justify-center">
                                      <span role="img" aria-label="User">
                                        👤
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}

<div className="flex justify-center w-full">
          <button
            className="rounded-lg bg-[#2567dd] text-white px-4 py-2 mt-4 hover:bg-blue-700"
            onClick={() => setShowPainPoints(!showPainPoints)}
          >
            {showPainPoints ? "Hide Pain Points" : "Show Pain Points"}
          </button>
        </div>
        {showPainPoints && (
          <div className="space-y-4 w-full">
            {generatedBios.indexOf("Pain Points:") >= 0 &&
              generatedBios
                .substring(generatedBios.indexOf("Pain Points:")+13)
                .split("- ")
                .filter((point) => point.trim() !== "")
                .map((point, index) => (
                  <div className="flex items-center" key={index}>
                    <span role="img" aria-label="Pain Point Emoji">
                      🙁
                    </span>
                    <div className="rounded-xl ml-2 text-gray-400 font-regular text-lg shadow-sm bg-[#10131C] border-[#2F323B] p-4">
                      <p>{point.trim()}</p>
                    </div>
                  </div>
                ))}
          </div>
        )}
    
                      </div>
                    </div>
                  </div>
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
