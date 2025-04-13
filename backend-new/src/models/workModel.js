const db = require("../config/databaseConfig.js");

const queryGetLatestWork = async () => {
  const [work] = await db.query(
    `
    SELECT 
    j.*,
    u.username AS employer_name,
    c.company_name,
    c.logo AS company_logo,
    ind.industry_name,
    func.job_function_name,
    loc.city_name AS work_location_name,
    lvl.level_name AS job_level_name,
    edu.education_title AS education_requirement
FROM 
    job j
LEFT JOIN 
    user_employer e ON j.employer_id = e.employer_id
LEFT JOIN 
    user_ u ON e.employer_id = u.user_id
LEFT JOIN 
    company c ON e.employer_id = c.company_id
LEFT JOIN 
    catalog_industry ind ON j.industry_id = ind.industry_id
LEFT JOIN 
    catalog_job_function func ON j.job_function_id = func.job_function_id
LEFT JOIN 
    catalog_city loc ON j.work_location = loc.city_id
LEFT JOIN 
    catalog_level lvl ON j.level_id = lvl.level_id
LEFT JOIN 
    catalog_education edu ON j.require_education = edu.education_id
ORDER BY 
    j.date_post DESC
LIMIT 30;
    `
  );
  return work;
};

const queryGetWorkDetail = async (workId) => {
  const [work] = await db.query(
    `
 SELECT 
    j.*,
    u.username AS employer_name,
    c.company_name,
    c.logo AS company_logo,
    ind.industry_name,
    func.job_function_name,
    loc.city_name AS work_location_name,
    lvl.level_name AS job_level_name,
    edu.education_title AS education_requirement,
    GROUP_CONCAT(b.benefit_name SEPARATOR ', ') AS catalog_benefit,
    (SELECT GROUP_CONCAT(cta.tags_content SEPARATOR ', ')
     FROM job_require_skill js
     LEFT JOIN catalog_tags cta on cta.tag_id = js.skill_id
     WHERE js.job_id = j.job_id) AS job_skills,
    GROUP_CONCAT(DISTINCT l.language_name SEPARATOR ', ') AS languages -- Sử dụng DISTINCT để loại bỏ trùng lặp
FROM
    job j
LEFT JOIN
    user_employer e ON j.employer_id = e.employer_id
LEFT JOIN
    user_ u ON e.employer_id = u.user_id
LEFT JOIN
    company c ON e.employer_id = c.company_id
LEFT JOIN
    catalog_industry ind ON j.industry_id = ind.industry_id
LEFT JOIN
    catalog_job_function func ON j.job_function_id = func.job_function_id
LEFT JOIN
    catalog_city loc ON j.work_location = loc.city_id
LEFT JOIN
    catalog_level lvl ON j.level_id = lvl.level_id
LEFT JOIN
    catalog_education edu ON j.require_education = edu.education_id
LEFT JOIN
    company_benefit cb ON c.company_id = cb.company_id
LEFT JOIN
    catalog_benefit b ON cb.benefit_id = b.benefit_id 
LEFT JOIN
    job_require_language jrl ON j.job_id = jrl.job_id -- Join với job_require_language
LEFT JOIN
    catalog_language l ON jrl.language_id = l.language_id -- Join với catalog_language
WHERE
    j.job_id = ?
GROUP BY
    j.job_id
LIMIT 1;
    `,
    [workId]
  );
  return work;
};

const queryGetAllWorks = async (limit, offset) => {
  const [work] = await db.query(
    `
      SELECT 
      j.*,
      u.username AS employer_name,
      c.company_name,
      c.logo AS company_logo,
      ind.industry_name,
      func.job_function_name,
      loc.city_name AS work_location_name,
      lvl.level_name AS job_level_name,
      edu.education_title AS education_requirement
  FROM 
      job j
  LEFT JOIN 
      user_employer e ON j.employer_id = e.employer_id
  LEFT JOIN 
      user_ u ON e.employer_id = u.user_id
  LEFT JOIN 
      company c ON e.employer_id = c.company_id
  LEFT JOIN 
      catalog_industry ind ON j.industry_id = ind.industry_id
  LEFT JOIN 
      catalog_job_function func ON j.job_function_id = func.job_function_id
  LEFT JOIN 
      catalog_city loc ON j.work_location = loc.city_id
  LEFT JOIN 
      catalog_level lvl ON j.level_id = lvl.level_id
  LEFT JOIN 
      catalog_education edu ON j.require_education = edu.education_id
  ORDER BY 
      j.date_post DESC
  LIMIT ? OFFSET ?;;
      `,
    [limit, offset]
  );
  return work;
};

const queryGetCountTotalWorks = async () => {
  const [total] = await db.query(
    `
      SELECT COUNT(*) as total FROM job;
    `
  );
  return total;
};

