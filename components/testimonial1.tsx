interface Testimonial1Props {
  id?: string;
  className?: string;
}

const Testimonial1 = ({ id, className }: Testimonial1Props) => {
  return (
    <section id={id} className={className}>
      <div className="container">
        <div className="flex flex-col items-center gap-6 border-y py-14 text-center md:py-20">
          <q className="block max-w-4xl text-2xl font-medium lg:text-3xl">
            Mình vốn rất yếu tiếng Anh, nhiều khi không dám mở miệng. Học 1-1
            giúp mình được sửa lỗi ngay, không bị áp lực như học nhóm. 2 tháng
            sau mình đã nói được những câu cơ bản và tự tin hơn hẳn.
          </q>

          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <p className="font-medium">Hung Le - Nhân viên IT</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Testimonial1 };
