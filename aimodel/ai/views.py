from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import connection

def fetch_from_db(query, params=None):
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        result = cursor.fetchall()
    return result

def calculate_match_score(student, scholarship):
    income_weight = 0.4
    course_weight = 0.3
    gender_weight = 0.2
    community_weight = 0.1
    percentage_weight = 0.1 if student['course'] in [0, 1] else 0 
    gpa_weight = 0.1 if student['course'] in [2, 3] else 0  

    score = 0
    match_criteria = 0

    if student['course'] != -1 and scholarship['course'] != -1:
        if student['course'] == scholarship['course']:
            score += course_weight
            match_criteria += 1

    if student['income_level'] != -1:
        if scholarship['income_level'] == -1:
            score += income_weight
        elif student['income_level'] >= scholarship['income_level']:
            normalized_income_score = 1 - (student['income_level'] / (scholarship['income_level'] + 1))
            score += income_weight * normalized_income_score
            match_criteria += 1

    if student['gender'] != -1 and scholarship['gender'] != -1:
        if student['gender'] == scholarship['gender']:
            score += gender_weight
            match_criteria += 1

    if student['community'] != -1 and scholarship['community'] != -1:
        if student['community'] == scholarship['community']:
            score += community_weight
            match_criteria += 1

    if student['course'] in [0, 1]:
        if scholarship['min_percentage'] is not None and student['percentage'] >= scholarship['min_percentage']:
            score += percentage_weight
            match_criteria += 1
    elif student['course'] in [2, 3]:
        if scholarship['min_gpa'] is not None and student['gpa'] >= scholarship['min_gpa']:
            score += gpa_weight
            match_criteria += 1

    score = min(score, 1)
    eligibility_percentage = score * 100

    return eligibility_percentage, match_criteria
    
class ScholarshipRecommendationView(APIView):
    def get(self, request, student_id):
        # Fetch student data
        student_query = """
        SELECT id, gender, community, course, income_level, percentage, gpa
        FROM Student
        WHERE id = %s
        """
        student = fetch_from_db(student_query, (student_id,))
        
        if not student:
            return Response({"error": "Student not found"}, status=404)

        student_data = {
            'course': student[0][3],
            'income_level': student[0][4],
            'gender': student[0][1],
            'community': student[0][2],
            'percentage': student[0][5],
            'gpa': student[0][6],
        }

        # Fetch scholarships data
        scholarships_query = """
        SELECT id, course, income_level, gender, community, min_percentage, min_gpa
        FROM Scholarship
        """
        scholarships = fetch_from_db(scholarships_query)

        recommendations = []
        for scholarship in scholarships:
            scholarship_data = {
                'course': scholarship[1],
                'income_level': scholarship[2],
                'gender': scholarship[3],
                'community': scholarship[4],
                'min_percentage': scholarship[5],
                'min_gpa': scholarship[6],
            }
            score, _ = calculate_match_score(student_data, scholarship_data)
            recommendations.append({
                'scholarship_id': scholarship[0],
                'score': score
            })

        recommendations.sort(key=lambda x: x['score'], reverse=True)
        
        # Fetch details of recommended scholarships
        recommended_scholarship_ids = [rec['scholarship_id'] for rec in recommendations]
        details_query = """
        SELECT id, name, amt, description, procedures
        FROM Scholarship
        WHERE id IN %s
        """
        details = fetch_from_db(details_query, (tuple(recommended_scholarship_ids),))
        
        detailed_recommendations = [
            {
                'scholarship_id': detail[0],
                'name': detail[1],
                'amount': detail[2],
                'description': detail[3],
                'procedures': json.loads(detail[4]),  # Assuming procedures is stored as a JSON string
                'score': next(rec['score'] for rec in recommendations if rec['scholarship_id'] == detail[0])
            }
            for detail in details
        ]

        return Response({"recommendations": detailed_recommendations})
