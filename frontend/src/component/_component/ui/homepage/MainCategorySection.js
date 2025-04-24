import { NavLink } from "react-router-dom";
export default function MainCategorySection({JobCountByIndustry}) {
  const categories =  JobCountByIndustry? JobCountByIndustry: [];
  return (
    <section className="py-5" style={{ backgroundColor: "#e9f6f6" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Browse by Main Category</h2>
          <p className="text-muted">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum id scel...
          </p>
        </div>

        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="bg-white text-center p-4 rounded-4 shadow-sm h-100 hover-shadow transition">
                          <NavLink
                            to={`/post?industry_id=${cat.industry_id}`}
                            className="text-success text-decoration-underline fw-semibold"
                          >
                <i className={`bi ${cat.icon} fs-1 text-success mb-3`}></i>
                <h6 className="fw-bold">{cat.industry_name}</h6>
                          </NavLink>
                <div className="badge bg-light text-success mt-2 px-3 py-2">
                  {cat.job_count} jobs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
