import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface Cta1Props {
  id?: string;
  href?: string;
  className?: string;
}

const Cta1 = ({ id, href = "#", className = "" }: Cta1Props) => {
  return (
    <section id={id} className={className}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
          <div className="md:w-1/2 flex flex-col gap-4">
            <h4 className="mb-1 text-2xl font-bold md:text-3xl">
              Mỗi buổi học, một bước tiến
            </h4>

            <p className="text-muted-foreground">
              Giáo trình được thiết kế riêng dựa trên mục tiêu và trình độ hiện
              tại của bạn. Không lãng phí thời gian học những gì bạn không cần.
            </p>

            <Button asChild>
              <a href={href} className="self-start">
                Đặt lịch học thử ngay
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
          <div className="md:w-1/3">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Giáo trình cá nhân hóa 100%</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Sửa phát âm, ngữ pháp trực tiếp</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Giao tiếp qua tình huống thực tế</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Lịch học linh hoạt, phù hợp bạn</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4" />
                <span>Theo sát và đo lường tiến bộ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta1 };
