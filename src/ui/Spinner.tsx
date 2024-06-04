const Spinner: React.FC = () => {
  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%]">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