const queryGetWorkByUser = async (userId) => {
  const [work] = await db.query(
    `
     SELECT 
      j.*,
      u.username AS employer_name,
      c.company_name,
      c.logo AS company_logo,
      ind.industry_name,
      func.job_function_name,
      loc.city_name AS work_location_name,
      lvl.level_name AS job_level_name,
      edu.education_title AS education_requirement
  FROM 
      job j
  LEFT JOIN 
      user_employer e ON j.employer_id = e.employer_id
  LEFT JOIN 
      user_ u ON e.employer_id = u.user_id
  LEFT JOIN 
      company c ON e.employer_id = c.company_id
  LEFT JOIN 
      catalog_industry ind ON j.industry_id = ind.industry_id
  LEFT JOIN 
      catalog_job_function func ON j.job_function_id = func.job_function_id
  LEFT JOIN 
      catalog_city loc ON j.work_location = loc.city_id
  LEFT JOIN 
      catalog_level lvl ON j.level_id = lvl.level_id
  LEFT JOIN 
      catalog_education edu ON j.require_education = edu.education_id
  where j.employer_id = ?
  ORDER BY 
      j.date_post DESC ; 
    `,
    [userId]
  );
  return work;
};

const queryGetWorkBySearch = async (searchData) => {
  const {
    title,
    industry_id = null,
    job_function_id = null,
    work_location = null,
    salary_max = null,
    salary_min = null,
    level_id = null,
    require_marital_status = null,
    require_gender = null,
    require_age_min = null,
    require_age_max = null,
    require_education = null,
    require_experience = null,
    status_ = null, // tam thoi null, sau do sẽ thay đổi thành 1 (do null thì quá ít job đang còn hiệu lực)
    date_from = null,
    date_to = null,
    paging_size=10,
    page=1,
  } = searchData;
   let query =
    `
      SELECT 
      j.*,
      u.username AS employer_name,
      c.company_name,
      c.logo AS company_logo,
      ind.industry_name,
      func.job_function_name,
      loc.city_name AS work_location_name,
      lvl.level_name AS job_level_name,
      edu.education_title AS education_requirement,
      COUNT(*) OVER() AS total_count
  FROM 
      job j
  LEFT JOIN 
      user_employer e ON j.employer_id = e.employer_id
  LEFT JOIN 
      user_ u ON e.employer_id = u.user_id
  LEFT JOIN 
      company c ON e.employer_id = c.company_id
  LEFT JOIN 
      catalog_industry ind ON j.industry_id = ind.industry_id
  LEFT JOIN 
      catalog_job_function func ON j.job_function_id = func.job_function_id
  LEFT JOIN 
      catalog_city loc ON j.work_location = loc.city_id
  LEFT JOIN 
      catalog_level lvl ON j.level_id = lvl.level_id
  LEFT JOIN 
      catalog_education edu ON j.require_education = edu.education_id
      `;
  const conditions = [];
  const values = [];
  if (title) {
    const title2 = `%${title}%`;
    conditions.push("j.title LIKE ?");
    values.push(title2);
  }

  if (industry_id) {
    conditions.push("j.industry_id = ?");
    values.push(industry_id);
  }
  if (job_function_id) {
    conditions.push("j.job_function_id = ?");
    values.push(job_function_id);
  }
  if (work_location) {
    conditions.push("j.work_location = ?");
    values.push(citi_id);
  }
  const currentDate = new Date().toISOString().split("T")[0];
  if (status_) {
    conditions.push("j.date_expi >= ?");
    values.push(currentDate);
  }
  if (date_from) {
    conditions.push("j.date_post >= ?");
    values.push(date_from);
  }
  if (date_to) {
    conditions.push("j.date_post <= ?");
    values.push(date_to);
  }
  if (salary_max) {
    conditions.push("j.salary_max <= ?");
    values.push(salary_max);
  }
  if (salary_min) {
    conditions.push("j.salary_min >= ?");
    values.push(salary_min);
  }
  if (level_id) {
    conditions.push("j.level_id = ?");
    values.push(level_id);
  }
  if (require_experience) {
    conditions.push("j.require_experience >= ?");
    values.push(require_experience);
  }
  if (require_age_max) {
    conditions.push("j.require_age_max <= ?");
    values.push(require_age_max);
  }
  if (require_age_min) {
    conditions.push("j.require_age_min >= ?");
    values.push(require_age_min);
  }
  if (require_gender) {
    conditions.push("j.require_gender = ?");
    values.push(require_gender);
  }
  if (require_marital_status) {
    conditions.push("j.require_marital_status = ?");
    values.push(require_marital_status);
  }
  if (require_education) {
    conditions.push("j.require_education >= ?");
    values.push(require_education);
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query +=
   ` ORDER BY j.date_post DESC
  LIMIT ? OFFSET ?;`;
  values.push(Number(paging_size));
  values.push((Number(page)-1)*Number(paging_size));
  const [result] = await db.query(query, values);
  return result;
};

const queryDeleteWorkByUser = async (id, postId) => {
  const [result] = await db.query(
    `
      DELETE FROM job WHERE job_id = ? AND employer_id = ?;
    `,
    [postId, id]
  );

  return result.affectedRows > 0; // Trả về true nếu có hàng bị xóa
};

module.exports = {
  queryGetLatestWork,
  queryGetWorkDetail,
  queryGetAllWorks,
  queryGetCountTotalWorks,
  queryGetWorkByUser,
  queryGetWorkBySearch,

  queryDeleteWorkByUser,
};
