
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, MessageSquare, Check } from "lucide-react";
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
  const [solved, setSolved] = useState(false);

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

  const markAsSolved = () => {
    setSolved(true);
  };

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCardGradient = () => {
    if (solved) {
      return 'border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white';
    } else if (type === 'technical') {
      return 'border-l-4 border-l-interview-technical bg-gradient-to-r from-interview-technical/5 to-white';
    } else {
      return 'border-l-4 border-l-interview-behavioral bg-gradient-to-r from-interview-behavioral/5 to-white';
    }
  };

  const difficultyLabel = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难'
  };

  const difficultyIcon = {
    'easy': <CheckCircle className="mr-1 h-3 w-3" />,
    'medium': <AlertCircle className="mr-1 h-3 w-3" />,
    'hard': <AlertCircle className="mr-1 h-3 w-3" />
  };

  return (
    <Card className={cn(
      "shadow-sm animate-card-appear backdrop-blur-sm", 
      getCardGradient(),
      { "shadow-lg": expanded }
    )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        transform: expanded ? 'scale(1.01)' : 'scale(1)',
        transition: 'transform 0.2s ease-in-out'
      }}
    >
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start">
            {solved && (
              <span className="mr-2 bg-green-100 text-green-800 p-1 rounded-full">
                <Check className="h-4 w-4" />
              </span>
            )}
            <h3 className={cn(
              "text-lg font-medium leading-relaxed pr-4",
              solved && "text-gray-500 line-through decoration-green-500/30 decoration-2"
            )}>
              {question.text}
            </h3>
          </div>
          <Badge className={cn("flex items-center px-2 py-1 rounded-full border", getDifficultyColor(question.difficulty))}>
            {difficultyIcon[question.difficulty]}
            {difficultyLabel[question.difficulty]}
          </Badge>
        </div>

        {expanded && (
          <div className="mt-6 space-y-5">
            {!showAnswer ? (
              <>
                <Textarea
                  placeholder="输入你的回答..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="min-h-[150px] border-gray-300 focus:ring-2 focus:ring-interview-primary/40 focus:border-interview-primary transition-all"
                  disabled={submitted || solved}
                />
                
                {submitted && (
                  <div className="mt-4 p-5 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-blue-700 mt-0.5 mr-2" />
                      <div>
                        <h4 className="font-medium text-blue-700 mb-2">AI 反馈:</h4>
                        <p className="text-gray-700 leading-relaxed">{feedback}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  {!submitted && !solved && (
                    <Button 
                      onClick={handleSubmit}
                      disabled={userAnswer.trim() === ''}
                      className={cn(
                        "transition-all",
                        type === 'technical' 
                          ? "bg-interview-technical hover:bg-interview-technical/90" 
                          : "bg-interview-behavioral hover:bg-interview-behavioral/90"
                      )}
                    >
                      提交回答
                    </Button>
                  )}
                  {(submitted || userAnswer.trim() !== '') && !solved && (
                    <Button 
                      variant="outline" 
                      onClick={markAsSolved}
                      className="border-green-500 text-green-600 hover:bg-green-50 flex items-center gap-2"
                    >
                      <Check size={16} /> 标记为已解决
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAnswer(true)}
                    className={cn(
                      "border-gray-300",
                      type === 'technical' 
                        ? "text-interview-technical hover:bg-interview-technical/10" 
                        : "text-interview-behavioral hover:bg-interview-behavioral/10"
                    )}
                  >
                    查看参考答案
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-3 text-gray-700">参考答案:</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{question.modelAnswer}</p>
                <div className="flex items-center gap-3 mt-4">
                  <Button 
                    variant="link" 
                    onClick={() => setShowAnswer(false)}
                    className={cn(
                      "px-0",
                      type === 'technical' ? "text-interview-technical" : "text-interview-behavioral"
                    )}
                  >
                    返回
                  </Button>
                  {!solved && (
                    <Button 
                      variant="outline" 
                      onClick={markAsSolved}
                      className="border-green-500 text-green-600 hover:bg-green-50 flex items-center gap-2"
                    >
                      <Check size={16} /> 标记为已解决
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center border-t p-1">
        <Button 
          variant="ghost" 
          onClick={toggleExpanded}
          className={cn(
            "w-full text-gray-500 hover:text-gray-700 hover:bg-gray-50/80",
            type === 'technical' ? "hover:text-interview-technical" : "hover:text-interview-behavioral"
          )}
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
