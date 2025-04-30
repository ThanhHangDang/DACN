const db = require("../config/databaseConfig.js");
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
    (SELECT GROUP_CONCAT(js.skill_id SEPARATOR ', ')
     FROM job_require_skill js
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
    catalog_industry ind ON j.industry = ind.industry_id
LEFT JOIN
    catalog_job_function func ON j.job_function = func.job_function_id
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
  console.log(work);
  return work;
};

const querydeletejobs = async (job_ids) => {
  // console.log(typeof jobId);
  const [resut] = await db.query(
    `
      DELETE FROM job WHERE job_id IN (?);
    `,
    [job_ids]
  );
  return resut;
};

const queryGetWorkBySearch = async (searchData,paging) => {
  const {
    title,
    industry = null,
    job_function = null,
    employer_id = null,
    citi_id = null,
    salary_max = null,
    salary_min = null,
    level_id = null,
    require_marital_status = null,
    require_education = null,
    require_experience = null,
    status_ = null,
    date_from = null,
    date_to = null
  } = searchData;
  const {paging_size=10,
    active_page=1, totalPages} = paging;

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
      catalog_industry ind ON j.industry = ind.industry_id
  LEFT JOIN 
      catalog_job_function func ON j.job_function = func.job_function_id
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
    conditions.push("title LIKE ?");
    values.push(title2);
  }

  if (industry) {
    conditions.push("industry = ?");
    values.push(industry);
  }
  if (job_function) {
    conditions.push("job_function = ?");
    values.push(job_function);
  }
  if (employer_id) {
    conditions.push("employer_id = ?");
    values.push(employer_id);
  }
  if (citi_id) {
    conditions.push("citi_id = ?");
    values.push(citi_id);
  }
  const currentDate = new Date().toISOString().split("T")[0];
  if (status_) {
    conditions.push("date_expi >= ?");
    values.push(currentDate);
  }
  if (date_from) {
    conditions.push("date_post >= ?");
    values.push(date_from);
  }
  if (date_to) {
    conditions.push("date_post <= ?");
    values.push(date_to);
  }
  if (salary_max) {
    conditions.push("salary_max <= ?");
    values.push(salary_max);
  }
  if (salary_min) {
    conditions.push("salary_min >= ?");
    values.push(salary_min);
  }
  if (level_id) {
    conditions.push("level_id = ?");
    values.push(level_id);
  }
  if (require_experience) {
    conditions.push("industry >= ?");
    values.push(require_experience);
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query +=
   ` ORDER BY j.date_post DESC
  LIMIT ? OFFSET ?;`;
  values.push(Number(paging_size));
  values.push((Number(active_page)-1)*Number(paging_size));
  const [result] = await db.query(query, values);
  return result;
};

const queryupdate_status = async (status_,job_ids) => {
  const [resut] = await db.query(
    `     UPDATE job
SET status_ = ? WHERE job_id IN (?);
; `,
    [status_,job_ids]
  );
  console.log(job_ids);
  return resut;
};

module.exports = {
  queryGetWorkDetail,
  queryGetWorkBySearch,
  querydeletejobs,
  queryupdate_status
};
