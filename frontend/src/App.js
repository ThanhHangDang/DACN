import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Header from "./component/_component/header.js";
import Footer from "./component/_component/footer.js";

import Login from "./component/AuthPage/login.js";
import Auth from "./component/AuthPage/auth.js";
import ResetPassword from "./component/AuthPage/resetPassword.js";

import HomePage from "./component/HomePage/index.js";
import JobSeekerPage from "./component/JobSeekersPage/index.js";
import JobSeekerOverview from "./component/JobSeekersPage/Overview/index.js";
import JobSeekerProfile from "./component/JobSeekersPage/Profile/index.js";
import JobSeekerWork from "./component/JobSeekersPage/MyWork/index.js";
import JobSeekerCompany from "./component/JobSeekersPage/MyCompany/index.js";
import JobSeekerNotification from "./component/JobSeekersPage/MyNotification/index.js";
import JobseekerAccountSetting from "./component/JobSeekersPage/AccountSetting/index.js";

import yourCV from "./component/JobSeekersPage/Profile/yourCV.js";
import yourCVwithUs from "./component/JobSeekersPage/Profile/yourCVwithUs.js";

import CompanySeeYou from "./component/JobSeekersPage/MyCompany/companySeeYou.js";
import CompanyYouFollow from "./component/JobSeekersPage/MyCompany/companyYouFollow.js";

import YourApply from "./component/JobSeekersPage/MyWork/yourApply.js";
import SavedWork from "./component/JobSeekersPage/MyWork/savedWork.js";
import Invitation from "./component/JobSeekersPage/MyWork/invitation.js";

import EmployerPage from "./component/EmployerPage/index.js";
import EmployerOverview from "./component/EmployerPage/Overview/index.js";
import EmployerProfile from "./component/EmployerPage/Profile/index.js";
import EmployeeProfileManage from "./component/EmployerPage/Profile/myEmployeeProfile.js";
import SaveEmployeeProfile from "./component/EmployerPage/Profile/saveEmployeeProfile.js";
import CompanyProfile from "./component/EmployerPage/Profile/companyProfile.js";
import EmployerPost from "./component/EmployerPage/MyPost/index.js";
import EmployerNotification from "./component/EmployerPage/MyNotification/index.js";
import EmployerAccountSetting from "./component/EmployerPage/AccountSetting/index.js";

import WorkMangePage from "./component/HomePage/WorkManagePage/index.js";
import WorkDetail from "./component/HomePage/WorkManagePage/workDetail.js";

import EmployeeMaganePage from "./component/EmployerPage/EmployeeMaganePage/index.js";
import EmployeeDetail from "./component/EmployerPage/EmployeeMaganePage/employeeDetail.js";

import ListCompany from "./component/HomePage/companyManage/index.js";
import CompanyDetail from "./component/HomePage/companyManage/companyDetail.js";

import PageNotFound from "./component/PageNotFound/index.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={HomePage} />

          <Route path="/login" Component={Login} />
          <Route path="/auth" Component={Auth} />
          <Route path="/reset-password" Component={ResetPassword} />

          <Route Component={JobSeekerPage}>
            <Route path="/jobseeker-overview" Component={JobSeekerOverview} />
            <Route Component={JobSeekerProfile}>
              <Route path="/jobseeker-profile" Component={yourCVwithUs} />
              <Route path="/jobseeker-profile/upload" Component={yourCV} />
            </Route>
            <Route Component={JobSeekerCompany}>
              {/* <Route path="/jobseeker-mycompany" Component={CompanySeeYou} /> */}
              <Route
                path="/jobseeker-company-follow"
                Component={CompanyYouFollow}
              />
            </Route>
            <Route Component={JobSeekerWork}>
              <Route path="/jobseeker-mywork" Component={YourApply} />
              <Route path="/jobseeker-savedwork" Component={SavedWork} />
              <Route path="/jobseeker-invitation" Component={Invitation} />
            </Route>
            <Route
              path="/jobseeker-notification"
              Component={JobSeekerNotification}
            />
            <Route
              path="/jobseeker-account"
              Component={JobseekerAccountSetting}
            />
          </Route>

          <Route Component={EmployerPage}>
            <Route path="/employer-overview" Component={EmployerOverview} />
            <Route Component={EmployerProfile}>
              <Route path="/employer-profile" Component={CompanyProfile} />
              <Route
                path="/employer-manage-employee"
                Component={EmployeeProfileManage}
              />
              <Route
                path="/save-employee-profile"
                Component={SaveEmployeeProfile}
              />
            </Route>
            <Route path="/employer-post" Component={EmployerPost} />
            <Route
              path="/employer-notification"
              Component={EmployerNotification}
            />
            <Route
              path="/employer-account"
              Component={EmployerAccountSetting}
            />
          </Route>

          <Route path="/post" Component={WorkMangePage} />

          <Route path="/post-detail/:id" Component={WorkDetail} />

          <Route path="/employee" Component={EmployeeMaganePage} />

          <Route path="/employee-detail/:id" Component={EmployeeDetail} />

          {/* Anh Đạt làm 2 cái này */}
          <Route path="/list-company" Component={ListCompany} />
          <Route path="/company-detail/:companyId" Component={CompanyDetail} />

          <Route path="*" Component={PageNotFound} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
