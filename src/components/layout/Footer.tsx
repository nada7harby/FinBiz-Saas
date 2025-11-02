import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const footerLinks = {
  Company: ["Products", "Services", "Analytics"],
  Help: ["Contact Support", "Help Documents", "Partners"],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
            <img src={logo} alt="FinBiz Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold">FinBiz</span>
          </div>
            <p className="text-sm text-textF">
              Finance FinBiz is a 100% of software company and fully accessible the best platforms for your finance easy.
            </p>
            <div className="flex gap-3">
         {[
  { icon: FaTwitter, href: "#", hoverColor: "hover:bg-sky-500" },
  { icon: FaFacebookF, href: "#", hoverColor: "hover:bg-blue-600" },
  { icon: FaInstagram, href: "#", hoverColor: "hover:bg-pink-500" },
  { icon: FaGithub, href: "#", hoverColor: "hover:bg-gray-800" },
].map(({ icon: Icon, href, hoverColor }, i) => (
  <a
    key={i}
    href={href}
    className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:text-white transition-all duration-300 ${hoverColor}`}
  >
    <Icon className="w-5 h-5" />
  </a>
))}

            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-textF hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="relative">
  <h3 className="font-semibold mb-4">Subscribe to Newsletter</h3>

  <div className="flex">
    <Input
      type="email"
      placeholder="Enter email address"
      className="
        bg-BgInput
        text-white 
        h-12 
        rounded-l-xl 
        rounded-r-none 
        border-none 
        focus-visible:ring-0 
        focus-visible:ring-offset-0
      "
    />

     <Button
      className="
        w-[175.55px]
        h-[55px]
        rounded-none
        rounded-r-[8px]
        bg-[#A7E92F]
        hover:bg-[#9ee02a]
        text-white
        font-semibold
        px-[16px]
        flex
        items-center
        justify-center
        gap-[10px]
      "
    >
      Join
    </Button>
  </div>
</div>

        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © Copyright 2024 FinBiz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
