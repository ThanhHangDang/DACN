import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useGetItemProfileQuery } from "../../../redux_toolkit/jobseekerApi.js";
import TitleComponent from "../../_component/ui/TitleComponent.js";
import CandidateDetail from "../../_component/ui/DetailCandidateLayout.js";

export default function EmployeeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetItemProfileQuery({
    type: "jobseeker",
    profile_id: id,
  });
  const jobseekerDetail = data || [];
  const { isLogin, user } = useSelector((state) => state.auth);
  const ratingData = null; //Gọi API về

  useEffect(() => {
    if (!isLogin || user?.role !== 2) {
      navigate("/login");
    }
  }, [navigate, user, isLogin]);

  return (
    <>
      <TitleComponent
        title={"Candicate Detail"}
        description={"Let choose a right Candicate for your Camany!"}
      />
      <CandidateDetail employerID={user?.id} ratingData={ratingData} />
    </>
  );
}
