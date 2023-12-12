const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h2 className="headingSection">
        <span>L</span>
        <span>I</span>
        <span>Ê</span>
        <span>N</span>
        <span className="space"></span>
        <span>H</span>
        <span>Ệ</span>
      </h2>

      <div className="row">
        <div className="img">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59607.09656575994!2d105.81673881210055!3d20.97485064900601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac398657c2ad%3A0xe0a5e23eaaed780!2zSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1702400224817!5m2!1svi!2s"
            // width="600"
            // height="450"
            // style="border:0;"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <form action="">
          <div className="inputBox">
            <input
              type="text"
              placeholder="Têc của bạn"
              className="bg--input"
            />
            <input
              type="email"
              placeholder="Email liên hệ"
              className="bg--input"
            />
          </div>
          <div className="inputBox">
            <input
              type="number"
              placeholder="Số điện thoại"
              className="bg--input"
            />
            <input type="email" placeholder="Chủ đề" className="bg--input" />
          </div>
          <textarea
            name=""
            id=""
            placeholder="Viết lời nhắn chủa bạn"
            className="bg--input"
          ></textarea>
          <button className="btnGlobals">Gửi tới chúng tôi</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
