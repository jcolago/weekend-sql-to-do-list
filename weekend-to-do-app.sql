--This is the database used for this project

CREATE TABLE "tasks"(
	"id" serial primary key,
	"task_name" varchar(80) not null,
	"completed" boolean default false
);

INSERT INTO "tasks"("task_name", "completed")
VALUES ('dishes', 'false'),
('take out trash', 'false');