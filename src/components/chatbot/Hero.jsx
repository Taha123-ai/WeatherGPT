import { useSelector } from "react-redux";
import { chatbotlanguage } from "../../constants/Language/chatbot/chatbotlanguage";

const Hero = () => {
  const language = useSelector((store)=>store?.user?.language);
  const text = chatbotlanguage[language];
  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        {text?.heading}{" "}
        <span className="bg-linear-to-r from-cyan-500 to-violet-500 bg-clip-text text-transparent">
          {text?.Weather}
        </span>
      </h1>

      <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
        {text?.subtitle}
      </p>
    </>
  );
};

export default Hero;
