import React, { useState } from "react";

const Rating = ({ ratingData }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComent] = useState("");

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const data = ratingData || {
    employer_id: 123,
    jobseeker_id: 123,
    score: [
      {
        score: 1,
        count: 20,
      },
      {
        score: 2,
        count: 20,
      },
      {
        score: 3,
        count: 20,
      },
      {
        score: 4,
        count: 20,
      },
      {
        score: 5,
        count: 20,
      },
    ],
    averageScore: 4.3,
    employer_score: 5,
    employer_coment: "hihihi",
    create_at: new Date(),
    totalComent: 100,
  };

  const handleRateCandidate = () => {
    console.log(
      "Employer: ",
      data.employer_id,
      " đánh giá Candidate: ",
      data.jobseeker_id,
      " score ",
      rating,
      " comnent: ",
      comment
    );
  };

  return (
    <div className="container mt-5 mb-2">
      <h2 className="mb-3">Rating</h2>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <h1 className="display-4 mt-3 mb-4">{data.averageScore}</h1>
              <div className="mb-3">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-half text-warning"></i>
              </div>
              <h6 className="text-muted">
                Based on {data.totalComent} reviews
              </h6>
            </div>
            <div className="col-md-8">
              {data.score.map((item, index) => (
                <div className="rating-bar mb-3" key={index}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span>{item.score} stars</span>
                    <small className="text-muted">
                      {(item.count / data.totalComent) * 100}%
                    </small>
                  </div>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{
                        width: `${(item.count / data.totalComent) * 100}%`,
                      }}
                      aria-valuenow={(item.count / data.totalComent) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />

          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Bình luận của bạn</h6>
              <span className="comment-time">1 hour ago</span>
            </div>

            <p className="mb-2">{data.employer_coment}</p>
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#ratingModal"
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex="-1"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Write a Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Your Rating</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <i
                        key={num}
                        className={`bi ${
                          rating <= num ? "bi-star-fill" : "bi-star"
                        } rating-star`}
                        style={{
                          cursor: "pointer",
                          color: "#ffc107",
                          fontSize: "1.5rem",
                        }}
                        onClick={() => handleStarClick(num)}
                      ></i>
                    ))}
                  </div>
                  <input type="hidden" name="rating" value={rating} />
                </div>
                <div className="mb-3">
                  <label htmlFor="review" className="form-label">
                    Your Review
                  </label>
                  <textarea
                    className="form-control"
                    id="review"
                    rows="3"
                    required
                    onChange={(e) => {
                      setComent(e.target.value);
                    }}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRateCandidate}
                data-bs-dismiss="modal"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
