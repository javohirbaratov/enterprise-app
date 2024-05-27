import React from "react";
import LazyImage from "../lazyLoad/LazyImage";

function PrintChekContent({ children }) {
  return (
    <>
      <LazyImage imgUrl={"/images/custom-logo.jpg"} width={120} />
      <p style={{ marginBottom: "1rem" }}>My system</p>

      {children}

      <div
        style={{
          marginTop: "1rem",
          borderTop: "1px solid",
        }}
      >
        <p
          style={{
            paddingBottom: ".5rem",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          "Sofchiken bilan halollik sari"
        </p>
      </div>
    </>
  );
}

export default PrintChekContent;
