const db = require("../config/databaseConfig.js");

const queryGetListEmployee = async () => {
  const [listEmployee] = await db.query(
    `
    select 
      js.avatar,
      js.jobseeker_id,
      pjs.full_name,
      pjs.year_exp,
      pjs.title
    from jobseeker js
    join profile_jobseeker pjs on js.jobseeker_id = pjs.profile_id;
    `
  );
  return listEmployee;
};

const queryGetEmployeeDetail = async (id) => {
  const [employeeDetail] = await db.query(
    `
    select
    js.avatar,
    pjs.*,
    u.email,
    u.phone_number,
    cl.level_name,
    cc.city_name as work_expected_place,
    -- group_concat(concat(pe.major, " ,", pe.school, " ,", pe.from_, " ,", pe.to_)) as education,
    JSON_ARRAYAGG(
            JSON_OBJECT(
                'major', pe.major,
                'school', pe.school,
                'from_', pe.from_,
                'to_', pe.to_
            )
        ) AS education_info,
    JSON_ARRAYAGG(
            JSON_OBJECT(
                'certification', pcer.certifications,
                'month', pcer.month_
            )
        ) AS certification_info,  
    JSON_ARRAYAGG(
            JSON_OBJECT(
                'exp_title', pexp.exp_title,
                'exp_from', pexp.exp_from,
                'exp_to', pexp.exp_to,
                'exp_company', pexp.exp_company,
                'exp_description', pexp.exp_description
            )
        ) AS experience_info,
    JSON_ARRAYAGG(
            JSON_OBJECT(
                'project_name', ppro.project_name,
                'project_from', ppro.project_from,
                'project_to', ppro.project_to,
                'project_description', ppro.project_description
            )
        ) AS project_info,
    JSON_ARRAYAGG(
            JSON_OBJECT(
                'skill', pski.skill
            )
        ) AS skill_info
    from jobseeker js
    join profile_jobseeker pjs on js.jobseeker_id = pjs.profile_id
    join user_ u on js.jobseeker_id = u.user_id
    join catalog_level cl on pjs.level_id = cl.level_id
    join catalog_city cc on pjs.work_place = cc.city_id
    left join profile_education pe on js.jobseeker_id = pe.profile_id
    left join profile_certification pcer on js.jobseeker_id = pcer.profile_id
    left join profile_experience pexp on js.jobseeker_id = pexp.profile_id
    left join profile_skill pski on js.jobseeker_id = pski.profile_id
    left join profile_project ppro on js.jobseeker_id = ppro.profile_id
    where js.jobseeker_id = ?;
    `,
    [id]
  );
  return employeeDetail;
};

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
      p.level_id,
      c.city_name,
      c.city_id,
      l.level_name as situations
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
    JOIN
      catalog_level l ON p.level_id = l.level_id
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

const queryUpdateJobseekerProfileImage = async (id, url) => {
  const [affectedRows] = await db.query(
    `
    UPDATE jobseeker
      SET avatar = ?
    WHERE jobseeker_id = ?;

    `,
    [url, id]
  );
  return affectedRows;
};

const queryUpdateJobseekerProfile = async (id, profile) => {
  const [affectedRows] = await db.query(
    `
    UPDATE 
      user_ u
    JOIN 
      profile_jobseeker p ON u.user_id = p.profile_id
    SET 
      p.full_name = ?,
      u.email = ?,
      u.phone_number = ?,
      p.title = ?,
      p.address = ?,
      p.year_exp = ?,
      p.level_id = ?
    WHERE 
      u.user_id = ?;  -- Replace with the actual user ID
    `,
    [
      profile.full_name,
      profile.email,
      profile.phone_number,
      profile.title,
      profile.address,
      profile.year_exp,
      profile.level_id,
      id,
    ]
  );
  return affectedRows;
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

const queryAddSkill = async (id, skill) => {
  const [affectedRows] = await db.query(
    `
    insert into profile_skill(profile_id, skill)
    values(?, ?)
    `,
    [id, skill.skill_name]
  );
  return affectedRows;
};

const queryAddCertification = async (id, certification) => {
  const [affectedRows] = await db.query(
    `
    insert into profile_certification(profile_id, certifications, month_)
    values(?, ?, ?)
    `,
    [id, certification.certificate_name, certification.date]
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
    WHERE profile_id = ? AND profile_certifications_id = ?;
    `,
    [id, id_delete]
  );
  return affectedRows;
};

const queryGetNotificationByID = async (id) => {
  const [notification] = await db.query(
    `
    SELECT m.*,
    u.username
    FROM messenger m
    Join user_ u ON m.sender_id = u.user_id
    WHERE receiver_id = ?;
    `,
    [id]
  );
  return notification;
};

module.exports = {
  queryGetListEmployee,
  queryGetEmployeeDetail,

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
  queryUpdateJobseekerProfileImage,
  queryUpdateJobseekerProfile,
  queryUpdateExpectedJob,
  queryUpdateCareerTarget,
  queryAddExperience,
  queryAddEducation,
  queryAddProject,
  queryAddSkill,
  queryAddCertification,

  queryDeleteExperience,
  queryDeleteEducation,
  queryDeleteProject,
  queryDeleteSkill,
  queryDeleteLanguage,
  queryDeleteCertification,

  queryGetNotificationByID,
};
