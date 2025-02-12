export const fetchQuestions = async (topic, difficulty) => {
  try {
    var url = `${import.meta.env.VITE_BACKEND_URL}/Questions?topic=${encodeURIComponent(topic)}&difficulty=${encodeURIComponent(difficulty)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();

    return data.map((question) => ({
      question: question.content,
      answers: question.options,
      correctAnswer: question.options[question.correctOptionIndex],
      explanation: question.explanation,
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
  
};