import { getRules } from "../config/WebSite";

const Rules = () => {
  return (
    <div className="pt-16 w-screen min-h-[88vh] flex flex-col items-center border-2 border-red-700">
      <h1 className="text-3xl font-bold text-white mb-5">General Rules</h1>
      <div className="w-5/6 h-full flex flex-col items-center pb-20">
        {getRules.map((rule, index) => (
          <div
            key={index}
            className="w-[95%] flex flex-col border border-gray-700 rounded-xl px-3.5 py-4 m-2.5"
          >
            <div className="flex items-center text-base mb-1">
              <span className="text-white/80 font-bold">{index + 1}</span>
              <span className="text-slate-300 font-medium ml-2">
                {rule.title}
              </span>
            </div>
            <div className="ml-5">
              <span className="text-white/60 text-sm">{rule.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
