export const getMovieDetailServer = async ({
  queryKey,
}: {
  queryKey: [_1: string, _2: string, _3: string, id: string];
}) => {
  const [_1, _2, _3, id] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}?language=ko-KR`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
      next: {
        tags: ["movies", "detail", "movie", id],
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
};