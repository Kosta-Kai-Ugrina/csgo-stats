import { MatchStatsPanel, aggregateRoundStats, getMatchStatsPerRound } from "@/features/match-stats";
import { getTeamRosters, TeamRoster } from "@/features/roster";
import { getFinalScore, ScorePanel } from "@/features/score";
import { FlexColumn, FlexRow } from "@/shared/components/layout";

export default function Home() {
  const [firstTeam, secondTeam] = getTeamRosters();
  const [firstTeamScore, secondTeamScore] = getFinalScore();
  const roundStats = getMatchStatsPerRound();
  const fullMatchStats = aggregateRoundStats(roundStats);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center py-8 sm:items-start border-x-[0.5px] border-white/10">

        <ScorePanel className="my-4 h-24 w-full px-0" firstTeamScore={firstTeamScore} secondTeamScore={secondTeamScore} />

        <FlexColumn className="gap-4 px-16 w-full">
          <FlexColumn className="p-4 border-[0.5px] border-white/10 rounded-sm">
            <h2 className="text-white text-lg font-bold mb-2">Team Roster</h2>
            <FlexRow className="flex-col md:flex-row justify-between gap-4">
              <TeamRoster teamInfo={firstTeam} />
              <TeamRoster teamInfo={secondTeam} />
            </FlexRow>
          </FlexColumn>

          <MatchStatsPanel roundStats={roundStats} fullMatchStats={fullMatchStats} />
        </FlexColumn>

      </main>
    </div>
  );
}
