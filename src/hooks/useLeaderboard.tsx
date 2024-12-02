import { useEffect, useState } from "react";

interface UserScore {
  username: string;
  score: number;
}

export function useLeaderboard() {
  const [scores, setScores] = useState<UserScore[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message: UserScore[] = JSON.parse(event.data);
      setScores(message.sort((a, b) => b.score - a.score));
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };
    return () => {
      console.log("Cleaning up WebSocket connection");
      socket.close();
    };
  }, []);

  return {
    scores,
  };
}
