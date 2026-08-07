export const Marquee = () => {
  const text = "MOBILE APPS • WEB APPS • UI/UX DESIGN • DEVELOPMENT • ";
  return (
    <div className="bg-black text-white py-4 overflow-hidden border-y-4 border-black">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-xl md:text-2xl font-bold tracking-wider mx-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
