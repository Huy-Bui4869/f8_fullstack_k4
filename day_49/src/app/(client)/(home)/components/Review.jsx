const Review = () => {
  return (
    <section className="review" id="review">
      <h2 className="headingSection">
        <span>Đ</span>
        <span>Á</span>
        <span>N</span>
        <span>H</span>
        <span className="space"></span>
        <span>G</span>
        <span>I</span>
        <span>Á</span>
      </h2>
      <div className="row">
        <div className="ratestar">
          <h2>Đánh giá chuyến đi của bạn</h2>
          <div className="skills">
            <div className="skills_inner">
              <input type="radio" name="star" />
              <input type="radio" name="star" />
              <input type="radio" name="star" />
              <input type="radio" name="star" />
              <input type="radio" name="star" />
            </div>
          </div>
        </div>

        <form action="">
          <textarea
            name=""
            id=""
            placeholder="Viết đánh giá của bạn"
            className="text--black_while"
          ></textarea>
          <button type="submit" className="btnGlobals">
            Gửi tới chúng tôi
          </button>
        </form>
      </div>
    </section>
  );
};

export default Review;
