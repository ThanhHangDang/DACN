export default function ComPanyHeard({
  companyInformation,
  heightBg = "250px",
  logoSize = "80px",
}) {
  return (
    <div className="card">
      <div className="card-header p-0">
        <div className="position-relative">
          <img
            src={
              companyInformation?.background
                ? companyInformation.background
                : "/img/default-background/defaultBg.jpg"
            }
            // src="/img/default-background/defaultBg.jpg"
            alt="Company Banner"
            className="w-100"
            style={{ height: heightBg, objectFit: "cover" }}
          />
          <div className="position-absolute bottom-0 start-0 p-3">
            <div className="d-flex align-items-center">
              <img
                src={
                  companyInformation?.logo || companyInformation?.company_logo
                }
                alt="Company Logo"
                className="rounded-circle border border-white"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div className="ms-3">
                <h5 className="text-white fw-bold">
                  {companyInformation?.company_name}
                </h5>
                {/* <p className="text-white mb-0">
                    https://hapas.vn | 25-99 nhân viên | 87 người theo dõi
                  </p> */}
                <p className="text-white mb-0">
                  {companyInformation?.scale_min
                    ? companyInformation.scale_min
                    : "0"}{" "}
                  -{" "}
                  {companyInformation?.scale_max
                    ? companyInformation.scale_max
                    : companyInformation?.scale_min
                    ? companyInformation.scale_min
                    : "0"}{" "}
                  nhân viên |{" "}
                  {companyInformation?.count_follower
                    ? companyInformation.count_follower
                    : "0"}{" "}
                  người theo dõi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
