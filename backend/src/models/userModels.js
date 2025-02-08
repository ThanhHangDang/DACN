const db = require("../config/databaseConfig.js");

const queryGetUserInformation = async (id) => {
  const [userInfor] = await db.query(
    `
    SELECT 
    js.*,
    u.username,
    u.email,
    u.phone_number,
    u.create_date,
    r.role_name,
    p.full_name,
    p.title,
    p.career_target,
    p.salary_expect,
    p.year_exp,
    p.gender,
    p.birthday,
    p.marital_status,
    p.address,
    p.district_id,
    p.nationality,
    p.percent_complete,
    p.last_modify_date,
    c.city_name
FROM 
    jobseeker js
JOIN 
    user_ u ON js.jobseeker_id = u.user_id
JOIN 
    catalog_role r ON u.role_id = r.role_id
JOIN 
    profile_jobseeker p ON js.jobseeker_id = p.profile_id
LEFT JOIN 
    catalog_city c ON p.work_place = c.city_id
WHERE 
    u.user_id = ?;
    `,
    [id]
  );
  return userInfor[0];
};

const queryGetExperienceByID = async (id) => {
  const [experience] = await db.query(
    `
    SELECT 
    exp.*
FROM 
    jobseeker js
JOIN 
    user_ u ON js.jobseeker_id = u.user_id
JOIN 
    profile_jobseeker p ON js.jobseeker_id = p.profile_id
LEFT JOIN 
    profile_experience exp ON p.profile_id = exp.profile_id
WHERE 
    u.user_id = ?;
    `,
    [id]
  );
  return experience;
};

const queryGetEducationByID = async (id) => {
  const [education] = await db.query(
    `
    SELECT 
    edu.*
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    profile_jobseeker p ON js.jobseeker_id = p.profile_id
LEFT JOIN
    profile_education edu ON p.profile_id = edu.profile_id
WHERE
    u.user_id = ?;
    `,
    [id]
  );
  return education;
};

const queryGetProjectByID = async (id) => {
  const [project] = await db.query(
    `
    SELECT 
    pro.*
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    profile_jobseeker p ON js.jobseeker_id = p.profile_id
LEFT JOIN
    profile_project pro ON p.profile_id = pro.profile_id
WHERE
    u.user_id = ?;
    `,
    [id]
  );
  return project;
};

const queryGetSkillByID = async (id) => {
  const [skill] = await db.query(
    `
    SELECT 
    sk.* 
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    profile_jobseeker p ON js.jobseeker_id = p.profile_id
LEFT JOIN
    profile_skill sk ON p.profile_id = sk.profile_id
WHERE
    u.user_id = ?;
    `,
    [id]
  );
  return skill;
};

const queryGetLanguageByID = async (id) => {
  //   const [language] = await db.query(
  //     `
  //     SELECT
  //     lang.*
  // FROM
  //     jobseeker js
  // JOIN
  //     user_ u ON js.jobseeker_id = u.user_id
  // JOIN
  //     profile_jobseeker p ON js.jobseeker_id = p.profile_id
  // LEFT JOIN
  //     profile_language lang ON p.profile_id = lang.profile_id
  // WHERE
  //     u.user_id = ?;
  //     `,
  //     [id]
  //   );
  //   return language;
};

const queryGetCertificateByID = async (id) => {
  const [certificate] = await db.query(
    `
    SELECT 
    cer.*
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    profile_jobseeker p ON js.jobseeker_id = p.profile_id
LEFT JOIN
    profile_certification cer ON p.profile_id = cer.profile_id
WHERE
    u.user_id = ?;
    `,
    [id]
  );
  return certificate;
};
const queryGetJobAppliedByID = async (id) => {
  const [jobApplied] = await db.query(
    `    
SELECT * from 
    (select job_id as id, date_appy from jobseeker_apply_job where jobseeker_id=?) as A 
join  
    (select job_id, employer_id, title, date_post, status_, work_location from job) as B 
    ON A.id = B.job_id 
join 
    (SELECT company_id, company_name, logo from company) as C ON B.employer_id = C.company_id;
    `,    
    [id]
  );
  return jobApplied;
};

const queryGetJobSavedByID = async (id) => {
  const [jobSaved] = await db.query(
    `
SELECT * from 
    (select job_id as id from jobseeker_save_job where jobseeker_id=?) as A 
join  
    (select job_id, employer_id, title, date_post, status_, work_location from job) as B 
    ON A.id = B.job_id 
join 
    (SELECT company_id, company_name, logo from company) as C ON B.employer_id = C.company_id;
    `,
    [id]
  );
  // chưa tôi ưu query, xem xét trả về id job rồi truy vấn for each.
  return jobSaved;
};

const queryGetFollowedCompanyByID = async (id) => {
  const [followedCompany] = await db.query(
    `
    SELECT 
    fc.*  
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    jobseeker_follow_employer fc ON u.user_id = fc.jobseeker_id
join 
    (SELECT company_id, company_name, logo from company) as C ON B.employer_id = C.company_id;
WHERE
    u.user_id = ?;
    `,
    [id]
  );
  return followedCompany;
};

module.exports = {
  queryGetUserInformation,
  queryGetExperienceByID,
  queryGetEducationByID,
  queryGetSkillByID,
  queryGetLanguageByID,
  queryGetProjectByID,
  queryGetCertificateByID,
  queryGetFollowedCompanyByID,
  queryGetJobSavedByID,
  queryGetJobAppliedByID
};
