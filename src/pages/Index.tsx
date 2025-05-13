
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Brain, ChevronDown, ChevronUp, Upload, FileText } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-interview-light via-white to-blue-50">
      <div className="container py-12 mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-interview-primary to-interview-secondary bg-clip-text text-transparent mb-3">面试准备助手</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">根据你的简历和JD，生成针对性的面试问题并提供AI辅导</p>
        </header>

        {!submitted ? (
          <Card className="max-w-3xl mx-auto shadow-lg border-none bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <FileText size={18} className="mr-2 text-interview-primary" />
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                    职位描述 (JD)
                  </label>
                </div>
                <Textarea
                  id="jobDescription"
                  placeholder="粘贴职位描述..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[120px] border-gray-300 focus:ring-interview-primary focus:border-interview-primary"
                />
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <Upload size={18} className="mr-2 text-interview-primary" />
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                    你的简历
                  </label>
                </div>
                <Textarea
                  id="resume"
                  placeholder="粘贴你的简历..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[180px] border-gray-300 focus:ring-interview-primary focus:border-interview-primary"
                />
              </div>

              <Button 
                onClick={handleSubmit} 
                className="w-full bg-gradient-to-r from-interview-primary to-interview-secondary hover:opacity-90 transition-all duration-300 py-6 text-lg"
                disabled={!jobDescription.trim() || !resume.trim()}
              >
                生成面试问题
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-interview-primary to-interview-secondary bg-clip-text text-transparent">为你定制的面试问题</h2>
              <Button 
                variant="outline" 
                onClick={resetForm}
                className="border-interview-primary text-interview-primary hover:bg-interview-primary/10"
              >
                重新输入
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-lg">
                <TabsTrigger 
                  value="technical" 
                  className="flex gap-2 items-center py-3 data-[state=active]:bg-white data-[state=active]:text-interview-technical data-[state=active]:shadow-md data-[state=active]:font-medium"
                >
                  <Brain size={18} />
                  专业技能面试
                </TabsTrigger>
                <TabsTrigger 
                  value="behavioral" 
                  className="flex gap-2 items-center py-3 data-[state=active]:bg-white data-[state=active]:text-interview-behavioral data-[state=active]:shadow-md data-[state=active]:font-medium"
                >
                  <Lightbulb size={18} />
                  行为面试
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="technical" className="mt-6">
                <div className="space-y-6">
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
              
              <TabsContent value="behavioral" className="mt-6">
                <div className="space-y-6">
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
