import Link from "next/link";
import Image from "next/image";

import pageError from "~/assets/image/pageError.png";

const notFound = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#242424",
        scale: 1.05,
        position: "relative",
      }}
    >
      <Image
        src={pageError}
        alt="notFound"
        style={{ width: "100vw", height: "100vh" }}
      />
      <Link
        href={"/"}
        style={{
          position: "absolute",
          left: "50%",
          top: "74%",
          zIndex: 2,
          color: "#fefefe",
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        Go home
      </Link>
    </div>
  );
};

export default notFound;
