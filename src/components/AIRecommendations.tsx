import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import MovieChat from './MovieChat';
import { Brain, MessageSquare } from 'lucide-react';

export default function AIRecommendations() {
  const [activeTab, setActiveTab] = useState('model');

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="model" className="flex-1">
            <Brain className="w-4 h-4 mr-2" />
            AI Model
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Movie Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="model" className="mt-0">
          <div className="max-w-4xl mx-auto">
            {/* Your existing AI model content */}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-0">
          <MovieChat />
        </TabsContent>
      </Tabs>
    </div>
  );
}