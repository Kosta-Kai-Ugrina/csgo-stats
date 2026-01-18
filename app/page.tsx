import { MatchStatsTable, parseMatchStats } from "@/features/match-stats";
import { getTeamRoster, TeamRoster } from "@/features/roster";

export default function Home() {
  const firstTeam = getTeamRoster("first");
  const secondTeam = getTeamRoster("second");
  const firstTeamMatchStats = parseMatchStats("first");
  const secondTeamMatchStats = parseMatchStats("second");
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-32 px-16 sm:items-start border-x-2 border-x-amber-500">

        <div className="flex flex-col md:flex-row gap-4">
          <TeamRoster teamInfo={firstTeam} />
          <TeamRoster teamInfo={secondTeam} />
        </div>

        <div className="flex flex-col w-full md:flex-row gap-4">
          <MatchStatsTable teamStats={firstTeamMatchStats} />
          <MatchStatsTable teamStats={secondTeamMatchStats} />
        </div>
      </main>
    </div>
  );
}
