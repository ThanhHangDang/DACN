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
    c.city_name,
    c.city_id
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
    edu.*,
    c.education_title
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    profile_jobseeker p ON js.jobseeker_id = p.profile_id
LEFT JOIN
    profile_education edu ON p.profile_id = edu.profile_id
JOIN 
    catalog_education c ON c.education_id = edu.education_id
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
    SELECT 
    ja.*
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    jobseeker_apply_job ja ON u.user_id = ja.jobseeker_id
WHERE
    u.user_id = ?;
    `,
    [id]
  );
  return jobApplied;
};

const queryGetJobSavedByID = async (id) => {
  const [jobSaved] = await db.query(
    `
    SELECT 
    jsj.*
FROM
    jobseeker js
JOIN
    user_ u ON js.jobseeker_id = u.user_id
JOIN
    jobseeker_save_job jsj ON u.user_id = jsj.jobseeker_id
WHERE
    u.user_id = ?;
    `,
    [id]
  );
  return jobSaved;
};

const queryGetFollowedCompanyByID = async (id) => {
  console.log(id);
  const [followedCompany] = await db.query(
    `
    SELECT employer_id 
FROM
    jobseeker_follow_employer 
WHERE
    jobseeker_id = ?;
    `,
    [id]
  );
  console.log(followedCompany);
  return followedCompany;
};

const queryGetCompanyInformation = async (id) => {
  const [result] = await db.query(
    `SELECT * FROM (Select * FROM company where company_id = ?) as table1 JOIN catalog_scale on scale_id= scale  JOIN company_location ON company_location.company_id = table1.company_id JOIN catalog_industry where catalog_industry.industry_id=table1.industry_id`,
    [id]
  );
  const [result2] = await db.query(
    `
                    SELECT DISTINCT catalog_benefit.benefit_name
                    FROM company_benifit 
                    JOIN catalog_benefit ON catalog_benefit.benefit_id = company_benifit.benefit_id
                    WHERE company_benifit.company_id = ?
                `,
    [id]
  );
  const finalResult = { ...result[0], company_benefits: result2 };
  return finalResult;
};

const queryUpdateExpectedJob = async (id, job) => {
  const [affectedRows] = await db.query(
    `
    UPDATE 
    profile_jobseeker
    SET 
      work_place = ?,
      salary_expect = ?
    WHERE profile_id = ?;
    `,
    [job.workCityPlace, job.salary, id]
  );
  return affectedRows;
};

const queryUpdateCareerTarget = async (id, career_target) => {
  const [affectedRows] = await db.query(
    `
    Update
    profile_jobseeker
    set
      career_target = ?
    where profile_id = ?
    `,
    [career_target, id]
  );
  return affectedRows;
};

const queryAddExperience = async (id, experience) => {
  const [affectedRows] = await db.query(
    `
    insert into profile_experience(profile_id, exp_title, exp_from, exp_to, exp_company, exp_description)
    values(?, ?, ?, ?, ?, ?)
    `,
    [
      id,
      experience.job,
      experience.startYear,
      experience.endYear,
      experience.company,
      experience.description,
    ]
  );
  console.log(affectedRows);
  return affectedRows;
};

const queryAddEducation = async (id, education) => {
  const [affectedRows] = await db.query(
    `
    insert into profile_education(profile_id, education_id, major, school, from_, to_)
    values(?, ?, ?, ?, ?, ?)
    `,
    [
      id,
      education.education_id,
      education.major,
      education.school,
      education.startYear,
      education.endYear,
    ]
  );
  console.log(affectedRows);
  return affectedRows;
};

const queryAddProject = async (id, project) => {
  const [affectedRows] = await db.query(
    `
    insert into profile_project(profile_id, project_name, project_from, project_to, project_description)
    values(?, ?, ?, ?, ?)
    `,
    [
      id,
      project.project_name,
      project.project_from,
      project.project_to,
      project.project_description,
    ]
  );
  return affectedRows;
};

const queryDeleteExperience = async (id, id_delete) => {
  const [affectedRows] = await db.query(
    `
    DELETE FROM profile_experience
    WHERE profile_id = ? AND profile_experience_id = ?;
    `,
    [id, id_delete]
  );
  return affectedRows;
};

const queryDeleteEducation = async (id, id_delete) => {
  const [affectedRows] = await db.query(
    `
    DELETE FROM profile_education
    WHERE profile_id = ? AND profile_education_id = ?;
    `,
    [id, id_delete]
  );
  return affectedRows;
};

const queryDeleteProject = async (id, id_delete) => {
  const [affectedRows] = await db.query(
    `
    DELETE FROM profile_project
    WHERE profile_id = ? AND profile_project_id = ?;
    `,
    [id, id_delete]
  );
  return affectedRows;
};

const queryDeleteSkill = async (id, id_delete) => {
  const [affectedRows] = await db.query(
    `
    DELETE FROM profile_skill
    WHERE profile_id = ? AND profile_skill_id = ?;
    `,
    [id, id_delete]
  );
  return affectedRows;
};

const queryDeleteLanguage = async (id, id_delete) => {
  const [affectedRows] = await db.query(
    `
    DELETE FROM profile_language
    WHERE profile_id = ? AND profile_language_id = ?;
    `,
    [id, id_delete]
  );
  return affectedRows;
};

const queryDeleteCertification = async (id, id_delete) => {
  const [affectedRows] = await db.query(
    `
    DELETE FROM profile_certification
    WHERE profile_id = ? AND profile_certification_id = ?;
    `,
    [id, id_delete]
  );
  return affectedRows;
};

const queryGetNotificationByID = async (id) => {
  const [notification] = await db.query(
    `
    SELECT m.*,
    u.username,
    FROM messenger m
    Join user_ u ON m.sender_id = u.user_id
    WHERE receiver_id = ?;
    `,
    [id]
  );
  return notification;
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
  queryGetJobAppliedByID,
  queryGetCompanyInformation,
  queryUpdateExpectedJob,
  queryUpdateCareerTarget,
  queryAddExperience,
  queryAddEducation,
  queryAddProject,

  queryDeleteExperience,
  queryDeleteEducation,
  queryDeleteProject,
  queryDeleteSkill,
  queryDeleteLanguage,
  queryDeleteCertification,
};
