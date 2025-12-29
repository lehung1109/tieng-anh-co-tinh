import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

interface Hero4Props {
  id?: string;
}

const Hero4 = ({ id = "hero" }: Hero4Props) => {
  return (
    <section
      id={id}
      className="h-screen pt-12 pb-24 w-full relative overflow-hidden"
    >
      <Image
        src="/images/hero.png"
        alt="Hero"
        width={2816}
        height={1536}
        className="absolute inset-0 object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/0 to-background/80"></div>

      <div className="container absolute bottom-0 left-0 right-0 pb-24 my-0">
        <div className="flex justify-between items-end gap-6">
          <div className="flex flex-col gap-8">
            <h1 className="text-6xl font-medium text-foreground md:text-[5.8rem]">
              Từ ngại nói đến tự tin
            </h1>

            <p className="text-xl text-foreground md:text-2xl">
              Học 1 kèm 1 linh hoạt, tập trung vào kỹ năng bạn cần ngay lập tức
            </p>
          </div>

          <Button variant="ghost" className="hidden md:flex" asChild>
            <a href="#main" className="hidden md:flex">
              <span className="text-2xl">Khám phá ngay</span>
              <ArrowDown size={24} className="size-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero4 };
