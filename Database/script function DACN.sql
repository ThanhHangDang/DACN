## Update cấu trúc bảng Database 08/02/2025
alter table profile_jobseeker  modify column marital_status enum('Độc thân', 'Đã kết hôn') null default null;
alter table profile_jobseeker  modify column  salary_expect  int unsigned null default null;
alter table profile_jobseeker  modify column year_exp tinyint unsigned null default null;
alter table profile_jobseeker  modify column gender enum('male', 'female', 'other') null default null;
alter table cv_of_jobseeker  add column date_upload date not null;

alter table jobseeker  modify column  avatar varchar(256);

CREATE TABLE system_profile_completion_config (
    column_name VARCHAR(256) PRIMARY KEY,
    weight DECIMAL(2, 0) NOT NULL DEFAULT 0
);
INSERT INTO system_profile_completion_config (column_name, weight) VALUES 
('full_name ',5), ('title ',5), ('level_id ',5), ('job_function_id ',5), ('career_target ',5), ('work_place ',5), ('salary_expect ',5), ('year_exp ',5), ('personal',5), ('address',5), ('Certification',10), ('Education',10), ('Skill',10), ('Experience',10), ('Project',10)
;

CREATE TABLE system_default (
    column_name VARCHAR(256) PRIMARY KEY,
    value varchar(256)
);
CREATE TABLE logs_jobseeker_view_job(
    jobseeker_id int unsigned,
    job_id bigint unsigned not null,
    date_view date not null,
    primary key (jobseeker_id,job_id,date_view)
);

CREATE TABLE logs_employer_view_jobseeker(
	employer_id int unsigned ,
    jobseeker_id int unsigned not null,
    date_view date not null,
     primary key (employer_id,jobseeker_id,date_view)
);

INSERT INTO system_default (column_name,value) values ('img_default_company', 'https://boostcareer.s3.us-east-1.amazonaws.com/images/img_df_company.png');
INSERT INTO system_default (column_name,value) values ('img_default_jobseeker', 'https://boostcareer.s3.us-east-1.amazonaws.com/images/img_df_jobseeker.png');
INSERT INTO `boostcareer`.`jobseeker_save_job` (`jobseeker_id`, `job_id`) VALUES ('30000004', '10000003');
INSERT INTO `boostcareer`.`jobseeker_apply_job` (`jobseeker_id`, `job_id`, `date_appy`) VALUES ('30000004', '10000005', '2024-12-30');

###################################################################
###################################################################        PROCEDURE
###################################################################



DELIMITER //
CREATE PROCEDURE create_user_jobseeker (
IN username varchar(64) ,
IN full_name varchar(256),
IN phone_number varchar(10),
IN email varchar(128),
IN password_ varchar(128),
OUT new_user_id INT UNSIGNED
)
BEGIN
	DECLARE img_default VARCHAR(256);
	DECLARE EXIT HANDLER for sqlexception
	BEGIN
		ROLLBACK; -- Hoàn tác tất cả các thay đổi nếu có lỗi
		SET new_user_id  =0; -- Trả về 0 báo hiệu lỗi
	END;
	START TRANSACTION;
	insert INTO user_(username,email,password_ ,phone_number,create_date, role_id) Values (username,email,password_,phone_number,CURDATE(),3);
	SET new_user_id = LAST_INSERT_ID();
   SELECT value INTO img_default from system_default where column_name='img_default_jobseeker';
	insert INTO jobseeker(jobseeker_id,avatar,status_) values(new_user_id,img_default,1);
	insert INTO profile_jobseeker(profile_id,full_name,percent_complete, last_modify_date) values (new_user_id, full_name, 5,CURDATE());
	COMMIT;
END //
DELIMITER ;

#############################################################################################################################################################################

DELIMITER //
CREATE PROCEDURE create_user_employer (
IN username varchar(64) ,
IN full_name varchar(256),
IN phone_number varchar(10),
IN email varchar(128),
IN password_ varchar(128),
OUT new_user_id INT UNSIGNED
)
BEGIN
	DECLARE img_default VARCHAR(256);
	DECLARE EXIT HANDLER for sqlexception
	BEGIN
		ROLLBACK; -- Hoàn tác tất cả các thay đổi nếu có lỗi
		SET new_user_id  =0; -- Trả về 0 báo hiệu lỗi
	END;
	START TRANSACTION;
	insert INTO user_(username,email,password_ ,phone_number,create_date, role_id) Values (username,email,password_,phone_number,CURDATE(),2);
	SET new_user_id = LAST_INSERT_ID();
    SELECT value INTO img_default from system_default where column_name='img_default_company';
	insert INTO employer(employer_id,status_) values(new_user_id,1);
	insert INTO company(company_id,company_name,logo) values (new_user_id, full_name,img_default);
	COMMIT;

END //
DELIMITER ;

#############################################################################################################################################################################

