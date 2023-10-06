import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  return (
    <ClipLoader
      color="lightblue"
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
