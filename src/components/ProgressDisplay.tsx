import React from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface ProgressStats {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  fluency: number;
}

interface ProgressDisplayProps {
  stats?: ProgressStats;
}

const defaultStats: ProgressStats = {
  pronunciation: 75,
  grammar: 80,
  vocabulary: 65,
  fluency: 70,
};

const ProgressDisplay = ({ stats = defaultStats }: ProgressDisplayProps) => {
  return (
    <Card className="w-full p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Your Progress</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Pronunciation</span>
            <span>{stats.pronunciation}%</span>
          </div>
          <Progress value={stats.pronunciation} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Grammar</span>
            <span>{stats.grammar}%</span>
          </div>
          <Progress value={stats.grammar} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Vocabulary</span>
            <span>{stats.vocabulary}%</span>
          </div>
          <Progress value={stats.vocabulary} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Fluency</span>
            <span>{stats.fluency}%</span>
          </div>
          <Progress value={stats.fluency} />
        </div>
      </div>
    </Card>
  );
};

export default ProgressDisplay;
