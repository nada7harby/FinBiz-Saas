import { Button } from "../ui/button";

export function Tabs() {
  const navLinks = ["Products", "Pages", "Integration", "Blog", "Pricing"];

  return (
    <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-0">
      <div
        className="
          flex items-center justify-center
          gap-[8px] sm:gap-[12px] md:gap-[16px]
          py-[6px] px-[8px] sm:px-[12px] md:px-[20px] lg:px-[30px]
          rounded-full border border-[#FFFFFF1A]
          shadow-[0_0_20px_rgba(255,255,255,0.05)]
          backdrop-blur-md
          bg-background/60
          mx-auto w-fit
          overflow-x-auto scrollbar-hide
        "
      >
        <div className="flex items-center justify-center gap-2 sm:gap-4 p-2 min-w-max flex-wrap sm:flex-nowrap">
          {navLinks.map((link) => (
            <button
              key={link}
              className="
                sm:px-3 md:px-5 
                    h-9 sm:h-10 md:h-12 
            px-4 sm:px-6 md:px-8 rounded-full 
                text-xs sm:text-sm md:text-base font-medium 
                text-foreground 
                hover:bg-foreground hover:text-background 
                transition-colors whitespace-nowrap
              "
            >
              {link}
            </button>
          ))}
        </div>

        <Button
          className="
            h-9 sm:h-10 md:h-12 
            px-4 sm:px-6 md:px-8
            bg-white text-black 
            hover:bg-foreground hover:text-background
            shadow-lg shadow-primary/20 
            rounded-full whitespace-nowrap
          "
        >
          Login
        </Button>
      </div>
    </div>
  );
}
