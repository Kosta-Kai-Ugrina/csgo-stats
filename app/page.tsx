import { MatchStatsTable, getMatchStats, getMatchStatsPerRound } from "@/features/match-stats";
import RoundStatsList from "@/features/match-stats/components/RoundStatsList";
import { getTeamRosters, TeamRoster } from "@/features/roster";
import { getFinalScore, ScorePanel } from "@/features/score";
import { FlexRow } from "@/shared/components/layout";
import { FlexColumn } from "@/shared/components/layout";

export default function Home() {
  const [firstTeam, secondTeam] = getTeamRosters();
  const [firstTeamMatchStats, secondTeamMatchStats] = getMatchStats();
  const [firstTeamScore, secondTeamScore] = getFinalScore();
  const matchStatsPerRound = getMatchStatsPerRound();


  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 sm:items-start border-x-2 border-x-amber-500">

        <ScorePanel className="mb-8 h-24 w-full px-0" firstTeamScore={firstTeamScore} secondTeamScore={secondTeamScore} />

        <div className="flex flex-col gap-4 px-16 w-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <TeamRoster teamInfo={firstTeam} />
            <TeamRoster teamInfo={secondTeam} />
          </div>

          <div className="flex flex-col w-full md:flex-row gap-4 justify-between">

          </div>

          <FlexColumn className="text-white text-sm border-collapse border-[0.5px] border-white/10 px-4 py-2 rounded-sm">
            <h2 className="text-white text-lg font-bold">Match Stats</h2>

            <FlexRow className="w-full justify-between">
              <MatchStatsTable teamStats={firstTeamMatchStats} />
              <MatchStatsTable teamStats={secondTeamMatchStats} />
            </FlexRow>
          </FlexColumn>

          <RoundStatsList roundStats={matchStatsPerRound} />

        </div>

      </main>
    </div>
  );
}
