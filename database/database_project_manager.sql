CREATE DATABASE project_manage;
USE project_manage;

CREATE TABLE user(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL
);


CREATE TABLE team_members(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    linkedin_link VARCHAR(768) UNIQUE NOT NULL,
    image_path VARCHAR(255),
    user_id INT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE 
);


CREATE TABLE projects(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image_path VARCHAR(255),
    starting_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Ongoing', 'Completed') DEFAULT 'Ongoing',
    priority ENUM('High', 'Mid', 'Low') DEFAULT 'Mid',
    user_id INT,
    CONSTRAINT projects_fk_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);


CREATE TABLE tasks(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    project_id INT,
    CONSTRAINT  tasks_fk_user FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);


CREATE TABLE Subtasks(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    task_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Ongoing', 'Completed'),
    CONSTRAINT subtasks_fk_user FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

RENAME TABLE Subtasks TO subtasks;
CREATE TABLE subtasks_assignees (
	id INT AUTO_INCREMENT PRIMARY KEY,
    subtask_id INT,
    team_member_id INT,
    CONSTRAINT assignees_sub_fk_user FOREIGN KEY (subtask_id) REFERENCES subtasks(id) ON DELETE CASCADE,
    CONSTRAINT assignees_team_fk_user FOREIGN KEY (team_member_id) REFERENCES team_members(id) ON DELETE CASCADE
);


-- Making some changes in the database

-- This command modifies the existing password column to safely accommodate a 60-character bcrypt hash.
ALTER TABLE user
MODIFY COLUMN password VARCHAR(255) NOT NULL;

-- This command adds the composite unique constraint so a single user cannot reuse a project name.
ALTER TABLE projects
ADD CONSTRAINT unique_project_per_user UNIQUE (user_id, name);

-- This command adds the composite unique constraint to block assigning the exact same person to the exact same subtask twice.
ALTER TABLE subtasks_assignees 
ADD CONSTRAINT unique_assignment UNIQUE (subtask_id, team_member_id);




-- Inserting with the help of ai.
-- 1. Insert Users
-- Note: The password used here is a standard 60-character bcrypt dummy hash for "password123"
INSERT INTO user (username, email, password, name) 
VALUES 
('admin_alice', 'alice@example.com', '$2b$10$Ep5Ew5X5X.wG/K7H8E.Z.eYwQ4o9X.wG/K7H8E.Z.eYwQ4o9X.wG', 'Alice Admin'),
('manager_bob', 'bob@example.com', '$2b$10$Ep5Ew5X5X.wG/K7H8E.Z.eYwQ4o9X.wG/K7H8E.Z.eYwQ4o9X.wG', 'Bob Manager');

-- 2. Insert Team Members
-- Alice (User 1) has two team members. Bob (User 2) has one.
INSERT INTO team_members (name, role, linkedin_link, image_path, user_id) 
VALUES 
('Sarah Connor', 'Frontend Developer', 'https://linkedin.com/in/sarahc', '/images/sarah.jpg', 1),
('John Smith', 'Backend Developer', 'https://linkedin.com/in/johns', '/images/john.jpg', 1),
('Emily Davis', 'UI/UX Designer', 'https://linkedin.com/in/emilyd', '/images/emily.jpg', 2);

-- 3. Insert Projects
-- Notice how Alice (User 1) and Bob (User 2) both have a project named "Website Redesign".
-- This perfectly tests your new scoped uniqueness constraint!
INSERT INTO projects (name, image_path, starting_date, end_date, status, priority, user_id) 
VALUES 
('Website Redesign', '/images/proj1.jpg', '2026-06-01', '2026-08-15', 'Ongoing', 'High', 1),
('Mobile App Launch', NULL, '2026-07-01', '2026-12-01', 'Ongoing', 'Mid', 1),
('Website Redesign', '/images/proj3.jpg', '2026-01-10', '2026-03-20', 'Completed', 'Low', 2);

-- 4. Insert Tasks (The visual buckets)
-- Assigning buckets to Alice's "Website Redesign" (Project 1) and Bob's (Project 3)
INSERT INTO tasks (name, project_id) 
VALUES 
('Design Phase', 1),
('Development Phase', 1),
('QA & Testing', 1),
('Final Delivery', 3);

-- 5. Insert Subtasks
-- Assigning actual subtasks to the buckets created above
INSERT INTO subtasks (name, task_id, start_date, end_date, status) 
VALUES 
('Create Wireframes', 1, '2026-06-05', '2026-06-12', 'Completed'),
('High-Fidelity Mockups', 1, '2026-06-15', '2026-06-25', 'Ongoing'),
('Setup Database Schema', 2, '2026-06-20', '2026-06-30', 'Ongoing'),
('Client Handover', 4, '2026-03-15', '2026-03-20', 'Completed');

-- 6. Insert Subtask Assignees (The Junction Table)
-- Linking specific team members to specific subtasks
INSERT INTO subtasks_assignees (subtask_id, team_member_id) 
VALUES 
(1, 1), -- Assigns Sarah (1) to Wireframes (1)
(2, 1), -- Assigns Sarah (1) to Mockups (2)
(3, 2), -- Assigns John (2) to Database Setup (3)
(3, 1); -- Also assigns Sarah (1) to Database Setup (3), demonstrating multiple assignees!

SELECT * FROM subtasks_assignees;










