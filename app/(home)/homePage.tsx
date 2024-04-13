"use client";

import DropDown, { LanguageType } from "@/components/DropDown";
import Github from "@/components/icons/GitHub";
import Twitter from "@/components/icons/Twitter";
import { siteConfig } from "@/config/site";
import { formatNumber } from "@/lib/data";
import { UserInfo } from "@/types/user";
import { useCompletion } from "ai/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";

interface HomePageProps {
  usage: number;
  user: UserInfo | null;
  remaining: number;
  boostPackRemaining: number;
  membershipExpire: number;
  boostPackExpire: number;
}

export default function HomePage({
  usage,
  user,
  remaining,
  boostPackRemaining,
  membershipExpire,
  boostPackExpire,
}: HomePageProps) {
  const [currentUses, setCurrentUses] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [boostPackRemainingCredits, setBoostPackRemainingCredits] = useState(0);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [topicList, setTopicList] = useState<string[]>([]);
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [emotionList, setEmotionList] = useState<string[]>([]);
  const [language, setLanguage] = useState<LanguageType>("English");
  const answerRef = useRef<null | HTMLDivElement>(null);

  const scrollToAnswer = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { complete, completion, isLoading, handleSubmit } = useCompletion({
    api: "/api/completion",
    body: {
      language,
      prompt: content,
      topic: JSON.stringify(topicList),
      keyword: JSON.stringify(keywordList),
      emotion: JSON.stringify(emotionList),
    },
    headers: {
      token: user?.accessToken || "",
    },
    onResponse: (res) => {
      if (res.status === 429) {
        toast.error("You are being rate limited. Please try again later.");
        return;
      }
      setCurrentUses((pre) => pre + 1);
      scrollToAnswer();
    },
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    []
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!content) {
      e.preventDefault();
      setError(true);
      return;
    }
    setError(false);
    complete(content);
    handleSubmit(e);
  };

  const onSubmitSubject = (e: FormEvent<HTMLFormElement>) => {
    console.log("onSubmitSubject==", e);
    // 阻止表单默认提交行为
    e.preventDefault();

    // 通过类型断言告诉 TypeScript 返回的是一个 HTMLInputElement 类型
    const input = (e.target as HTMLFormElement).elements.namedItem(
      "prompt"
    ) as HTMLInputElement;

    // 获取 input 元素的值
    const value = input.value;
    // 处理 input 元素的值
    // subjectList.push(value);
    console.log(`Input value: ${value}, ${topicList}`);
    setTopicList(topicList);
  };

  const answer = completion;

  useEffect(() => {}, [topicList]);
  useEffect(() => {
    if (currentUses <= remaining) {
      setRemainingCredits(remaining - currentUses);
      setBoostPackRemainingCredits(boostPackRemaining);
    } else {
      setBoostPackRemainingCredits(
        boostPackRemaining - (currentUses - remaining)
      );
    }
  }, [remaining, boostPackRemaining, currentUses]);

  return (
    <>
      {/* <div
        className="mx-auto mt-6 flex items-center justify-center space-x-5"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <a
          href="https://twitter.com/weijunext/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-blue-200 mb-5"
        >
          <Twitter className="h-5 w-5" />
          <p className="text-sm font-semibold">Follow Me</p>
        </a>
        <a
          href="https://github.com/weijunext/smart-excel-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
        >
          <Github className="h-5 w-5" />
          <p className="text-sm font-semibold">Star on GitHub</p>
        </a>
      </div> */}
      <h1 className="my-5 text-4xl font-bold text-slate-900">
        {siteConfig.description}
      </h1>

      {/* <p className="text-slate-500 my-5">
        {formatNumber({ value: Number(usage) + currentUses })} Song Lyrics
        generated so far.
      </p> */}

      {/* <div className="flex flex-row my-4 ">
        {subjectList.map((subject) => (
          <div className="flex shadow-slate-200 shadow rounded-xl h-10 my-1 ml-1 text-black bg-slate-100 py-2 pl-2 justify-center text-center items-center">
            {subject}
            <Image
              alt="cancel"
              src="/close-icon.svg"
              className="w-8 h-8 py-1"
              width={16}
              height={16}
            />
          </div>
        ))}
      </div>

      <SubmitForm
        initialPrompt="Enter topic and hit Enter..."
        formAction={onSubmitSubject}
      /> */}

      <div className="flex flex-col items-start justify-start">
        <div className=" my-5 flex w-full flex-col items-start justify-start">
          <div>
            Enter up to 3 overarching topics. These can be themes, concepts, and
            stories.
          </div>
          <div className="mt-2 w-full">
            <TagsInput
              value={topicList}
              onChange={setTopicList}
              name="subject"
              placeHolder="enter subject"
            />
          </div>
          <em className=" w-full text-center text-slate-400">
            press enter to add Topics
          </em>
        </div>

        <div className=" my-5 flex w-full flex-col items-start justify-start">
          <div>
            Enter up to 10 words or phrases you want to appear in the song.
          </div>
          <div className="mt-2 w-full">
            <TagsInput
              value={keywordList}
              onChange={setKeywordList}
              name="keyword"
              placeHolder="enter keyword"
            />
          </div>
          <em className=" w-full text-center text-slate-400">
            press enter to add new Keywords
          </em>
        </div>

        <div className=" my-5 flex w-full flex-col items-start justify-start">
          <div>
            Enter up to 3 emotions describing the emotional journey of the song.
          </div>
          <div className="mt-2 w-full">
            <TagsInput
              value={emotionList}
              onChange={setEmotionList}
              name="emotion"
              placeHolder="enter emotions"
            />
          </div>
          <em className=" w-full text-center text-slate-400">
            press enter to add new Emtions
          </em>
        </div>
      </div>
      <form className="w-full max-w-xl" onSubmit={onSubmit}>
        <div className="mt-10 flex items-center space-x-3">
          <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">
            Describe what the song you want is about.
          </p>
        </div>
        <textarea
          value={content}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 shadow-sm focus:border-black mt-5 focus:ring-black"
          placeholder={"e.g. a song about love between young people"}
        />
        {error && (<em className=" flex text-start text-red-500">Please enter the content of song</em>)}
        <div className="my-5 flex items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">
            Select the language you want to output.
          </p>
        </div>
        <div className="block">
          <DropDown
            language={language}
            setLanguage={(newLanguage) => setLanguage(newLanguage)}
          />
        </div>

        {/* {user ? ( */}
        <>
          <div className="mb-2 mt-6 text-left text-sm text-gray-500">
            {/* <div>
                {remainingCredits <= 0 ? 0 : remainingCredits} credits remaining
                <>
                  {membershipExpire ? (
                    <>
                      (Membership Expires on:{" "}
                      {dayjs(membershipExpire).format("YYYY-MM-DD HH:mm")})
                    </>
                  ) : (
                    <></>
                  )}
                </>
              </div> */}
            {/* {boostPackExpire ? (
                <div>
                  {boostPackRemainingCredits} boost pack credits (Expires on:{" "}
                  {dayjs(boostPackExpire * 1000).format("YYYY-MM-DD HH:mm")})
                </div>
              ) : (
                <></>
              )} */}
          </div>

          <button
            className="w-full rounded-xl bg-black px-4 py-2 font-medium text-white hover:bg-black/80"
            type="submit"
            disabled={isLoading}
            style={{
              cursor: isLoading ? "not-allowed" : "",
            }}
          >
            {isLoading ? (
              <span className="loading">
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
                <span style={{ backgroundColor: "white" }} />
              </span>
            ) : (
              // remainingCredits + boostPackRemainingCredits <= 0 ? (
              //   <Link
              //     href={
              //       user.role === 0 ? "/#subscription-card" : "/#bootsPack-card"
              //     }
              //   >
              //     {
              //       /**
              //        * 普通用户的引导文字：引导购买会员
              //        * 会员用户的引导文字：引导购买加油包
              //        * Prompt for regular users: Guide to purchase membership
              //        * Prompt for member users: Guide to purchase a boost package
              //        */
              //       user.role === 0
              //         ? "Become a member to enjoy 500 credits every day."
              //         : "Purchase a Boost Pack to get more credits right now."
              //     }
              //   </Link>
              // ) :
              <span>Generate Song Lyrics &rarr;</span>
            )}
          </button>
        </>
        {/* // ) : (
        //   <Link href="/login">
        //     <button className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full">
        //       <span>Available after logging in &rarr;</span>
        //     </button>
        //   </Link>
        // )} */}
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="border-1 h-px bg-gray-700" />
      <output className="my-10 space-y-10">
        {answer && (
          <>
            <div>
              <h2
                className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                ref={answerRef}
              >
                The formula you need
              </h2>
            </div>
            <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8">
              <div
                className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                onClick={() => {
                  navigator.clipboard.writeText(answer);
                  toast("Copied", {
                    icon: "✂️",
                  });
                }}
              >
                <div className="whitespace-pre-wrap text-left">{answer}</div>
              </div>
            </div>
          </>
        )}
      </output>

      {/* subscribe */}
      {/* <Subscribe user={user} /> */}
    </>
  );
}
