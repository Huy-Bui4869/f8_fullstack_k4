-- Thêm 3 giảng viên vào bảng teacher.
INSERT INTO teacher(name, bio)
VALUES('teacher 1', 'bio 01'),('teacher 2', 'bio 02'),('teacher 3', 'bio 03');

-- Mỗi giảng viên thêm 3 khóa học.
INSERT INTO courses(name, price, description, content, teacher_id, active)
VALUES('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 1, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 1, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 1, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 2, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 2, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 2, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 3, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 3, 33),
('fullstack', 12000, 'mô tả khóa học', 'nội dung khóa học', 3, 33);

-- Sửa tên và giá từng khóa học thành tên mới và giá mới (Tên khóa học, giá khóa học các khóa học không được giống nhau)
UPDATE courses
SET name='fullstack_1', price=15000, updated_at=NOW()
WHERE id = 11;

UPDATE courses
SET name='fullstack_2', price=16000, updated_at=NOW()
WHERE id = 12;

UPDATE courses
SET name='fullstack_3', price=17000, updated_at=NOW()
WHERE id = 13;

UPDATE courses
SET name='front_end_1', price=18000, updated_at=NOW()
WHERE id = 14;

UPDATE courses
SET name='front_end_2', price=19000, updated_at=NOW()
WHERE id = 15;

UPDATE courses
SET name='front_end_3', price=20000, updated_at=NOW()
WHERE id = 16;

UPDATE courses
SET name='back_end_1', price=21000, updated_at=NOW()
WHERE id = 17;

UPDATE courses
SET name='back_end_2', price=22000, updated_at=NOW()
WHERE id = 18;

UPDATE courses
SET name='back_end_3', price=23000, updated_at=NOW()
WHERE id = 19;

-- Sửa lại bio của từng giảng viên (Bio từng giảng viên không được giống nhau)
UPDATE teacher
SET bio='bio giảng viên 1', updated_at=NOW()
WHERE id = 1;

UPDATE teacher
SET bio='bio giảng viên 2', updated_at=NOW()
WHERE id = 2;

UPDATE teacher
SET bio='bio giảng viên 3', updated_at=NOW()
WHERE id = 3;

-- Hiển thị danh sách giảng viên, danh sách khóa học
SELECT id, name, bio, created_at, updated_at
FROM teacher;

SELECT id, name, price, description, content, teacher_id, active, created_at, updated_at
FROM courses;