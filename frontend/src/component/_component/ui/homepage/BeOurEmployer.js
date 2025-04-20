import { NavLink } from "react-router-dom";

export default function BeOurEmployer() {
  return (
    <section className="py-5">
      <div className="container">
        {/* Phần trên: ảnh + text */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div
              className="w-100 rounded-4"
              style={{
                backgroundImage:
                  "url('/img/homepage/doi-tac-trong-kinh-doanh.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "360px",
                borderRadius: "1rem",
              }}
            ></div>
          </div>

          <div className="col-lg-6">
            <h2 className="fw-bold mb-3">
              Ready to find the right candidate for <br /> Your Company
            </h2>
            <p className="text-muted mb-4">
              Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices
              purus diam egestas amet faucibus tempor blandit. Elit velit mauris
              aliquam est diam. Leo sagittis consectetur diam morbi erat
              aenean...
            </p>
            <div className="d-flex gap-3">
              <NavLink to="/login" className="btn btn-success">
                Login
              </NavLink>
              <NavLink to="/auth" className="btn btn-outline-secondary">
                Register
              </NavLink>
            </div>
          </div>
        </div>

        {/* Phần dưới: stats */}
        <div className="row text-center pt-4">
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="text-success fw-bold">12k+</h3>
            <h6 className="fw-bold">Clients worldwide</h6>
            <p className="text-muted small">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
              Blandit a massa elementum...
            </p>
          </div>

          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="text-success fw-bold">20k+</h3>
            <h6 className="fw-bold">Active resume</h6>
            <p className="text-muted small">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
              Blandit a massa elementum...
            </p>
          </div>

          <div className="col-md-4">
            <h3 className="text-success fw-bold">18k+</h3>
            <h6 className="fw-bold">Companies</h6>
            <p className="text-muted small">
              At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
              Blandit a massa elementum...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
