import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import LoadingDots from "../components/LoadingDots";
import chroma from "chroma-js";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Art and Design");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Design a set of UI/UX guidelines for an app that helps ${bio} having focus users as ATSI 
    (Aboriginal and Torres Strait Islander) individuals. 
    The guidelines should be based on the category ${vibe} and description of the app. 
    Make sure the guidelines are with in 120 characters with headings. Consider factors such as 
    Iconography, accessibility, cultural sensitivity, and user preferences while creating the guidelines.${
      bio.slice(-1) === "." ? "" : "."
    }`;

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

  return (
    <div className="relative flex flex-col p-30 sm:py-12 bg-[#040617]">
      <img
        src="/Beams-new.png"
        alt=""
        className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        width="100%"
        height="100%"
      />

      <div className="relative z-50 container max-width: 1280px flex flex-col mx-auto items-center">
        {/* Top Headline */}
        <div className="mx-auto rounded-lg max-w-6xl w-full px-4 py-8 mb-20">
          <section className="p-8">
            <div className="flex flex-col items-center w-full sm:w-auto">
              <div
                contentEditable
                className="bg-gray-900 rounded-full h-24 w-24 flex items-center justify-center mb-6 text-4xl text-white"
              >
                ✨
              </div>
              <h1 className="text-5xl p-4 w-auto md:w-full font-bold text-center mb-4 bg-gradient-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent bg-clip-text text-transparent">
                Guidelines Generator
              </h1>
              <p className="text-xl font-light sm:text-2xl max-w-[708px] text-gray-300 text-center">
                Generate UI/UX guidelines for your app in seconds with our AI
                powered tool that are in compliance with ATSI communities.
              </p>
            </div>
          </section>
        </div>
        <div className=" mx-auto rounded-lg max-w-6xl flex items-center justify-center w-full px-4 py-8 mb-20 ">
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

              <div className="block mt-14 w-full border-gray-300 rounded-xl text-white font-medium shadow-sm focus:border-[#2F323B] bg-[#10131C] border-2 border-[#2F323B]">
  <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
</div>

            </div>
            {!loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                onClick={(e) => generateBio(e)}
              >
                Generate your guidelines 🤌🏻
              </button>
            )}
            {loading && (
              <button
                className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
<Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated guidelines
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split(/\d+\./)
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("guideline copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
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