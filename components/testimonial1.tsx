interface Testimonial1Props {
  className?: string;
}

const Testimonial1 = ({ className }: Testimonial1Props) => {
  return (
    <section className={className}>
      <div className="container">
        <div className="flex flex-col items-center gap-6 border-y py-14 text-center md:py-20">
          <q className="block max-w-4xl text-2xl font-medium lg:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            nesciunt iste distinctio corporis, alias illum.
          </q>

          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <p className="font-medium">
              John Doe, Founder &amp; CEO of Company
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Testimonial1 };
