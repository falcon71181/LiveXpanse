import Sukuna from "../assets/bg/sukuna.jpg";

const RootPage = () => {
  return (
    <main className="absolute pt-10 w-screen h-full">
      <Background />
      <div className="absolute z-50 text-4xl text-white">
        Main Page
      </div>
    </main>
  );
};

const Background = () => {
  return (
    <div className="absolute min-h-[96vh] w-full bg-neutral-900">
      <span className="absolute inset-0 z-10 border border-red-300">
        <img src={Sukuna} className="w-full h-full object-cover object-center brightness-[0.7]" />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 to-neutral-900 z-20"
      ></span>
    </div>
  )
}

export default RootPage;
