import BlockRenderer from "@/components/block-renderer";
import { getSinglePage } from "@/lib/actions/wordpress.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

const GenericPage = async (props: {
  params: Promise<{
    pageSlug: string;
  }>;
}) => {
  const { pageSlug } = await props.params;

  const page = await getSinglePage(pageSlug);

  if (!page) {
    notFound();
  }

  const imageURL = page.bannerImage
    ? page.bannerImage.url
    : "/images/default-banner-image.jpg";

  return (
    <>
      <header className="relative flex items-center justify-center w-full h-[250px]">
        <Image
          src={imageURL}
          alt="Banner Image"
          className="absolute inset-0 object-cover object-center z-0 w-full h-full"
          width={page.bannerImage?.width}
          height={page.bannerImage?.height}
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold z-20 text-white relative">
          {page.title}
        </h1>
      </header>
      <section className="container mx-auto px-4">
        <BlockRenderer blocks={page.blocks} />
      </section>
    </>
  );
};

export default GenericPage;
