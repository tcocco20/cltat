const GenericPage = async (props: {
  params: Promise<{
    pageSlug: string;
  }>;
}) => {
  const { pageSlug } = await props.params;

  return (
    <div>
      <h1>Generic Page</h1>
      <p>This is a generic page with slug: {pageSlug}</p>
    </div>
  );
};

export default GenericPage;
