const db = require("../config/databaseConfig.js");

const queryGetLeadingCompany = async () => {
  const [company] = await db.query(
    `
    SELECT 
      c.company_id,
      c.company_name,
      c.logo,
      c.scale_id,
      c.industry_id,
      c.phone_number,
      c.describle,
      e.status_ AS employer_status,
      s.scale_min,
      s.scale_max,
      i.industry_name,
      ct.city_name,
      n.nation_name
    FROM 
      company AS c
    JOIN 
      user_employer AS e ON c.company_id = e.employer_id
    LEFT JOIN 
      catalog_scale AS s ON c.scale_id = s.scale_id
    LEFT JOIN 
      catalog_industry AS i ON c.industry_id = i.industry_id
    LEFT JOIN 
      company_location AS cl ON c.company_id = cl.company_id
    LEFT JOIN 
      catalog_city AS ct ON cl.city_id = ct.city_id
    LEFT JOIN 
      catalog_nation AS n ON ct.nation_id = n.nation_id
    LIMIT 5;
    `
  );

  return company;
};

const queryGetAllCompany = async (limit, offset) => {
  const [company] = await db.query(
    `
    SELECT 
      c.company_id,
      c.company_name,
      c.logo,
      c.scale_id,
      c.industry_id,
      c.phone_number,
      c.describle,
      c.count_follower,
      e.status_ AS employer_status,
      s.scale_min,
      s.scale_max,
      i.industry_name,
      ct.city_name,
      n.nation_name,
      COUNT(j.job_id) AS total_jobs
    FROM
      company AS c
    JOIN
      user_employer AS e ON c.company_id = e.employer_id
    LEFT JOIN
      catalog_scale AS s ON c.scale_id = s.scale_id
    LEFT JOIN
      catalog_industry AS i ON c.industry_id = i.industry_id
    LEFT JOIN
      company_location AS cl ON c.company_id = cl.company_id
    LEFT JOIN
      catalog_city AS ct ON cl.city_id = ct.city_id
    LEFT JOIN
      catalog_nation AS n ON ct.nation_id = n.nation_id
    LEFT JOIN
      job AS j ON c.company_id = j.employer_id
    WHERE
      e.status_ = 1
    GROUP BY
      c.company_id,
      c.company_name,
      c.logo,
      c.scale_id,
      c.industry_id,
      c.phone_number,
      c.describle,
      c.count_follower,
      e.status_,
      s.scale_min,
      s.scale_max,
      i.industry_name,
      ct.city_name,
      n.nation_name
    ORDER BY
      c.company_id DESC
    LIMIT ? OFFSET ?;
  `,
    [limit, offset]
  );

  return company;
};

const queryGetCountTotalCompany = async () => {
  const [total] = await db.query(
    `
    SELECT COUNT(*) AS total FROM company;
  `
  );
  return total;
};

const queryPostJob = async (data) => {
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
    require_marital_status = "không yêu cầu",
    require_gender = "không yêu cầu",
    require_age_min = null,
    require_age_max = null,
    require_education = 0,
    require_experience = 0,
    require_language = null,
    require_certification = null,
    require_skill = null,
    more_requirement = null,
  } = data;

  const views = 0;
  const date_post1 = new Date(date_post);
  const date_expi = new Date(date_post);
  date_expi.setDate(date_expi.getDate() + 30); // 30 ngày sau ngày đăng
  const status_ = 1;

  const connection = await db.getConnection();
  await connection.beginTransaction();
  try {
    const [result] = await db.execute(
      `
            INSERT INTO job 
                (employer_id, title, date_post, date_expi, status_, 
                industry_id, job_function_id, work_location, address, working_type, working_time, quantity, 
                describle, views, salary_max, salary_min, level_id, require_marital_status, require_gender, 
                require_age_min, require_age_max, require_education, require_experience, more_requirement) 
            VALUES
                            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?,?) `,
      [
        employer_id,
        title,
        date_post1,
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
<<<<<<< HEAD
        more_requirement ,
=======
        more_requirement,
>>>>>>> origin/main
      ]
    );
    const job_id = result.insertId;
    if (require_certification != null) {
      for (const value of require_certification) {
        const [result1] = await db.query(
          `
                    INSERT INTO job_require_certification (job_id, certification) VALUES (?, ?);`,
          [job_id, value]
        );
      }
    }
    if (require_language != null) {
      for (const value of require_language) {
        const [result2] = await db.execute(
          `
                            INSERT INTO job_require_language (job_id, language_id) VALUES (?, ?);`,
          [job_id, value]
        );
      }
    }
    if (require_skill != null) {
      for (const value of require_skill) {
        console.log("value", value);
        const [result2] = await db.execute(
          `
                            INSERT INTO job_require_skill (job_id, skill_id) VALUES (?, ?);`,
          [job_id, value]
        );
      }
    }
    await connection.commit();

    return job_id;
  } catch (error) {
    // Nếu có lỗi, rollback giao dịch
    await connection.rollback();
    throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm
  } finally {
    // Đảm bảo rằng connection sẽ được giải phóng dù thành công hay lỗi
    connection.release();
  }
};

const queryEditJob = async (data) => {};

const queryGetCompanySaveJobseeker = async (id) => {
  const [company] = await db.query("", [id]);
};

module.exports = {
  queryGetAllCompany,
  queryGetCountTotalCompany,

  queryGetLeadingCompany,
  queryPostJob,
  queryGetCompanySaveJobseeker,
};
