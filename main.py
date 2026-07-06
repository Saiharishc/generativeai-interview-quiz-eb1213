from fastapi import FastAPI

app = FastAPI()

@app.get('/topics')
def get_topics():
    return {"topics": ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"]}

@app.get('/quizzes')
def get_quizzes(topic: str = None):
    # In a real application, this would fetch quizzes from a database,
    # potentially filtered by topic.
    all_quizzes = [
        {"id": 1, "title": "ML Fundamentals", "topic": "Machine Learning"},
        {"id": 2, "title": "NLP Basics", "topic": "Natural Language Processing"},
        {"id": 3, "title": "CV Intro", "topic": "Computer Vision"},
        {"id": 4, "title": "Advanced ML", "topic": "Machine Learning"}
    ]
    if topic:
        return [quiz for quiz in all_quizzes if quiz["topic"] == topic]
    return all_quizzes

@app.get('/quizzes/{quiz_id}')
def get_quiz_details(quiz_id: int):
    # In a real application, this would fetch quiz details from a database.
    quiz_data = {
        1: {
            "id": 1,
            "title": "ML Fundamentals",
            "topic": "Machine Learning",
            "questions": [
                {
                    "question": "What is the primary goal of machine learning?",
                    "answer": "To enable systems to learn from data without explicit programming.",
                    "explanation": "Machine learning algorithms identify patterns in data and use them to make predictions or decisions."
                },
                {
                    "question": "What is supervised learning?",
                    "answer": "A type of machine learning where the algorithm is trained on labeled data.",
                    "explanation": "In supervised learning, the model is provided with input-output pairs, learning to map inputs to outputs."
                }
            ]
        },
        2: {
            "id": 2,
            "title": "NLP Basics",
            "topic": "Natural Language Processing",
            "questions": [
                {
                    "question": "What is tokenization in NLP?",
                    "answer": "The process of breaking down text into smaller units called tokens.",
                    "explanation": "Tokens can be words, subwords, or characters, and are the fundamental building blocks for NLP tasks."
                }
            ]
        }
    }
    return quiz_data.get(quiz_id, {"error": "Quiz not found"})

@app.get('/quizzes/search')
def search_quizzes(keyword: str = None, topic: str = None):
    # In a real application, this would perform a search across quiz titles and descriptions.
    all_quizzes = [
        {"id": 1, "title": "ML Fundamentals", "topic": "Machine Learning"},
        {"id": 2, "title": "NLP Basics", "topic": "Natural Language Processing"},
        {"id": 3, "title": "CV Intro", "topic": "Computer Vision"},
        {"id": 4, "title": "Advanced ML", "topic": "Machine Learning"}
    ]

    results = []
    for quiz in all_quizzes:
        match = True
        if keyword and keyword.lower() not in quiz["title"].lower():
            match = False
        if topic and quiz["topic"] != topic:
            match = False
        if match:
            results.append(quiz)
    return results
