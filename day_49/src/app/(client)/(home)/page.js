import Gallery from "./components/Gallery";
import Packages from "./components/Packages";
import Review from "./components/Review";
import Services from "./components/Services";
import Bander from "./components/Bander";
import Book from "./components/Book";
import Contact from "./components/Contact";
import Promo from "./components/Promo";

import SERVER_API, { endpoint } from "~/config/config";
import client from "~/config/client";

const getPages = async () => {
  const response = await fetch(`${SERVER_API}${endpoint.pages}`, {
    cache: "no-cache",
  });
  return response.json();
};

const HomePages = async () => {
  const listPage = await getPages();
  const { servicesBox, galleryBox } = listPage[0];

  return (
    <>
      <Bander />
      <Book />
      <Promo />
      <Packages />
      <Services servicesBox={servicesBox} />
      <Gallery galleryBox={galleryBox} listPage={listPage} />
      <Review />
      <Contact />
    </>
  );
};

export default HomePages;
