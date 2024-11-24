type PoemPageProps = {
  params: {
    id: string;
  };
};

const PoemPage = ({ params: { id } }: PoemPageProps) => {
  return (
    <div>
      <h1>Poem {id}</h1>
    </div>
  );
};

export default PoemPage;
