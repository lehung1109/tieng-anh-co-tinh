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
      year: "Khởi đầu",
      title: "Khởi động & đánh giá trình độ",
      description:
        "Giáo viên tìm hiểu mục tiêu, đánh giá trình độ hiện tại và các khó khăn khi nói tiếng Anh, từ đó thiết kế lộ trình 1-1 phù hợp với bạn.",
    },
    {
      year: "Nền tảng",
      title: "Củng cố nền tảng giao tiếp",
      description:
        "Ôn lại và hoàn thiện các cấu trúc, từ vựng cơ bản thường dùng khi giao tiếp, giúp bạn nói được những câu đơn giản, rõ ý và tự nhiên hơn.",
    },
    {
      year: "Hoàn thiện",
      title: "Sửa phát âm & ngữ điệu",
      description:
        "Tập trung sửa phát âm, nhấn trọng âm và ngữ điệu để người nghe dễ hiểu hơn, đồng thời tăng độ tự tin khi mở miệng nói tiếng Anh.",
    },
    {
      year: "Phản xạ",
      title: "Luyện phản xạ trong hội thoại",
      description:
        "Luyện phản xạ qua các đoạn hội thoại 1-1 cùng giáo viên, rèn thói quen trả lời nhanh, không dịch trong đầu và nói trôi chảy hơn.",
    },
    {
      year: "Thực chiến",
      title: "Ứng dụng vào tình huống thực tế",
      description:
        "Thực hành giao tiếp trong các bối cảnh bạn thường gặp: đi làm, họp, phỏng vấn, thuyết trình hoặc du lịch, tùy theo mục tiêu cá nhân.",
    },
    {
      year: "Duy trì",
      title: "Duy trì & nâng cấp khả năng nói",
      description:
        "Tiếp tục luyện nói với chủ đề nâng cao hơn, mở rộng từ vựng, cải thiện cách diễn đạt và duy trì thói quen sử dụng tiếng Anh thường xuyên.",
    },
  ],
}: Feature1Props) => {
  return (
    <section id={id} className={className}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto text-center mb-12">
          <Badge>Lộ trình học</Badge>

          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Học có lộ trình, tiến bộ nhanh
          </h2>

          <p className="text-muted-foreground">
            Lộ trình được thiết kế theo mục tiêu và thời gian của bạn. Mỗi giai
            đoạn đều có mục tiêu rõ ràng, giúp bạn thấy được tiến bộ sau từng
            bước.
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
