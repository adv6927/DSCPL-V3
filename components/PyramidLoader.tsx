interface PyramidLoaderProps {
  isDark?: boolean;
}

const PyramidLoader = ({ isDark = true }: PyramidLoaderProps) => {
  const pyramidStyle = isDark ? 'pyramid-dark' : 'pyramid-light';
  
  return (
    <div className={`pyramid-loader ${pyramidStyle}`}>
      <div className="wrapper">
        <div className="side side1"></div>
        <div className="side side2"></div>
        <div className="side side3"></div>
        <div className="side side4"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default PyramidLoader;