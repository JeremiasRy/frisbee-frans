UPDATE course
SET rounds_played = round_query.rounds_played
FROM (
	SELECT c.id AS course_id, count(r.id) AS rounds_played 
	FROM course c 
	LEFT JOIN round r 
	ON c.id = r.course_id 
	GROUP BY c.id
) as round_query
WHERE id = round_query.course_id;