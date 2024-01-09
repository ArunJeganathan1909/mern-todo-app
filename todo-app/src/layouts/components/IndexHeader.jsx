import React from "react";
import ArToDoLogo from "../../assets/ArToDo.svg";
import '../../style/components/IndexHeader.css'

const IndexHeader = () => {
  return (
    <div className="index-title">
      <img src={ArToDoLogo} alt="ArToDoLogo" className="index-logo" />
      <h1 className="index-heading">AR TODO APP</h1>{" "}
    </div>
  );
};

export default IndexHeader;
