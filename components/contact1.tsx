import { Form } from "@/components/form";

interface Contact1Props {
  id?: string;
  className?: string;
}

const Contact1 = ({ id, className }: Contact1Props) => {
  return (
    <section id={id} className={className}>
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="flex lg:max-w-1/2 flex-col justify-between gap-10">
            <div className="text-center lg:text-left flex flex-col gap-4">
              <h2 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                Đừng để ngại nói cản bước bạn
              </h2>

              <p className="text-muted-foreground">
                Liên hệ ngay để được tư vấn miễn phí và nhận ưu đãi đặc biệt cho
                học viên đăng ký sớm. Số lượng slot học 1-1 có hạn!
              </p>
            </div>
          </div>

          <div className="mx-auto flex max-w-xl w-full flex-col gap-6 rounded-lg border p-10">
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact1 };
