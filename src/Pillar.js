import React from 'react';
import {isMobile, isDesktop} from 'react-device-detect';

export const PillarBar = (props) => {
  return (
    <div style={{left: props.xaxis}} className={`w-10 
    ${props.toporbottom} absolute bg-gradient-to-r
     from-blue-500 to-blue-950 h-[160px]`}>
    </div>
  )
}
