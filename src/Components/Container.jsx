const Container = ({ className, children }) => {
  return <div className={`max-w-7xl mx-auto px-3 ${className}`}>{children}</div>;
};

export default Container;
