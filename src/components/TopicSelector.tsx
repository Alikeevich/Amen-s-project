import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface Topic {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "travel" | "business" | "casual";
}

const defaultTopics: Topic[] = [
  {
    id: "1",
    title: "Airport Navigation",
    difficulty: "beginner",
    category: "travel",
  },
  {
    id: "2",
    title: "Business Meeting",
    difficulty: "intermediate",
    category: "business",
  },
  {
    id: "3",
    title: "Coffee Shop Chat",
    difficulty: "beginner",
    category: "casual",
  },
];

interface TopicSelectorProps {
  onSelectTopic?: (topic: Topic) => void;
  topics?: Topic[];
}

const TopicSelector = ({
  onSelectTopic = () => {},
  topics = defaultTopics,
}: TopicSelectorProps) => {
  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Select a Topic</h2>
      <div className="grid gap-2">
        {topics.map((topic) => (
          <Button
            key={topic.id}
            variant="outline"
            className="w-full justify-start"
            onClick={() => onSelectTopic(topic)}
          >
            <div className="flex flex-col items-start">
              <span>{topic.title}</span>
              <span className="text-sm text-muted-foreground">
                {topic.difficulty} · {topic.category}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default TopicSelector;
