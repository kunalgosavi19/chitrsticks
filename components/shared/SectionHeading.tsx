interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
  }
  
  export default function SectionHeading({
    badge,
    title,
    description,
  }: SectionHeadingProps) {
    return (
      <div className="mx-auto mb-12 max-w-3xl text-center">
        {badge && (
          <span className="inline-block rounded-full bg-[#48C40F]/10 px-4 py-2 text-sm font-semibold text-[#48C40F]">
            {badge}
          </span>
        )}
  
        <h2 className="mt-5 text-4xl font-black tracking-tight text-[#111111] md:text-5xl">
          {title}
        </h2>
  
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            {description}
          </p>
        )}
      </div>
    );
  }