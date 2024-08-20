import React from "react";
import classNames from "classnames";
function Card({ title, borderColor, hoverColor, onHover }) {
  return (
    <div
      className={classNames(
        "flex justify-center items-center w-full h-full bg-white  border-4 rounded-[40px] cursor-pointer transition-colors  duration-300 shadow-md hover:shadow-xl",
        borderColor
      )}
      style={{
        transition: "background-color 0.3s, color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
        e.currentTarget.style.color = "white";
        onHover(title);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "white";
        e.currentTarget.style.color = "black";
        onHover(null);
      }}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>{" "}
    </div>
  );
}
export default Card;
