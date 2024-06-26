import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/20/solid";
import Footer from "../components/Footer";
import LoadingDots from "../components/LoadingDots";
import chroma from "chroma-js";
import React, { Fragment } from "react";

import {
  ClipboardIcon,
  RocketLaunchIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState("");
  const [cookingtime, setCookingtime] = useState("");
  const [mealtype, setMealtype] = useState("");
  const [dietary, setDietary] = useState("");

  const [generatedBios, setGeneratedBios] = useState<String>("");
  const [showPronunciation, setShowPronunciation] = useState(false);
  const [pronunciation, setPronunciation] = useState("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const SAlanguages = ["Kaurna",
  "Adnyamathanha",
  "Pitjantjatjara/Yankunytjatjara",
  "Narungga",
  "Barngarla"];

  const NSWlanguages = ["Wiradjuri",
  "Gamilaraay",
  "Gumbaynggirr",
  "Bundjalung",
  "Yuwaalaraay"];

  const VIClanguages = ["Woiwurrung",
  "Taungurung",
  "Djadjawurrung",
  "Gunai/Kurnai",
  "Yorta Yorta"];


  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast(`${text} copied to clipboard`, {
      icon: "✂️",
    });
  };

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `I need you to translate the given scentence/word in to aboriginal language with Pronunciation. The scentence/word I have is ${bio} and i need it to be translated in to ${mealtype} language which is originated in ${vibe},Australia. lable the output as "Original :" for given input and "Translated :" for translated version and "Pronunciation:" ${
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
                language translator
              </h1>
              <p className="text-xl font-light sm:text-2xl max-w-[708px] text-gray-300 text-center">
                translate your words, scentence you want to Aboriginal language{" "}
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
                  Enter the word/Scentence:
                </p>
              </div>
              <div className=" flex items-center space-x-3">
                <p className="text-left text-xl font-medium sm:text-xl font-light text-gray-500">
                  Enter the word/Scentence you want to translate in to
                  Aboriginal language
                </p>
              </div>

              {/* Enter a paragraph */}

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full border-gray-300 rounded-xl text-white font-medium shadow-sm focus:border-[#2F323B] bg-[#10131C] border-2 border-[#2F323B]  mt-14
             placeholder-gray-700 placeholder-opacity-100 "
                placeholder={"Hey. Welcome to my website. "}
              />
            </div>

            <div className="mb-12">
            <div className="flex items-center space-x-3">
                <div
                  contentEditable
                  className="flex items-center justify-center text-xl text-left font-medium text-gray-300"
                >
                  Short guide for selecting language
                </div>
              </div>
              <div className="mt-6 flex mb-2 items-center space-x-3">
                <p className="text-left text-xl font-medium sm:text-2xl font-medium text-gray-300">
                 
                </p>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           
              <div className="">
                <div className="rounded-lg bg-[#10131C]  border-2 border-[#2F323B] shadow-sm ring-1 ring-gray-900/5">
                  <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                      <dt className="text-sm font-semibold leading-6 text-gray-500">
                        South Australia
                      </dt>
                      <dd  className="mt-1 text-base font-semibold leading-6 text-white">
                        SA
                      </dd>
                    </div>
                    <div className="flex-none self-end px-6 pt-4">
                      <dt className="sr-only">Status</dt>
                      <dd onClick={() => {
                            navigator.clipboard.writeText("SA");
                            toast("SA copied to clipboard", {
                              icon: "✂️",
                            });
                          }}  className="inline-flex cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Copy
                      </dd>
                    </div>
                    <div className="mt-6 flex w-full gap-x-4 border-t border-[#2F323B]  px-6 pt-6">
                      <div className=" w-full">
                        {SAlanguages.map((SAlanguage) => (
                          <div className="flex w-full justify-between gap-x-4 px-6 pt-6">
                            <dd className="text-sm font-medium leading-6 text-white">
                              {SAlanguage}
                            </dd>
                            <dt className="flex-none">
                              <ClipboardDocumentIcon
                                className="h-6 w-5 text-white cursor-pointer"
                                aria-hidden="true"
                                onClick={() => handleCopy(SAlanguage)}
                              />
                            </dt>
                          </div>
                        ))}
                      </div>
                    </div>
                  </dl>
                  <div className="mt-6 border-t border-[#2F323B]  px-6 py-6">
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-500"
                    >
                      Use to Clipboard icon to make your life easier 🤌🏻
                    </a>
                  </div>
                </div>  
              </div>

              <div className="">
                
                <div className="rounded-lg bg-[#10131C]  border-2 border-[#2F323B] shadow-sm ring-1 ring-gray-900/5">
                  <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                      <dt className="text-sm font-semibold leading-6 text-gray-500">
                        Victoria
                      </dt>
                      <dd className="mt-1 text-base font-semibold leading-6 text-white">
                        VIC
                      </dd>
                    </div>
                    <div className="flex-none self-end px-6 pt-4 ">
                      
                      <dt className="sr-only ">Status</dt>
                      <dd   onClick={() => {
                            navigator.clipboard.writeText("VIC");
                            toast("VIC copied to clipboard", {
                              icon: "✂️",
                            });
                          }} className="inline-flex cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20  ">
                        Copy
                      </dd>
                    </div>
                    <div className="mt-6 flex w-full gap-x-4 border-t border-[#2F323B]  px-6 pt-6">
                      <div className=" w-full">
                        {VIClanguages.map((VIClanguage) => (
                          <div className="flex w-full justify-between gap-x-4 px-6 pt-6">
                            <dd className="text-sm font-medium leading-6 text-white">
                              {VIClanguage}
                            </dd>
                            <dt className="flex-none">
                              <ClipboardDocumentIcon
                                className="h-6 w-5 text-white cursor-pointer"
                                aria-hidden="true"
                                onClick={() => handleCopy(VIClanguage)}
                              />
                            </dt>
                          </div>
                        ))}
                      </div>
                    </div>
                  </dl>
                  <div className="mt-6 border-t border-[#2F323B]  px-6 py-6">
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-500"
                    >
                      Use to Clipboard icon to make your life easier 🤌🏻
                    </a>
                  </div>
                </div>  
              </div>
              <div className="">
                <div className="rounded-lg bg-[#10131C]  border-2 border-[#2F323B] shadow-sm ring-1 ring-gray-900/5">
                  <dl className="flex flex-wrap">
                    <div className="flex-auto pl-6 pt-6">
                      <dt className="text-sm font-semibold leading-6 text-gray-500">
                        New South Whales
                      </dt>
                      <dd className="mt-1 text-base font-semibold leading-6 text-white">
                        NSW
                      </dd>
                    </div>
                    <div className="flex-none self-end px-6 pt-4">
                      <dt className="sr-only">Status</dt>
                      <dd  onClick={() => {
                            navigator.clipboard.writeText("NSW");
                            toast("NSW copied to clipboard", {
                              icon: "✂️",
                            });
                          }}  className="inline-flex cursor-pointer items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Copy
                      </dd>
                    </div>
                    <div className="mt-6 flex w-full gap-x-4 border-t border-[#2F323B]  px-6 pt-6">
                      <div className=" w-full">
                        {NSWlanguages.map((NSWlanguage) => (
                          <div className="flex w-full justify-between gap-x-4 px-6 pt-6">
                            <dd className="text-sm font-medium leading-6 text-white">
                              {NSWlanguage}
                            </dd>
                            <dt className="flex-none">
                              <ClipboardDocumentIcon
                                className="h-6 w-5 text-white cursor-pointer"
                                aria-hidden="true"
                                onClick={() => handleCopy(NSWlanguage)}
                              />
                            </dt>
                          </div>
                        ))}
                      </div>
                    </div>
                  </dl>
                  <div className="mt-6 border-t border-[#2F323B]  px-6 py-6">
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-500"
                    >
                      Use to Clipboard icon to make your life easier 🤌🏻
                    </a>
                  </div>
                </div>  
              </div>

              
            </div>
            </div>
            {/* create a stepper component in tailwind css */}

            <div className="border-2 border-[#2F323B] p-8 rounded-xl mb-12">
              <div className="flex items-center space-x-3">
                <div
                  contentEditable
                  className="flex items-center justify-center text-xl text-left font-medium text-gray-300"
                >
                  Step - 2️⃣
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-12 justify-between">
                <div className="w-full">
                  <div className="mt-6 flex mb-2 items-center space-x-3">
                    <p className="text-left text-xl font-medium sm:text-2xl font-medium text-gray-300">
                      State:
                    </p>
                  </div>
                  <div className=" flex items-center space-x-3">
                    <p className="text-left text-xl font-medium sm:text-xl font-light text-gray-500">
                      Enter the state the langue is originated from
                    </p>
                  </div>

                  {/* Enter a paragraph */}

                  <input
                    type="text"
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className=" w-full border-gray-300 rounded-xl text-white font-medium shadow-sm focus:border-[#2F323B] bg-[#10131C] border-2 border-[#2F323B]  mt-14
             placeholder-gray-700 placeholder-opacity-100 "
                    placeholder="SA, NSW, VIC, QLD, WA, NT, TAS, ACT"
                  />
                </div>
                <div className="w-full">
                  <div className="mt-6 flex mb-2 items-center space-x-3">
                    <p className="text-left text-xl font-medium sm:text-2xl font-medium text-gray-300">
                      Language:
                    </p>
                  </div>
                  <div className=" flex items-center space-x-3">
                    <p className="text-left text-xl font-medium sm:text-xl font-light text-gray-500">
                      Enter the language to be translated to
                    </p>
                  </div>

                  {/* Enter a paragraph */}

                  <input
                    type="text"
                    value={mealtype}
                    onChange={(e) => setMealtype(e.target.value)}
                    className=" w-full border-gray-300 rounded-xl text-white font-medium shadow-sm focus:border-[#2F323B] bg-[#10131C] border-2 border-[#2F323B]  mt-14
                 placeholder-gray-700 placeholder-opacity-100 "
                    placeholder=" karuna, yuwaalaraay, yindjibarndi, yanyuwa"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-yellow-700"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-medium text-yellow-800">
                    Attention needed
                  </h3>
                  <div className="mt-2 text-md text-yellow-700">
                    <p>
                      Our AI translation system may not be able to accurately
                      translate text from Aboriginal languages, as there is
                      limited information available on the internet.While we
                      strive to provide the best possible translations, there
                      may be inaccuracies or errors due to the lack of available
                      resources and data.
                    </p>
                  </div>
                </div>
              </div>
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
                  Translate your language 🤌🏻
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
                      Your translation can be found here
                    </h2>
                  </div>

                  <div className="flex justify-left w-full  rounded-xl border-2 bg-[#040617] p-6 sm:p-12 border-[#2F323B]">
                    <div className="space-y-8 flex flex-col items-center justify-center w-full mx-auto">
                      <div className="flex flex-col items-center justify-center w-full">
                        {generatedBios
                          .substring(generatedBios.indexOf("1") + 10)
                          .split(/\d+\./)
                          .map((generatedBio) => {
                              const [original, translated, pr] =
                                generatedBio.split(/Translated:|Pronunciation:/);
                            if (generatedBio.includes("AI language model")) {
                              return (
                                <div className=" w-full" key={generatedBio}>
                                  <div>
                                    <div className="rounded-md bg-red-50 p-4">
                                      <div className="flex">
                                        <div className="flex-shrink-0">
                                          <XCircleIcon
                                            className="h-5 w-5 text-red-400"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-3">
                                          <h3 className="text-sm font-medium text-red-800">
                                            We are really Sorry!
                                          </h3>
                                          <div className="mt-2 text-sm text-red-700">
                                            <ul
                                              role="list"
                                              className="list-disc space-y-1 pl-5"
                                            >
                                              <li>
                                                AI language model doesn't have
                                                enough information on the
                                                requested input {bio}
                                              </li>
                                              <li>
                                                Please Contact the Aborignal
                                                language instructor
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full"
                                key={generatedBio}
                              >
                                <div>
                                  <p className="text-white border-[#2F323B]  border-2 p-4 text-xl mb-4 rounded-xl">
                                    English - Original
                                  </p>
                                  <div className="p-8 bg-[#10131C] text-xl border-[#2F323B] text-white rounded-xl focus:outline-none">
                                    <p>{original}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-white border-[#2F323B] border-2 p-4 text-xl mb-4 rounded-xl">
                                    {mealtype} from {vibe} - Translated
                                  </p>
                                  <div className="relative">
                                    <div className="p-8 bg-[#10131C] border-2 border-[#2F323B] text-lg rounded-xl hover:bg-[#040617] transition duration-200 focus:outline-none">
                                      <p className="mb-8 text-white text-xl">
                                        {translated}
                                      </p>
                                      {showPronunciation && (
                                        <div className="mb-20">
                                          <p className="text-gray-500 text-lg">
                                            {pronunciation}
                                          </p>
                                        </div>
                                      )}
                          
                                      <div className="flex flex-column">
                                        <button
                                          className="p-4 mr-4 bg-[#10131C] border-2 border-[#2F323B] text-sm indent-1 text-white rounded-xl hover:bg-[#040617] transition duration-200 focus:outline-none flex items-center"
                                          onClick={() => {
                                            if (!pronunciation) {
                                              setPronunciation(pr.trim());
                                            }
                                            setShowPronunciation(
                                              !showPronunciation
                                            );
                                          }}
                                        >
                                          <RocketLaunchIcon className="h-5 w-5" />
                                          <span className="hidden md:inline">
                                            {showPronunciation
                                              ? "hide pronunciation"
                                              : "view pronunciation"}
                                          </span>
                                        </button>
                                        <button
                                          className="p-4  bg-[#10131C] border-2 border-[#2F323B] text-sm indent-1 text-white rounded-xl hover:bg-[#040617] transition duration-200 focus:outline-none flex items-center"
                                          onClick={() => {
                                            console.log("im here", translated);
                                            const value =
                                              new SpeechSynthesisUtterance(
                                                translated
                                              );
                                            value.rate = 0.4; // set the rate to 0.8 to slow down the speech
                                            value.pitch = 0.6; // set the pitch to 1.5 to raise the tone
                                            window.speechSynthesis.speak(value);
                                            value.volume = 1.0;
                                          }}
                                        >
                                          <MusicalNoteIcon className="h-5 w-5" />
                                          text to audio
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
