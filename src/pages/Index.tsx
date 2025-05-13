
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Lightbulb, Brain, ChevronDown, ChevronUp } from "lucide-react";
import QuestionCard from "@/components/QuestionCard";
import { technicalQuestions, behavioralQuestions } from "@/data/mockQuestions";

const Index = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('technical');
  const [questionsData, setQuestionsData] = useState({
    technical: technicalQuestions,
    behavioral: behavioralQuestions
  });

  const handleSubmit = () => {
    // In a real implementation, this would process the JD and resume with AI
    // For the demo, we'll just use our mock data
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setJobDescription('');
    setResume('');
  };

  return (
    <div className="min-h-screen bg-interview-light">
      <div className="container py-8 mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-interview-primary mb-2">面试准备助手</h1>
          <p className="text-gray-600">根据你的简历和JD，生成针对性的面试问题并提供AI辅导</p>
        </header>

        {!submitted ? (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                职位描述 (JD)
              </label>
              <Textarea
                id="jobDescription"
                placeholder="粘贴职位描述..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                你的简历
              </label>
              <Textarea
                id="resume"
                placeholder="粘贴你的简历..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="min-h-[180px]"
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full bg-interview-primary hover:bg-interview-primary/90"
            >
              生成面试问题
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">为你定制的面试问题</h2>
              <Button variant="outline" onClick={resetForm}>重新输入</Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="technical" className="flex gap-2 items-center">
                  <Brain size={18} />
                  专业技能面试
                </TabsTrigger>
                <TabsTrigger value="behavioral" className="flex gap-2 items-center">
                  <Lightbulb size={18} />
                  行为面试
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="technical" className="mt-0">
                <div className="space-y-4">
                  {questionsData.technical.map((question, index) => (
                    <QuestionCard 
                      key={`tech-${index}`}
                      question={question}
                      type="technical"
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="behavioral" className="mt-0">
                <div className="space-y-4">
                  {questionsData.behavioral.map((question, index) => (
                    <QuestionCard 
                      key={`behav-${index}`}
                      question={question}
                      type="behavioral"
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
