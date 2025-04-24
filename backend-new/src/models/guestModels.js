const db = require("../config/databaseConfig.js");

const queryGetPublicInformationOfCompany = async (id) => {
  // Lấy thông tin công khai của công ty đang được active (trả về null nếu không tìm thấy/ bị khóa bởi admin)
  try {
    const [result] = await db.query(
      `
     SELECT 
      c.company_id,
      c.company_name,
      c.logo,
      c.background,
      c.describle,
      c.count_follower,
      cs.scale_id,
      cs.scale_max,
      cs.scale_min,
      ci.industry_id,
      ci.industry_name,
      (SELECT COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'benefit_id', cob.benefit_id,
                'benefit_name', cab.benefit_name,
                'benefit_icon', cab.benefit_icon,
                'benefit_value', cob.benefit_value 
            )
        ),JSON_ARRAY()) 
        FROM
        (select * from company_benefit where company_benefit.company_id = c.company_id) as cob
        JOIN catalog_benefit cab ON cab.benefit_id = cob.benefit_id ) as company_benefits,
      ( SELECT COALESCE(
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  'city_id', cl.city_id,
                  'city_name', ct.city_name,
                  'address', cl.address))
          , JSON_ARRAY())
        FROM
          (select * FROM company_location where company_location.company_id = c.company_id) as cl
          JOIN catalog_city ct ON ct.city_id = cl.city_id) as company_location,
      (SELECT count(*) from logs_jobseeker_follow_employer ljfe where ljfe.employer_id = c.company_id) as count_follower,
      (SELECT count(*) from job j where j.employer_id = c.company_id and j.status_=1 and j.date_expi >= NOW()) as count_job_posted,
      (SELECT AVG(lr.score) FROM logs_review lr WHERE lr.company_id = c.company_id) AS average_score,
      (SELECT COALESCE(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'review_name', pfj.full_name,
            'review_content', lr.content,
            'score', lr.score,
            'date', lr.create_at
  )),JSON_ARRAY())
        FROM 
        (select * from logs_review lr2 WHERE lr2.company_id = c.company_id) lr
        JOIN profile_jobseeker pfj ON lr.jobseeker_id = pfj.profile_id      
        ) AS review_details,
      (SELECT COALESCE(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'score', score_counts.score,
            'count', score_counts.count)), JSON_ARRAY())
      FROM (  SELECT  score,  COUNT(*) AS count
        FROM 
          logs_review
        WHERE 
          company_id = c.company_id
        GROUP BY 
          score
        ORDER BY
          score DESC
        ) AS score_counts
      ) AS score_distribution
        FROM 
          (select * from company join user_employer e on company.company_id = e.employer_id
          WHERE e.status_ = 1 and company_id = ?) as c
        JOIN catalog_industry ci ON ci.industry_id = c.industry_id
        JOIN catalog_scale cs ON cs.scale_id = c.scale_id;        
    `,
      [id]
    );
    if (result.length === 0) {
      return null;
    }
    return result[0];
  } catch (error) {
    console.error("Error fetching company information:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const queryGetPublicJobDetail = async (workId) => {
  try {
    const [work] = await db.query(
      `
  SELECT 
    j.job_id,
	  j.title, 
    j.employer_id,   
    j.date_post,
    j.date_expi,
    j.address,
    j.quantity,
    j.describle,
    j.working_time,
    j.working_type,
    j.views,
    j.salary_max,
    j.salary_min,
    j.require_experience,
    j.require_gender,
    j.require_marital_status,
    j.require_age_max,
    j.require_age_min,
    j.more_requirements,
	  c.company_name,
    c.logo AS company_logo,
    c.background,
    ci.industry_id,
    ci.industry_name,
    func.job_function_id,
    func.job_function_name,
    loc.city_id,
    loc.city_name AS work_location_name,
    lvl.level_id,
    lvl.level_name AS job_level_name,
    j.require_education,
    edu.education_title,
    (SELECT COALESCE(
      JSON_ARRAYAGG(
              JSON_OBJECT(
                  'benefit_id', cob.benefit_id,
                  'benefit_name', cab.benefit_name,
                  'benefit_icon', cab.benefit_icon,
                  'benefit_value', cob.benefit_value 
              )
          ),JSON_ARRAY())  
      FROM
        (select * from company_benefit where company_id = j.employer_id) as cob
      JOIN catalog_benefit cab ON cab.benefit_id = cob.benefit_id ) AS company_benefits,
    (SELECT COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
				'skill_id', js.skill_id,
          'skill_name', cta.tags_content
            )
        ),JSON_ARRAY())  
      FROM 
      (select * from job_require_skill where job_require_skill.job_id = j.job_id) as js
      JOIN catalog_tags cta on cta.tag_id = js.skill_id) AS job_skills,
    (SELECT COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'language_id', ctl.language_id,
                'language_name', ctl.language_name,
                'metric_display', ctl.metric_display )
          ), JSON_ARRAY())
      FROM
        (select * from job_require_language where job_require_language.job_id = j.job_id) as jrl 
      JOIN
        catalog_language ctl ON ctl.language_id = jrl.language_id) AS languages,
     (SELECT COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'certification', jrc.certification)
            ), JSON_ARRAY())
            FROM job_require_certification jrc
            where jrc.job_id = j.job_id
            ) as certification         
  FROM
      (select * from job where status_ = 1 and job_id =?) as j
  JOIN
      company c ON j.employer_id = c.company_id
  JOIN
      catalog_industry ci ON j.industry_id = ci.industry_id
  JOIN
      catalog_job_function func ON j.job_function_id = func.job_function_id
  JOIN
      catalog_city loc ON j.work_location = loc.city_id    
  JOIN
      catalog_level lvl ON j.level_id = lvl.level_id
  JOIN
      catalog_education edu ON j.require_education = edu.education_id;
    `,
      [workId]
    );
    return work[0];
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const queryGetListJobBySearch = async (searchData) => {
  try {
    const {
      title,
      industry_id = null,
      job_function_id = null,
      work_location = null,
      salary = null,
      level_id = null,
      require_marital_status = null,
      require_gender = null,
      require_age_min = null,
      require_age_max = null,
      require_education = null,
      require_experience = null,
      date_from = null,
      paging_size = 10,
      page = 1,
      ...prop
    } = searchData;

    const status_ = 1; // Chỉ lấy các công việc đang hoạt động
    let query = `
      SELECT 
        j.job_id,
        j.title, 
        j.employer_id,   
        j.date_post,
        j.date_expi,
        j.quantity,
        j.salary_max,
        j.salary_min,
        c.company_name,
        c.logo AS company_logo,
        c.background,
        ind.industry_id,
        ind.industry_name,
        func.job_function_id,
        func.job_function_name,
        loc.city_id,
        loc.city_name AS work_location_name,
        lvl.level_id,
        lvl.level_name AS job_level_name,
        ( SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
            'skill_id', js.skill_id,
              'skill_name', cta.tags_content
                )
            ),JSON_ARRAY())  
          FROM 
              (select * from job_require_skill where job_require_skill.job_id = j.job_id) as js
          JOIN catalog_tags cta on cta.tag_id = js.skill_id) AS job_skills,
        COUNT(*) OVER() AS total_count
      FROM 
          (select * from job where status_ = 1) as j
      JOIN
          company c ON J.employer_id = c.company_id
      JOIN
          catalog_industry ind ON j.industry_id = ind.industry_id
      JOIN
          catalog_job_function func ON j.job_function_id = func.job_function_id
      JOIN
          catalog_city loc ON j.work_location = loc.city_id
      JOIN
          catalog_level lvl ON j.level_id = lvl.level_id
      JOIN
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
      values.push(work_location);
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
    if (salary) {
      conditions.push("j.salary_max >= ?");
      values.push(salary);
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
    query += ` ORDER BY j.date_post DESC
    LIMIT ? OFFSET ?;`;
    values.push(Number(paging_size));
    values.push((Number(page) - 1) * Number(paging_size));
    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    console.error("Error fetching jobs by search:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const queryGetListJobOfCompany = async (companyId) => {
  try {
    // console.log("companyId", companyId);
    const [result] = await db.query(
      `
      SELECT 
        j.job_id,
        j.title, 
        j.employer_id,   
        j.date_post,
        j.date_expi,
        j.quantity,
        j.salary_max,
        j.salary_min,
        c.company_name,
        c.logo AS company_logo,
        c.background,
        ind.industry_id,
        ind.industry_name,
        func.job_function_id,
        func.job_function_name,
        loc.city_id,
        loc.city_name AS work_location_name,
        lvl.level_id,
        lvl.level_name AS job_level_name,
        ( SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
            'skill_id', js.skill_id,
              'skill_name', cta.tags_content
                )
            ),JSON_ARRAY())  
          FROM 
              (select * from job_require_skill where job_require_skill.job_id = j.job_id) as js
          JOIN catalog_tags cta on cta.tag_id = js.skill_id) AS job_skills,
        COUNT(*) OVER() AS total_count
      FROM 
          (select * from job where status_ = 1 and employer_id = ?) as j
      JOIN
          company c ON J.employer_id = c.company_id
      JOIN
          catalog_industry ind ON j.industry_id = ind.industry_id
      JOIN
          catalog_job_function func ON j.job_function_id = func.job_function_id
      JOIN
          catalog_city loc ON j.work_location = loc.city_id
      JOIN
          catalog_level lvl ON j.level_id = lvl.level_id
      JOIN
          catalog_education edu ON j.require_education = edu.education_id;
        `,
      [companyId]
    );

    // console.log("result", result);
    if (result.length === 0) {
      return null;
    }
    return result;
  } catch (error) {
    console.error("Error fetching jobs of company:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const queryGetListLeadingCompany = async (paging_size) => {
  try {
    const [companies] = await db.query(
      `
              SELECT
                  c.company_id,
                  c.company_name,
                  c.logo,
                  c.background,
                  c.describle,
                  c.count_follower,
                  cs.scale_id,
                  cs.scale_max,
                  cs.scale_min,
                  ci.industry_id,
                  ci.industry_name,
                  (SELECT COALESCE(
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'city_id', cl.city_id,
                                'city_name', ct.city_name,
                                'address', cl.address))
                        , JSON_ARRAY())
                  from 
                        (select * FROM company_location where company_location.company_id = c.company_id) as cl
                        JOIN catalog_city ct ON ct.city_id = cl.city_id
                        ) AS company_location,
                  (SELECT count(*) from logs_jobseeker_follow_employer ljfe where ljfe.employer_id = c.company_id) as count_follower,
                  (SELECT count(*) from job j where j.employer_id = c.company_id and j.status_=1 and j.date_expi >= NOW()) as count_job_posted,
                  (SELECT AVG(lr.score) FROM logs_review lr WHERE lr.company_id = c.company_id) AS average_score,
                  COUNT(*) OVER() AS total_count
                  FROM
                    (select * from company
                      join user_employer e on company.company_id = e.employer_id
                      WHERE e.status_ = 1) as c
                  JOIN catalog_industry ci ON c.industry_id = ci.industry_id
                  JOIN catalog_scale cs on cs.scale_id = c.scale_id
                  ORDER BY count_job_posted DESC, count_follower DESC, average_score DESC
                  LIMIT ? OFFSET 0;`,
      [paging_size]
    );
    return companies;
  } catch (error) {
    console.error("Error fetching leading companies:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const queryGetListCompanyBySearch = async (searchData) => {
  try {
    const {
      title = "",
      industry = "",
      work_location = "",
      scale_id = "",
      paging_size = 10,
      active_page = 1,
    } = searchData;
    let query = `
SELECT
    c.company_id,
    c.company_name,
    c.logo,
    c.background,
    c.describle,
    c.count_follower,
    cs.scale_id,
    cs.scale_max,
    cs.scale_min,
    ci.industry_id,
    ci.industry_name,
    (SELECT COALESCE(
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  'city_id', cl.city_id,
                  'city_name', ct.city_name,
                  'address', cl.address))
          , JSON_ARRAY())
	  from 
          (select * FROM company_location where company_location.company_id = c.company_id) as cl
          JOIN catalog_city ct ON ct.city_id = cl.city_id
          ) AS company_location,
    (SELECT count(*) from logs_jobseeker_follow_employer ljfe where ljfe.employer_id = c.company_id) as count_follower,
    (SELECT count(*) from job j where j.employer_id = c.company_id and j.status_=1 and j.date_expi >= NOW()) as count_job_posted,
    (SELECT AVG(lr.score) FROM logs_review lr WHERE lr.company_id = c.company_id) AS average_score,
    COUNT(*) OVER() AS total_count
    FROM
      (select * from company
        join user_employer e on company.company_id = e.employer_id
        WHERE e.status_ = 1) as c
    JOIN catalog_industry ci ON c.industry_id = ci.industry_id
    JOIN catalog_scale cs on cs.scale_id = c.scale_id
