
interface Props {
  params: {
    id: string;
  };
}

export default async function CardsByIdPage({ params }: Props) {
  const { id } = params;



  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
