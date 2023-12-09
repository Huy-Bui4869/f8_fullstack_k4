import Link from "next/link";

import "./component.scss";

const SocialContact = ({ about }) => {
  const { title, phone, zalo, email, facebook, youtube } = about;
  console.log(phone);

  return (
    <div className="socialContact">
      <h2 className="sub-title">{title}</h2>
      <ul>
        <li>
          Phone: <Link href={"/"}>{phone}</Link>
        </li>
        <li>
          Zalo: <Link href={"/"}>{zalo}</Link>
        </li>
        <li>
          Email: <Link href={"/"}>{email}</Link>
        </li>
        <li>
          Facebook:{" "}
          <Link href={facebook} target="_blank">
            {facebook}
          </Link>
        </li>
        <li>
          Youtube:{" "}
          <Link href={youtube} target="_blank">
            {youtube}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialContact;
