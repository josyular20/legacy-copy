import AdventuringOptimistIcon from "@/components/icons/AdventuringOptimistIcon"
import EasygoingExplorerIcon from "@/components/icons/EasygoingExplorerIcon"
import MultitaskingDynamoIcon from "@/components/icons/MultitaskingDynamo"
import ProcrastinatingRookieIcon from "@/components/icons/ProcrastinatingRookieIcon"
import TranquilTrailblazarIcon from "@/components/icons/TranquilTrailblazarIcon"
import React from "react"

/**
 * Function to return the icon for the persona
 * @param persona 
 * @returns 
 */
 const personaIcon = (persona:string) => {
  if (persona === 'Adventurous Optimist') {
    return <AdventuringOptimistIcon />;
  }
  else if (persona === 'Easygoing Explorer') {
    return <EasygoingExplorerIcon />;
  }
  else if (persona === 'Multitasking Dynamo') {
    return <MultitaskingDynamoIcon />;
  }
  else if (persona === 'Procrastinating Rookie') {
    return <ProcrastinatingRookieIcon />;
  }
  else if (persona === 'Tranquil Trailblazer') {
    return <TranquilTrailblazarIcon />;
  }
}

export default personaIcon;