`;

    const conditions = [];
    const values = [];
    if (work_location) {
      query += ` JOIN 
    (SELECT * FROM company_location cl WHERE cl.city_id = ?) AS cl1 ON c.company_id = cl1.company_id`;
      values.push(work_location);
    }

    if (title) {
      conditions.push("c.company_name LIKE ? ");
      values.push(`%${title}%`);
    }
    if (industry) {
      conditions.push(`i.industry_name = ? `);
      values.push(industry);
    }

    if (scale_id) {
      conditions.push(`c.scale = ? `);
      values.push(scale_id);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
    query += `ORDER BY count_job_posted DESC, count_follower DESC, average_score DESC
         LIMIT ? OFFSET ?;`;
    values.push(Number(paging_size));
    values.push((Number(active_page) - 1) * Number(paging_size));
    const [companies] = await db.query(query, values);
    return companies;
  } catch (error) {
    console.error("Error fetching companies by search:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

const queryGetGeneralInfo = async () => {
  try {
    const [leadingcompany] = await db.query(
      `
      SELECT
                  c.company_id,
                  c.company_name,
                  c.logo,
                  c.background,
                  c.describle,
                  c.count_follower,
                  cs.scale_id,
                  cs.scale_max,
                  cs.scale_min,
                  ci.industry_id,
                  ci.industry_name,
                  (SELECT COALESCE(
                        JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'city_id', cl.city_id,
                                'city_name', ct.city_name,
                                'address', cl.address))
                        , JSON_ARRAY())
                  from 
                        (select * FROM company_location where company_location.company_id = c.company_id) as cl
                        JOIN catalog_city ct ON ct.city_id = cl.city_id
                        ) AS company_location,
                  (SELECT count(*) from logs_jobseeker_follow_employer ljfe where ljfe.employer_id = c.company_id) as count_follower,
                  (SELECT count(*) from job j where j.employer_id = c.company_id and j.status_=1 and j.date_expi >= NOW()) as count_job_posted,
                  (SELECT AVG(lr.score) FROM logs_review lr WHERE lr.company_id = c.company_id) AS average_score,
                  COUNT(*) OVER() AS total_count
                  FROM
                    (select * from company
                      join user_employer e on company.company_id = e.employer_id
                      WHERE e.status_ = 1) as c
                  JOIN catalog_industry ci ON c.industry_id = ci.industry_id
                  JOIN catalog_scale cs on cs.scale_id = c.scale_id
                  ORDER BY count_job_posted DESC, count_follower DESC, average_score DESC
                  LIMIT 5 OFFSET 0;
      `
    );
    const [job_count] = await db.query(
      `
      SELECT count(*) as total_job from job j where j.status_ = 1 and j.date_expi >= NOW() ;
      `
    );
    const [company_count] = await db.query(
      `
      SELECT count(*) as total_company from user_employer c where c.status_ = 1 ;
      `
    );
    const [jobseeker_count] = await db.query(
      `
      SELECT count(*)  as total_jobseeker from user_jobseeker p where p.status_ = 1;
      `
    );
    const result = {
      leadingcompany: leadingcompany,
      job_count: job_count[0].total_job,
      company_count: company_count[0].total_company,
      jobseeker_count: jobseeker_count[0].total_jobseeker,
    };
    return result;
  } catch (error) {
    console.error("Error fetching general info:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

module.exports = {
  queryGetPublicInformationOfCompany,
  queryGetPublicJobDetail,
  queryGetListJobBySearch,
  queryGetListJobOfCompany,
  queryGetListLeadingCompany,
  queryGetListCompanyBySearch,
  queryGetGeneralInfo
};
