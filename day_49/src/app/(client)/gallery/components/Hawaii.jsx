import Link from "next/link";

const Hawaii = () => {
  return (
    <section
      className="hawaii"
      id="hawaii"
      style={{ height: "300px", border: "2px solid black", marginTop: "5px" }}
    >
      <h1>Hawaii</h1>
      <Link href={"#hawaii"}>click me</Link>
    </section>
  );
};

export default Hawaii;
