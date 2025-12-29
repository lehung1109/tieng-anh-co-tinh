import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero4 = () => {
  return (
    <section className="h-screen pt-12 pb-24 w-full relative overflow-hidden">
      <picture>
        <source
          srcSet="https://placehold.co/1920x1080?text=Image"
          media="(min-width: 1024px)"
        />
        <img
          src="https://placehold.co/1920x1080?text=Image"
          alt="Hero"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </picture>

      <div className="absolute inset-0 bg-linear-to-b from-background/0 to-background/80"></div>

      <div className="container absolute bottom-0 left-0 right-0 pb-24 my-0">
        <div className="flex justify-between items-end gap-6">
          <div className="flex flex-col gap-8">
            <h1 className="text-6xl font-medium text-foreground md:text-[5.8rem]">
              heading
            </h1>

            <p className="text-xl text-foreground md:text-2xl">
              CableCore Partnership. Worldwide network. Regional manufacturing
            </p>
          </div>

          <Button variant="ghost" className="hidden md:flex" asChild>
            <a href="#main" className="hidden md:flex">
              <span className="text-2xl">Read More</span>
              <ArrowDown size={24} className="size-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero4 };
