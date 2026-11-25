import { useState, useEffect, useMemo } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./components/Tooltip.jsx";
import ArcherArmor from "./components/ArcherArmor.jsx";
import ArcherAttack from "./components/ArcherAttack.jsx";
import CavalryArmor from "./components/CavalryArmor.jsx";
import InfantryArmor from "./components/InfantryArmor.jsx";
import InfCavAttack from "./components/InfCavAttack.jsx";
import Lumbercamp from "./components/Lumbercamp.jsx";
import Mill from "./components/Mill.jsx";
import Ballistics from "./components/Ballistics.jsx";
import Bloodlines from "./components/Bloodlines.jsx";
import VillUpgrades from "./components/VillUpgrades.jsx";
import CastleTech from "./components/CastleTech.jsx";
import ImperialTech from "./components/ImperialTech.jsx";
import CivTooltip from "./components/CivTooltip.jsx";
import NoticeBox from "./components/NoticeBox.jsx";
import { useProfiles, useStreamCivs } from "./hooks/helpers";

function App() {
  const { data: profiles } = useProfiles();

  const [displayResolution, setDisplayResolution] = useState({
    width: 0,
    height: 0,
  }); // Viewers stream window resolution
  const [streamUrl, setStreamUrl] = useState(""); // What stream is being viewed
  const [isAoe2, setIsAoe2] = useState(false); // DEBUG set to true

  // Which coordinates to use // Some streamers have different CaptureAge layouts
  const profile = profiles[streamUrl] ?? profiles.defaultProfile;

  const { data: civs } = useStreamCivs(streamUrl, isAoe2);
  // DEBUG TESTING
  // const civs = ['muisca', 'tupi'];

  function buildComponents(civ) {
    return [
      <Ballistics key="ballistics" />,
      <Bloodlines key="bloodlines" />,
      <ArcherAttack key="archer-attack" />,
      <InfCavAttack key="inf-cav-attack" />,
      <Lumbercamp key="lumbercamp" />,
      <Mill key="mill" civ={civ === "khitans" ? civ : null} />,
      <ArcherArmor key="archer-armor" />,
      <CavalryArmor key="cavalry-armor" />,
      <InfantryArmor key="infantry-armor" />,
      <VillUpgrades key="vill-upgrades" />,
      <CastleTech key="castle-tech" civ={civ} />,
      <ImperialTech key="imperial-tech" civ={civ} />,
    ];
  }

  // DEBUG dont usememo
  // const componentsLeft = buildComponents(civs?.[0]);
  // const componentsRight = buildComponents(civs?.[1]);

  const componentsLeft = useMemo(() => buildComponents(civs?.[0]), [civs]);
  const componentsRight = useMemo(() => buildComponents(civs?.[1]), [civs]);

  // Resize observer to track window size
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDisplayResolution({
        width,
        height,
      });
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dep array since we don't need to recreate it

  // Fetch streamer from Twitch context. Twitch has no way to remove an
  // onContext listener, so register it once; the setters avoid stale closures.
  useEffect(() => {
    window.Twitch?.ext.onContext((context) => {
      const stream = context?.playerChannel;
      const currentGame = context?.game;
      // only do stuff if streamer is playing aoe2
      const playingAoe2 =
        typeof currentGame === "string" &&
        currentGame.includes("Age of Empires II");
      setIsAoe2(playingAoe2);

      if (stream && playingAoe2) setStreamUrl(stream);
    });
  }, []);

  // Keep track of aspect ratio of the viewers stream window. Keeps elements in proportion
  const ratio = useMemo(() => {
    if (!displayResolution.width || !displayResolution.height) return 1;

    const aspectRatio = displayResolution.width / displayResolution.height;
    if (aspectRatio > 1.78) {
      const widthRatio = 1920 / displayResolution.width;
      return Math.min(widthRatio, 1.409);
    }
    return 1920 / displayResolution.width;
  }, [displayResolution]);

  // skip rendering entirely if not playing aoe2 or no civs in db
  if (!isAoe2) return null;
  if (!civs?.length) return null;

  return (
    <div>
      {profile.coordinatesLeft &&
        Object.entries(profile.coordinatesLeft).map(([, value], i) => (
          <Tooltip key={value[2]}>
            <TooltipTrigger asChild={true}>
              <div
                className="tooltip-box"
                style={{
                  width: 28 / ratio,
                  height: 28 / ratio,
                  left: value[0] / ratio,
                  top: value[1] / ratio,
                }}
              ></div>
            </TooltipTrigger>
            <TooltipContent>{componentsLeft[i]}</TooltipContent>
          </Tooltip>
        ))}
      {profile.coordinatesRight &&
        Object.entries(profile.coordinatesRight).map(([, value], i) => (
          <Tooltip key={value[2]}>
            <TooltipTrigger asChild={true}>
              <div
                className="tooltip-box"
                style={{
                  width: 28 / ratio,
                  height: 28 / ratio,
                  left: value[0] / ratio,
                  top: value[1] / ratio,
                }}
              ></div>
            </TooltipTrigger>
            <TooltipContent>{componentsRight[i]}</TooltipContent>
          </Tooltip>
        ))}
      <div>
        <NoticeBox show={true} ratio={ratio} />
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <div
              className="tooltip-box"
              style={{
                width: 220 / ratio,
                height: 50 / ratio,
                left: profile.leftCivBox[0] / ratio,
                top: profile.leftCivBox[1] / ratio,
              }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>
            <CivTooltip civ={civs[0]} />
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild={true}>
            <div
              className="tooltip-box"
              style={{
                width: 220 / ratio,
                height: 50 / ratio,
                left: profile.rightCivBox[0] / ratio,
                top: profile.rightCivBox[1] / ratio,
              }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>
            <CivTooltip civ={civs[1]} />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
