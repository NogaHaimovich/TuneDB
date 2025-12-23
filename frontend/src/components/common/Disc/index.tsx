import "./styles.scss";

const Disc = ({ direction = "right" }) => {
  return (
    <div className={`disc disc--${direction}`}>
      <div className="disc__label">
        <div className="disc__hole"></div>
      </div>
    </div>
  );
};

export default Disc;
