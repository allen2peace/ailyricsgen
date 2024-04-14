import ContactMe from "@/components/ContactMe";
import { siteConfig } from "@/config/site";
import { localeItems } from "@/navigation";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();

  return (
    <footer>
      <div className="mt-16 flex flex-col items-center border-t bg-black pb-2 pt-6 text-sm text-gray-400">
        {/* <div className="mb-3 flex space-x-4">
          <ContactMe />
        </div> */}
        <div className="flex flex-wrap justify-center space-x-2">
          {/* <Link href="https://weijunext.com/" target="_blank">
            J实验室
          </Link> */}
          {/* <div>{" • "}</div> */}
          {/* <Link href="https://githubbio.com/" target="_blank">
            Github Bio Generator
          </Link> */}

          <Link
            href="mailto:vivianswolford@gmail.com"
            target="_blank"
            rel="noopener norefferer nofollow"
            className="flex flex-col items-center justify-center"
          >
            <MdEmail className="text-lg" />
          </Link>

          <Link href="" target="_blank">
            AI Rap Song Lyrics
          </Link>
          {/* <div>{" • "}</div> */}
        </div>

        <div className="mx-60 my-3 grid grid-cols-6 justify-items-center gap-3 text-center ">
          {localeItems.map((value) => {
            return (
              <div key={value.code}>
                <a
                  href={value.code}
                  hrefLang={value.code}
                  className="mx-3 my-1 font-light text-white"
                >
                  {value.name}
                </a>
              </div>
            );
          })}
        </div>

        <div className="mb-2 flex space-x-2">
          <div>{`©${currentYear}`}</div>{" "}
          <Link href={siteConfig.url}>{siteConfig.creator}</Link>{" "}
          <div>All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
