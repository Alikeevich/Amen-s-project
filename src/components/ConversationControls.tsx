import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { RotateCw, SkipForward } from "lucide-react";

interface ConversationControlsProps {
  onRepeat?: () => void;
  onNext?: () => void;
}

const ConversationControls = ({
  onRepeat = () => {},
  onNext = () => {},
}: ConversationControlsProps) => {
  return (
    <Card className="w-full p-4">
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onRepeat}
          className="flex items-center gap-2"
        >
          <RotateCw className="h-5 w-5" />
          Repeat Response
        </Button>

        <Button
          size="lg"
          onClick={onNext}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          <SkipForward className="h-5 w-5" />
          Next Question
        </Button>
      </div>
    </Card>
  );
};

export default ConversationControls;
