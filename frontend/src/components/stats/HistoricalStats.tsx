import { useParams } from "@solidjs/router";
import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Show,
} from "solid-js";
import { client } from "../..";
import { useAppDimensions } from "../../state/DimensionProvider";
import { SystemStatsRecord, Timelength } from "../../types";
import Grid from "../shared/layout/Grid";
import Loading from "../shared/loading/Loading";
import SimpleTabs from "../shared/tabs/SimpleTabs";
import {
  CpuChart,
  CpuFreqChart,
  DiskChart,
  DiskReadChart,
  DiskWriteChart,
  LoadChart,
  MemChart,
  NetworkRecvChart,
  NetworkSentChart,
  TempuratureChart,
} from "./Charts";
import s from "./stats.module.scss";

const HistoricalStats: Component<{
  page: Accessor<number>;
  timelength: Accessor<Timelength>;
}> = (p) => {
  const { isMobile } = useAppDimensions();
  const params = useParams();
  const [stats, setStats] = createSignal<SystemStatsRecord[]>();
  createEffect(() => {
    client
      .get_server_stats_history(params.id, {
        interval: p.timelength(),
        page: p.page(),
        limit: 1000,
        networks: true,
        components: true,
      })
      .then(setStats);
  });
  return (
    <Grid class={s.Content} placeItems="start center">
      <Show when={stats()} fallback={<Loading type="three-dot" />}>
        <SimpleTabs
          localStorageKey="historical-stats-view-v3"
          defaultSelected="basic"
          containerStyle={{ width: isMobile() ? "100%" : "90%" }}
          tabs={[
            {
              title: "io",
              element: () => (
                <Grid class={s.Charts}>
                  <NetworkRecvChart stats={stats} />
                  <NetworkSentChart stats={stats} />
                  <DiskReadChart stats={stats} />
                  <DiskWriteChart stats={stats} />
                </Grid>
              ),
            },
            {
              title: "basic",
              element: () => (
                <Grid class={s.Charts}>
                  <LoadChart stats={stats} />
                  <CpuChart stats={stats} />
                  <CpuFreqChart stats={stats} />
                  <MemChart stats={stats} />
                  <DiskChart stats={stats} />
                </Grid>
              ),
            },
            {
              title: "temp",
              element: () => (
                <Grid class={s.Charts}>
                  <TempuratureChart stats={stats} />
                </Grid>
              ),
            },
          ]}
        />
      </Show>
    </Grid>
  );
};

export default HistoricalStats;
