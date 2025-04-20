export default function MainCategorySection() {
  const categories = [
    { icon: "bi-seedling", title: "Agriculture", jobs: "1254" },
    { icon: "bi-recycle", title: "Metal Production", jobs: "816" },
    { icon: "bi-bag", title: "Commerce", jobs: "2082" },
    { icon: "bi-building", title: "Construction", jobs: "1520" },
    { icon: "bi-suitcase", title: "Hotels & Tourism", jobs: "1022" },
    { icon: "bi-mortarboard", title: "Education", jobs: "1496" },
    { icon: "bi-cash-coin", title: "Financial Services", jobs: "1529" },
    { icon: "bi-truck", title: "Transport", jobs: "1244" },
  ];

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
                <i className={`bi ${cat.icon} fs-1 text-success mb-3`}></i>
                <h6 className="fw-bold">{cat.title}</h6>
                <div className="badge bg-light text-success mt-2 px-3 py-2">
                  {cat.jobs} jobs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
