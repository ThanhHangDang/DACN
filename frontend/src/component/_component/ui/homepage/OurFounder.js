export default function FounderSection() {
  const url =
    "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg";
  const testimonials = [
    {
      name: "Thanh Hang Dang",
      role: "Founder",
      avatar: url,
      rating: 5,
      title: "Amazing services",
      text: "Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis",
    },
    {
      name: "Van Nhan Truong",
      role: "Founder",
      avatar: url,
      rating: 5,
      title: "Everything simple",
      text: "Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus",
    },
    {
      name: "Thanh Dat Nguyen",
      role: "Founder",
      avatar: url,
      rating: 5,
      title: "Awesome, thank you!",
      text: "Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus. Nulla et tempor montes",
    },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#e8f4f3" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Niềm tin và xác thực</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Mỗi giấc mơ lớn đều bắt đầu từ một niềm tin nhỏ – rằng ai cũng xứng
            đáng có cơ hội để phát triển sự nghiệp và sống đúng với giá trị của
            mình...
          </p>
        </div>

        <div className="row">
          {testimonials.map((item, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="bg-white rounded-4 p-4 shadow-sm h-100 d-flex flex-column justify-content-between">
                {/* Stars */}
                <div className="mb-3 text-warning">
                  {"★".repeat(item.rating)}
                  {"☆".repeat(5 - item.rating)}
                </div>

                {/* Title */}
                <h5 className="fw-bold">{item.title}</h5>
                <p className="fst-italic text-muted">{item.text}</p>

                {/* Avatar and quote */}
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <div className="text-muted small">{item.role}</div>
                    </div>
                  </div>
                  <div className="text-success fs-3">“</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
