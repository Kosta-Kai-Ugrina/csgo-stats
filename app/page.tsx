import { MatchStatsPanel, aggregateRoundStats, getMatchStatsPerRound } from "@/features/match-stats";
import { getTeamRosters, TeamRoster } from "@/features/roster";
import { getFinalScore, ScorePanel } from "@/features/score";

export default function Home() {
  const [firstTeam, secondTeam] = getTeamRosters();
  const [firstTeamScore, secondTeamScore] = getFinalScore();
  const roundStats = getMatchStatsPerRound();
  const fullMatchStats = aggregateRoundStats(roundStats);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center py-8 sm:items-start border-x-[0.5px] border-white/10">

        <ScorePanel className="my-4 h-24 w-full px-0" firstTeamScore={firstTeamScore} secondTeamScore={secondTeamScore} />

        <div className="flex flex-col gap-4 px-16 w-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <TeamRoster teamInfo={firstTeam} />
            <TeamRoster teamInfo={secondTeam} />
          </div>

          <MatchStatsPanel roundStats={roundStats} fullMatchStats={fullMatchStats} />
        </div>

      </main>
    </div>
  );
}
