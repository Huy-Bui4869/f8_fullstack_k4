import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";

import "./Login.scss";
import { getApiKey } from "../../helpers/getApiKey";
import Loading from "../../components/Loading/Loading";
import { checkRegexEmail } from "../../helpers/regex";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("vui lòng nhập email");
      return;
    }
    if (!checkRegexEmail(email)) {
      toast.warning("Vui lòng nhập đúng định dạng email");
      return;
    }
    setLoading(true);

    getApiKey(email).then(async (response) => {
      const { res, data, apiKey } = response;
      setLoading(false);
      onLogin(apiKey, email);
    });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Fragment>
      <div className="box">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="example@expample.com"
            onChange={handleChange}
            defaultValue={"huybui2451@gmail.com"}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {loading && <Loading />}
    </Fragment>
  );
}
