import { MatchStatsPanel, getMatchStats, getMatchStatsPerRound } from "@/features/match-stats";
import { getTeamRosters, TeamRoster } from "@/features/roster";
import { getFinalScore, ScorePanel } from "@/features/score";

export default function Home() {
  const [firstTeam, secondTeam] = getTeamRosters();
  const matchStats = getMatchStats();
  const [firstTeamScore, secondTeamScore] = getFinalScore();
  const roundStats = getMatchStatsPerRound();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 sm:items-start border-x-2 border-x-amber-500">

        <ScorePanel className="mb-8 h-24 w-full px-0" firstTeamScore={firstTeamScore} secondTeamScore={secondTeamScore} />

        <div className="flex flex-col gap-4 px-16 w-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <TeamRoster teamInfo={firstTeam} />
            <TeamRoster teamInfo={secondTeam} />
          </div>

          <MatchStatsPanel matchStats={matchStats} roundStats={roundStats} />
        </div>

      </main>
    </div>
  );
}
