import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface Cta1Props {
  href?: string;
  className?: string;
}

const Cta1 = ({ href = "#", className = "" }: Cta1Props) => {
  return (
    <section className={className}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
          <div className="md:w-1/2 flex flex-col gap-4">
            <h4 className="mb-1 text-2xl font-bold md:text-3xl">
              Call to Action
            </h4>

            <p className="text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Architecto illo praesentium nisi, accusantium quae.
            </p>

            <Button asChild>
              <a href={href} className="self-start">
                Get Started
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
          <div className="md:w-1/3">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Easy Integration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>24/7 Support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Customizable Design</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Scalable Performance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Hundreds of Blocks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta1 };
