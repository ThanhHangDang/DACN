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
const queryGetListJobseekerBySearch = async (searchParams) => {
  const {
    job_function_id = null,
    district_id = null,
    level_id = null,
    year_exp = null,
    age_min = null,
    age_max = null,
    gender = null,
    status_ = null,
    language_id = null,
    education_id = null,
    paging_size = 10,
    active_page = 1,
  } = searchData;
  let query = `
    SELECT 
    e.jobseeker_id,
    p.*,
    c.*,
    e.status_ ,
    i.job_function_name,
    d.district_name,
    ct.city_name,
    n.nation_name,
    COUNT(*) OVER() AS total_count
FROM 
    user_ AS c
JOIN 
    user_jobseeker AS e ON c.user_id = e.jobseeker_id
LEFT JOIN
    profile_jobseeker AS p ON c.user_id = p.profile_id
LEFT JOIN 
    catalog_job_function AS i ON i.job_function_id= p.job_function_id
LEFT JOIN 
    catalog_district AS d ON p.district_id = d.district_id
LEFT JOIN 
    catalog_city AS ct ON d.city_id = ct.city_id
LEFT JOIN 
    catalog_nation AS n ON ct.nation_id = n.nation_id
    `;
  const conditions = [];
  const values = [];

  if (title) {
    let temp_query =
      " (e.jobseeker_id like ? or c.email like ? or c.username LIKE? or p.full_name LIKE ?)";
    conditions.push(temp_query);
    const temp_value = `%${title}%`;
    values.push(temp_value);
    values.push(temp_value);
    values.push(temp_value);
    values.push(temp_value);
  }
  if (job_function_id) {
    conditions.push(`i.job_function_id = ?`);
    values.push(job_function);
  }
  if (district_id) {
    conditions.push(`d.district_id =?`);
    values.push(district_id);
  }
  if (level_id) {
    conditions.push(`p.level_id =?`);
    values.push(level_id);
  }
  if (year_exp) {
    if (level_id > 5) {
      conditions.push(`p.year_exp >?`);
      values.push(5);
    } else {
      conditions.push(`p.year_exp =?`);
      values.push(level_id);
    }
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
    conditions.push(`p.gender =?`);
    values.push(Number(gender));
  }
  if (status_) {
    conditions.push(`e.status_ =?`);
    values.push(status_);
  }
  if (education_id) {
    query += `LEFT JOIN profile_education as pedu ON p.profile_id = pedu.profile_id`;
    conditions.push(`pedu.language =?`);
    values.push(education_id);
  }
  if (language_id) {
    query += `LEFT JOIN profile_language as plang ON p.profile_id = plang.profile_id`;
    conditions.push(`plang.language_id =?`);
    values.push(language_id);
  }
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query += ` ORDER BY c.user_id ASC
LIMIT ? OFFSET ?;`;
  values.push(Number(paging_size));
  values.push((Number(active_page) - 1) * Number(paging_size));
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
const queryGetCompanyInformation = async (company_id) => {};

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

const queryInviteJobseekerApply = async (employer_id, jobseeker_id, job_id) => {
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

const queryRejectJobApplication = async (employer_id, jobseeker_id, job_id) => {
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
