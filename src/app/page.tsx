"use client"
import { useState } from "react";
import { Button, Container, Typography, Box, LinearProgress } from "@mui/material";

interface Question {
  category: string;
  text: string;
}

const questions: Question[] = [
  { category: "Коммуникативный", text: "Мне нравится работать в команде и обсуждать идеи с другими." },
  { category: "Коммуникативный", text: "Я легко нахожу общий язык с новыми людьми." },
  { category: "Коммуникативный", text: "Мне важно, чтобы работа предполагала живое общение." },
  { category: "Коммуникативный", text: "Я получаю удовольствие от переговоров и публичных выступлений." },
  { category: "Организационно-детерминированный", text: "Мне нравится организовывать процессы и следить за их выполнением." },
  { category: "Организационно-детерминированный", text: "Я чувствую себя комфортно, когда у меня есть четкий план действий." },
  { category: "Организационно-детерминированный", text: "Мне важно контролировать ход работы и вносить коррективы." },
  { category: "Организационно-детерминированный", text: "Я люблю ставить цели и распределять задачи между людьми." },
  { category: "Аналитический", text: "Мне нравится разбираться в сложных данных и искать закономерности." },
  { category: "Аналитический", text: "Я предпочитаю работать с цифрами, графиками и статистикой." },
  { category: "Аналитический", text: "Мне важно глубоко понимать причины происходящего." },
  { category: "Аналитический", text: "Я люблю решать задачи, требующие логического мышления." },
  { category: "Практико-детерминированный", text: "Мне нравится работать руками и видеть конкретный результат." },
  { category: "Практико-детерминированный", text: "Я предпочитаю задачи, где нужно что-то создавать или чинить." },
  { category: "Практико-детерминированный", text: "Мне важно, чтобы работа была связана с реальными, осязаемыми вещами." },
  { category: "Практико-детерминированный", text: "Я чувствую удовлетворение, когда могу сразу применить знания на практике." }
];

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].category]: (prev[questions[currentIndex].category] || 0) + (answer === "Да" ? 1 : 0)
    }));
    
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const categoryCounts: { [key: string]: number } = {};
    questions.forEach((q) => {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    });

    return Object.keys(categoryCounts).map((category) => {
      return {
        category,
        percentage: Math.round(((answers[category] || 0) / categoryCounts[category]) * 100)
      };
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      {!showResults ? (
        <Box sx={{ p: 3, borderRadius: 3, boxShadow: 3, background: "white" }}>
          <LinearProgress variant="determinate" value={(currentIndex / questions.length) * 100} sx={{ mb: 2 }} />
          <Typography variant="body2" sx={{ mb: 1 }}>{`Вопрос ${currentIndex + 1} из ${questions.length}`}</Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>{questions[currentIndex].text}</Typography>
          <Box>
            <Button variant="contained" onClick={() => handleAnswer("Да")} sx={{ mr: 2 }}>
              Да
            </Button>
            <Button variant="outlined" onClick={() => handleAnswer("Нет")}>Нет</Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 3, borderRadius: 3, boxShadow: 3, background: "white" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Ваши результаты:</Typography>
          {calculateResults().map((result, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography variant="h6">{result.category}: {result.percentage}%</Typography>
              <LinearProgress variant="determinate" value={result.percentage} sx={{ height: 10, borderRadius: 5 }} />
            </Box>
          ))}
          <Button variant="contained" onClick={() => { setCurrentIndex(0); setAnswers({}); setShowResults(false); }} sx={{ mt: 2 }}>
            Пройти тест заново
          </Button>
        </Box>
      )}
    </Container>
  );
}