import { useEffect, useState } from "react";

interface UserScore {
  username: string;
  score: number;
}
export const Leaderboard = () => {
  const [scores, setScores] = useState<UserScore[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message: UserScore[] = JSON.parse(event.data);
      setScores(message.sort((a, b) => b.score - a.score)); // Sort in descending order
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };
    // !! INVESTIGATE WHT IT CLOSES IMMEDIATELY BUT IT STILL WORKS
    return () => {
      console.log("Cleaning up WebSocket connection");
      socket.close();
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr className="text-center">
            <th className="pb-2 ">Username</th>
            <th className="pb-2 ">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 text-center">{score.username}</td>
              <td className="py-2">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
