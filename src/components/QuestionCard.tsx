
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: {
    text: string;
    difficulty: 'easy' | 'medium' | 'hard';
    modelAnswer: string;
  };
  type: 'technical' | 'behavioral';
  index: number;
}

const QuestionCard = ({ question, type, index }: QuestionCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // In a real implementation, this would send the answer to an AI for feedback
    // For the demo, we'll just provide mock feedback
    setSubmitted(true);
    if (type === 'technical') {
      setFeedback('你的回答展示了对技术概念的理解，但可以提供更多具体的实例来支持你的观点。考虑添加一个你过去如何应用这些技术的例子。');
    } else {
      setFeedback('你的回答很好地展现了你的行为模式，但可以使用STAR方法（情境、任务、行动、结果）来使你的回答更加结构化。');
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardBorder = () => {
    if (type === 'technical') {
      return 'border-l-4 border-l-interview-technical';
    } else {
      return 'border-l-4 border-l-interview-behavioral';
    }
  };

  const difficultyLabel = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
  };

  return (
    <Card className={cn(
      "shadow-sm animate-card-appear", 
      getCardBorder(),
      { "shadow-md": expanded }
    )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium mb-4">{question.text}</h3>
          <Badge className={getDifficultyColor(question.difficulty)}>
            {difficultyLabel[question.difficulty]}
          </Badge>
        </div>

        {expanded && (
          <div className="mt-4 space-y-4">
            {!showAnswer ? (
              <>
                <Textarea
                  placeholder="输入你的回答..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="min-h-[120px]"
                  disabled={submitted}
                />
                
                {submitted && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-700 mb-2">AI 反馈:</h4>
                    <p className="text-gray-700">{feedback}</p>
                  </div>
                )}

                <div className="flex space-x-2">
                  {!submitted && (
                    <Button 
                      onClick={handleSubmit}
                      disabled={userAnswer.trim() === ''}
                      className="bg-interview-primary hover:bg-interview-primary/90"
                    >
                      提交回答
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAnswer(true)}
                  >
                    查看参考答案
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">参考答案:</h4>
                <p className="text-gray-700">{question.modelAnswer}</p>
                <Button 
                  variant="link" 
                  onClick={() => setShowAnswer(false)}
                  className="px-0 mt-2"
                >
                  返回
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center border-t p-2">
        <Button 
          variant="ghost" 
          onClick={toggleExpanded}
          className="w-full text-gray-500"
        >
          {expanded ? (
            <span className="flex items-center">
              收起 <ChevronUp className="ml-2" size={16} />
            </span>
          ) : (
            <span className="flex items-center">
              展开回答 <ChevronDown className="ml-2" size={16} />
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
