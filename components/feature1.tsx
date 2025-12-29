import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

interface Feature1Props {
  id?: string;
  className?: string;
  items?: {
    year: string;
    title: string;
    description: string;
  }[];
}

const Feature1 = ({
  id,
  className = "",
  items = [
    {
      year: "2024",
      title: "Series B Funding",
      description:
        "Raised $45M to accelerate global expansion and product development.",
    },
    {
      year: "2023",
      title: "Series A Funding",
      description:
        "Raised $20M to accelerate product development and market expansion.",
    },
    {
      year: "2022",
      title: "Series Seed Funding",
      description:
        "Raised $10M to accelerate product development and market expansion.",
    },
    {
      year: "2021",
      title: "Series Seed Funding",
      description:
        "Raised $10M to accelerate product development and market expansion.",
    },
    {
      year: "2020",
      title: "Series Seed Funding",
      description:
        "Raised $10M to accelerate product development and market expansion.",
    },
    {
      year: "2019",
      title: "Series Seed Funding",
      description:
        "Raised $10M to accelerate product development and market expansion.",
    },
  ],
}: Feature1Props) => {
  return (
    <section id={id} className={className}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto text-center mb-12">
          <Badge>Feature 1</Badge>

          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From idea to industry leader
          </h2>

          <p className="text-muted-foreground">
            Key moments that shaped who we are today.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px"></div>

            <div className="space-y-8">
              {items.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="ml-12 flex-1 md:ml-0">
                    <div
                      className={`${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <span className="text-sm font-semibold text-primary">
                        {item.year}
                      </span>

                      <h3 className="mt-1 font-semibold">{item.title}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center md:left-1/2 bg-background">
                    <Circle className="size-3 fill-primary text-primary" />
                  </div>

                  <div
                    className="hidden flex-1 md:block"
                    aria-hidden="true"
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature1 };
