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
  return work[0];
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

const queryDeleteWorkByUser = async (id, postId) => {
  const [result] = await db.query(
    `
      DELETE FROM job WHERE job_id = ? AND employer_id = ?;
    `,
    [postId, id]
  );

  return result.affectedRows > 0; // Trả về true nếu có hàng bị xóa
};

const queryPostJob = async (data) => {};

///////////////////////////////////////////////////////////////////////////
// Jobseeker Queries
const queryGetListJobseekerBySearch = async (searchData) => {
  const {
    job_function_id = null,
    level_id = null,
    year_exp = null,
    age_min = null,
    age_max = null,
    gender = null,
    language_id = null,
    education_id = null,
    paging_size = 10,
    active_page = 1,
    skill_id = null,
    sort_by = "latest",
    ...props
  } = searchData;
  const status_ = 1;
  let query = `
    SELECT 
    p.profile_id,
    p.full_name,
    p.title,
    p.year_exp,
    p.career_target,
    u.email,
    u.phone_number,
    e.status_ ,
    e.avatar,
    e.is_open_for_job,
    i.job_function_name,
    cl.level_name, 
    COALESCE((Select avg(lrj.score) from logs_employer_rate_jobseeker lrj where lrj.jobseeker_id = p.profile_id),0) as score,
    COUNT(*) OVER() AS total_count
FROM 
    user_ AS u
JOIN 
    user_jobseeker AS e ON u.user_id = e.jobseeker_id
JOIN
    profile_jobseeker AS p ON u.user_id = p.profile_id
JOIN 
    catalog_job_function AS i ON i.job_function_id= p.job_function_id
JOIN
    catalog_level AS cl ON cl.level_id = p.level_id
    `;

  const conditions = [];
  const values = [];
  if (education_id) {
    query += `JOIN 
    (select * from profile_education where profile_education.education_id >=?) as pedu ON p.profile_id = pedu.profile_id`;
    values.push(education_id);
  }
  if (job_function_id) {
    conditions.push(`i.job_function_id = ?`);
    values.push(job_function_id);
  }

  if (level_id) {
    conditions.push(`p.level_id =?`);
    values.push(level_id);
  }
  if (age_min) {
    conditions.push(`YEAR(CURDATE()) - YEAR(p.birthday) >=?`);
    values.push(age_min);
  }
  if (age_max) {
    conditions.push(`YEAR(CURDATE()) - YEAR(p.birthday) <=?`);
    values.push(age_max);
  }

  if (gender) {
    conditions.push(`p.gender = ? `);
    values.push(gender);
  }
  if (status_) {
    conditions.push(`e.status_ = ? `);
    values.push(status_);
  }
  if (language_id) {
    query += `JOIN profile_language as plang ON p.profile_id = plang.profile_id`;
    conditions.push(`plang.language_id =?`);
    values.push(language_id);
  }


  if (year_exp) {
    switch (year_exp) {
      case '0': {
        conditions.push(`p.year_exp <= ?`);
        values.push(1);
        break;
      }
      case '1': {
        conditions.push(`p.year_exp >=?`);
        conditions.push(`p.year_exp <=?`);
        values.push(1);
        values.push(3);
        break;
      }
      case '2': {
        conditions.push(`p.year_exp >=?`);
        conditions.push(`p.year_exp <=?`);
        values.push(3);
        values.push(5);
        break;
      }
      case '3': {
        conditions.push(`p.year_exp >=?`);
        values.push(5);
        break;
      }
      case '4': {
        conditions.push(`p.year_exp >=?`);
        values.push(10);
        break;
      }
    }
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  if (sort_by) {
    if (sort_by === "latest") {
      query += ` ORDER BY p.create_at DESC `;
    } else if (sort_by === "complete") {
      query += ` ORDER BY p.percent_complete ASC`;
    } else if (sort_by === "rating") {
      query += ` ORDER BY score DESC`;
    }
  }
  query += ` LIMIT ? OFFSET ?;`;
  values.push(Number(paging_size));
  values.push((Number(active_page) - 1) * Number(paging_size));
  // console.log("query", query);
  // console.log("values", values);
  const [result] = await db.query(query, values);
  return result;
};

const queryGetJobseekerDetail = async (id) => {
  const [jobseeker_detail] = await db.query(
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
                'skill', ctag.tags_content
            )
        ) AS skill_info
    from user_jobseeker js
    join profile_jobseeker pjs on js.jobseeker_id = pjs.profile_id
    join user_ u on js.jobseeker_id = u.user_id
    join catalog_level cl on pjs.level_id = cl.level_id
    join catalog_city cc on pjs.city_id = cc.city_id
    left join profile_education pe on js.jobseeker_id = pe.profile_id
    left join profile_certification pcer on js.jobseeker_id = pcer.profile_id
    left join profile_experience pexp on js.jobseeker_id = pexp.profile_id
    left join profile_skill pski on js.jobseeker_id = pski.profile_id
    left join catalog_tags ctag on pski.skill_id=ctag.tag_id
    left join profile_project ppro on js.jobseeker_id = ppro.profile_id
    where js.jobseeker_id = ?;
    `,
    [id]
  );
  return jobseeker_detail;
};

// Job Queries
const queryGetListJobByUser = async (employer_id) => {
  try {
    const [listJob] = await db.query(
      ` SELECT 
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
    j.status_,
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
      (select * from job where employer_id =?) as j
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
      [employer_id]
    );
    return listJob;
  } catch (error) {
    console.error("Error getting list job by user:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryGetJobDetailByUser = async (job_id, employer_id) => {
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
    j.require_education
    edu.education_title,
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
        catalog_language ctl ON ctl.language_id = jrl.language_id) AS languages ,
    (SELECT COALESCE(
  FROM
      (select * from job where job_id = ? and employer_id = ?) as j
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
    [job_id, employer_id]
  );
  return work[0];
};

const queryAddJobByUser = async (data) => {
  const {
    employer_id,
    title,
    date_post,
    industry_id,
    job_function_id = null,
    work_location = null,
    address = null,
    working_type = null,
    working_time = null,
    quantity = 0,
    describle = null,
    salary_max = null,
    salary_min = null,
    level_id = null,
    require_marital_status = null,
    require_gender = null,
    require_age_min = null,
    require_age_max = null,
    require_education = 0,
    require_experience = 0,
    certification = null,
    language = null,
    skill = null,
    more_requirements = null,
  } = data;

  if (!employer_id || !title || !industry_id) {
    throw new Error("Missing required job information");
  }

  // Xử lý ngày tháng
  const views = 0;
  const date_post_formatted = new Date(date_post || Date.now());
  const date_expi = new Date(date_post_formatted);
  date_expi.setDate(date_expi.getDate() + 30); // 30 ngày sau ngày đăng
  const status_ = 1;

  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    // Thêm thông tin job chính
    const [result] = await connection.query(
      `INSERT INTO job 
         (employer_id, title, date_post, date_expi, status_, 
          industry_id, job_function_id, work_location, address, working_type, 
          working_time, quantity, describle, views, salary_max, 
          salary_min, level_id, require_marital_status, require_gender, 
          require_age_min, require_age_max, require_education, require_experience, more_requirements) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employer_id,
        title,
        date_post_formatted,
        date_expi,
        status_,
        industry_id,
        job_function_id,
        work_location,
        address,
        working_type,
        working_time,
        quantity,
        describle,
        views,
        salary_max,
        salary_min,
        level_id,
        require_marital_status,
        require_gender,
        require_age_min,
        require_age_max,
        require_education,
        require_experience,
        more_requirements,
      ]
    );

    const job_id = result.insertId;

    // Xử lý chứng chỉ yêu cầu
    if (Array.isArray(certification) && certification.length > 0) {
      const certValues = certification.map((cert) => [job_id, cert]);
      await connection.query(
        `INSERT INTO job_require_certification (job_id, certification) VALUES ?`,
        [certValues]
      );
    }

    // Xử lý ngôn ngữ yêu cầu
    if (Array.isArray(language) && language.length > 0) {
      const langValues = language.map((lang) => [job_id, lang]);
      await connection.query(
        `INSERT INTO job_require_language (job_id, language_id) VALUES ?`,
        [langValues]
      );
    }

    // Xử lý kỹ năng yêu cầu
    if (Array.isArray(skill) && skill.length > 0) {
      const skillValues = skill.map((s) => [job_id, s]);
      await connection.query(
        `INSERT INTO job_require_skill (job_id, skill_id) VALUES ?`,
        [skillValues]
      );
    }

    await connection.commit();
    return job_id;
  } catch (error) {
    await connection.rollback();
    console.error("Error adding job:", error);
    throw error;
  } finally {
    connection.release();
  }
};

const queryUpdateJobByUser = async (data) => {
  try {
    const { job_id, employer_id } = data;

    if (!job_id || !employer_id) {
      throw new Error("Missing job_id or employer_id");
    }

    // Tạo mảng các cặp column=value cho câu lệnh SET
    const updateFields = [];
    const params = [];

    // Các trường có thể cập nhật
    const possibleFields = [
      "title",
      "date_post",
      "date_expi",
      "status_",
      "industry_id",
      "job_function_id",
      "work_location",
      "address",
      "working_type",
      "working_time",
      "quantity",
      "describle",
      "views",
      "salary_max",
      "salary_min",
      "level_id",
      "require_marital_status",
      "require_gender",
      "require_age_min",
      "require_age_max",
      "require_education",
      "require_experience",
      "more_requirements",
    ];

    // Thêm các trường có giá trị vào câu lệnh UPDATE
    possibleFields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== null) {
        updateFields.push(`${field} = ?`);
        params.push(data[field]);
      }
    });

    // Nếu không có trường nào được cập nhật
    if (updateFields.length === 0) {
      return false;
    }

    // Thêm các tham số cho điều kiện WHERE
    params.push(job_id);
    params.push(employer_id);

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Cập nhật thông tin công việc
      const [result] = await connection.query(
        `UPDATE job SET ${updateFields.join(
          ", "
        )} WHERE job_id = ? AND employer_id = ?`,
        params
      );

      // Xử lý cập nhật các bảng phụ nếu cần
      const { certification, language, skill } = data;

      // Cập nhật certification nếu có
      if (certification !== undefined) {
        // Xóa các certification cũ
        await connection.query(
          `DELETE FROM job_require_certification WHERE job_id = ?`,
          [job_id]
        );

        // Thêm certification mới sử dụng bulk insert
        if (Array.isArray(certification) && certification.length > 0) {
          const certValues = certification.map((cert) => [job_id, cert]);
          await connection.query(
            `INSERT INTO job_require_certification (job_id, certification) VALUES ?`,
            [certValues]
          );
        }
      }

      // Cập nhật language nếu có
      if (language !== undefined) {
        // Xóa các language cũ
        await connection.query(
          `DELETE FROM job_require_language WHERE job_id = ?`,
          [job_id]
        );

        // Thêm language mới sử dụng bulk insert
        if (Array.isArray(language) && language.length > 0) {
          const langValues = language.map((lang) => [job_id, lang]);
          await connection.query(
            `INSERT INTO job_require_language (job_id, language_id) VALUES ?`,
            [langValues]
          );
        }
      }

      // Cập nhật skill nếu có
      if (skill !== undefined) {
        // Xóa các skill cũ
        await connection.query(
          `DELETE FROM job_require_skill WHERE job_id = ?`,
          [job_id]
        );

        // Thêm skill mới sử dụng bulk insert
        if (Array.isArray(skill) && skill.length > 0) {
          const skillValues = skill.map((s) => [job_id, s]);
          await connection.query(
            `INSERT INTO job_require_skill (job_id, skill_id) VALUES ?`,
            [skillValues]
          );
        }
      }

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

const queryDeleteJobByUser = async (jobId, userId) => {
  try {
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

// Company Queries
const queryGetCompanyInformation = async (company_id) => {
  try {
    const [companyInfo] = await db.query(
      `SELECT 
      c.company_id,
      c.company_name,
      c.logo,
      c.background,
      u.status_,
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
                  'location_id', cl.location_id,
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
          (select * from company WHERE company_id = ?) as c
        join 
        (select * from user_employer where employer_id = ?) as u
        JOIN catalog_industry ci ON ci.industry_id = c.industry_id
        JOIN catalog_scale cs ON cs.scale_id = c.scale_id;  `,
      [company_id, company_id]
    );
    return companyInfo[0];
  } catch (error) {
    console.error("Error getting company information:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryAddItemCompanyProfile = async (company_id, data) => {};

const queryUpdateItemCompanyProfile = async (type, data) => {};

const queryDeleteItemCompanyProfile = async (company_id) => {};

const queryUpdateLogoImage = async (company_id, imageData) => {};

const queryUpdateBackgroundImage = async (company_id, imageData) => {};

// Candidate Queries
const queryGetListCandidate = async (employer_id) => {
  try {
    const [listCandidate] = await db.query(
      `select 
        (select avatar from user_jobseeker us where us.jobseeker_id = pj.profile_id) as avatar,
        pj.profile_id,
        pj.full_name,
        pj.year_exp,
        pj.title,
        pj.birthday,
        COALESCE((select  lr.score
        from logs_employer_rate_jobseeker lr 
        where lr.employer_id = log.employer_id and lr.jobseeker_id = pj.profile_id), '0') as rating    
       from  
       (SELECT * from logs_employer_save_jobseeker where employer_id = ?) log
      JOIN profile_jobseeker pj on log.jobseeker_id = pj.profile_id;`,
      [employer_id]
    );
    return listCandidate;
  } catch (error) {
    console.error("Error getting list candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const querySaveCandidate = async (employer_id, jobseeker_id) => {
  try {
    const create_at = new Date();
    const [result] = await db.query(
      `INSERT INTO logs_employer_save_jobseeker (employer_id, jobseeker_id,create_at) VALUES (?, ?,?);`,
      [employer_id, jobseeker_id, create_at]
    );
    return result.insertId > 0;
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryRateCandidate = async (employer_id, jobseeker_id, rating) => {
  try {
    const create_at = new Date();
    const [result] = await db.query(
      `INSERT INTO logs_employer_rate_jobseeker (employer_id, jobseeker_id, score,create_at) VALUES (?, ?,?,?);`,
      [employer_id, jobseeker_id, rating, create_at]
    );
    return result.insertId > 0;
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryDeleteCandidate = async (employer_id, jobseeker_id) => {
  try {
    const [result] = await db.query(
      `
        DELETE FROM logs_employer_save_jobseeker WHERE employer_id = ? AND jobseeker_id = ?;
      `,
      [employer_id, jobseeker_id]
    );
    return result.affectedRows > 0; // Trả về true nếu có hàng bị xóa
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryInviteJobseekerApply = async (employer_id, job_id, jobseeker_id) => {
  try {
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryGetInvitedJobseeker = async (employer_id) => {
  try {
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};
// Application Queries
const queryGetListJobApplication = async (employer_id) => {
  try {
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};
const queryGetListJobApplicationByJob = async (employer_id, job_id) => {
  try {
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryRejectJobApplication = async (employer_id, job_id, jobseeker_id) => {
  try {
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

const queryAddNotification = async (employer_id, jobseeker_id, job_id) => {
  try {
  } catch (error) {
    console.error("Error saving candidate:", error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

module.exports = {
  queryGetListJobseekerBySearch,
  queryGetJobseekerDetail,
  queryGetListJobByUser,
  queryGetJobDetailByUser,
  queryAddJobByUser,
  queryUpdateJobByUser,
  queryDeleteJobByUser,
  queryGetCompanyInformation,
  queryAddItemCompanyProfile,
  queryUpdateItemCompanyProfile,
  queryDeleteItemCompanyProfile,
  queryUpdateLogoImage,
  queryUpdateBackgroundImage,
  queryGetListCandidate,
  querySaveCandidate,
  queryRateCandidate,
  queryDeleteCandidate,
  queryGetListJobApplication,
  queryRejectJobApplication,
  queryAddNotification,

  queryInviteJobseekerApply,
  queryGetInvitedJobseeker,
  queryGetListJobApplicationByJob,
};
