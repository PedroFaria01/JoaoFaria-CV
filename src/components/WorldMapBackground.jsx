import { memo, useEffect, useMemo, useRef } from 'react';
import DottedMap from 'dotted-map/without-countries';
import { animate, cubicBezier } from 'animejs';
import worldMapGrid from '../data/worldMapGrid.json';
import './WorldMapBackground.css';

const EASE_OUT = cubicBezier(0.22, 1, 0.36, 1);

const worldMap = new DottedMap({ map: worldMapGrid });
const worldDots = worldMap.getPoints();

const WORLD_VIEW_BOX = `0 0 ${worldMap.width} ${worldMap.height}`;

const Dots = memo(function Dots({ points }) {
  return (
    <>
      {points.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={0.38}
          className="world-map-bg__dot"
        />
      ))}
    </>
  );
});

function locationKey(location) {
  return `${location.lat},${location.lng}`;
}

function usePins(map, locations) {
  return useMemo(() => {
    const seen = new Map();
    locations.forEach((location) => {
      const key = locationKey(location);
      if (!seen.has(key)) {
        seen.set(key, { ...map.getPin(location), label: location.label, key });
      }
    });
    return [...seen.values()];
  }, [map, locations]);
}

function WorldMapBackground({ stages, activeIndex }) {
  const groupRef = useRef(null);
  const cometRef = useRef(null);
  const routeRef = useRef(null);
  const pinRefs = useRef({});
  const prevKeyRef = useRef(null);

  const locations = useMemo(() => stages.map((stage) => stage.location), [stages]);
  const pins = usePins(worldMap, locations);

  const activeStage = stages[activeIndex];
  const activeKey = activeStage ? locationKey(activeStage.location) : null;
  const activePin = pins.find((pin) => pin.key === activeKey);

  const routeD = useMemo(() => {
    if (pins.length < 2) return '';
    return `M${pins[0].x},${pins[0].y} ${pins
      .slice(1)
      .map((pin) => `L${pin.x},${pin.y}`)
      .join(' ')}`;
  }, [pins]);

  useEffect(() => {
    if (!activePin) return;

    Object.entries(pinRefs.current).forEach(([key, el]) => {
      if (!el) return;
      animate(el, {
        scale: key === activeKey ? [1, 1.4] : 1,
        opacity: key === activeKey ? 1 : 0.45,
        duration: 500,
        ease: 'outElastic(1, 0.6)',
      });
    });

    if (groupRef.current) {
      animate(groupRef.current, {
        translateX: (worldMap.width / 2 - activePin.x) * 0.18,
        translateY: (worldMap.height / 2 - activePin.y) * 0.18,
        duration: 900,
        ease: EASE_OUT,
      });
    }

    const prevKey = prevKeyRef.current;
    if (prevKey && prevKey !== activeKey && cometRef.current) {
      const fromPin = pins.find((pin) => pin.key === prevKey);
      if (fromPin) {
        cometRef.current.setAttribute('cx', fromPin.x);
        cometRef.current.setAttribute('cy', fromPin.y);
        animate(cometRef.current, {
          cx: [fromPin.x, activePin.x],
          cy: [fromPin.y, activePin.y],
          opacity: [1, 0],
          duration: 850,
          ease: 'inOutQuad',
        });
      }
    }
    prevKeyRef.current = activeKey;
  }, [activeKey, activePin, pins]);

  return (
    <div className="world-map-bg" aria-hidden="true">
      <svg className="world-map-bg__svg" viewBox={WORLD_VIEW_BOX} preserveAspectRatio="xMidYMid slice">
        <g ref={groupRef}>
          <Dots points={worldDots} />
          {routeD && <path ref={routeRef} d={routeD} className="world-map-bg__route" />}
          <circle ref={cometRef} r={0.9} className="world-map-bg__comet" opacity={0} />
          {pins.map((pin) => (
            <g key={pin.key} transform={`translate(${pin.x}, ${pin.y})`}>
              <g
                ref={(el) => {
                  pinRefs.current[pin.key] = el;
                }}
                className={`world-map-bg__pin${pin.key === activeKey ? ' is-active' : ''}`}
              >
                <circle r={1.8} className="world-map-bg__pin-ring" />
                <circle r={0.7} className="world-map-bg__pin-dot" />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default WorldMapBackground;
