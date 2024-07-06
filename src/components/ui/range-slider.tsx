import { ChangeEvent, FC, useCallback, useEffect, useRef } from "react";

interface IRangeSliderProps {
  min: number;
  max: number;
  value: {
    min: number;
    max: number;
  };
  step?: number;
  onValueChange: (range: { min: number; max: number }) => void;
}

export default function RangeSlider({
  min,
  max,
  value,
  onValueChange,
  step = 1,
}: IRangeSliderProps) {
  const range = useRef<HTMLDivElement>(null);

  const minValue = value.min;
  const maxValue = value.max;

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue, getPercent]);

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    onValueChange({ min: value, max: maxValue });
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    onValueChange({ min: minValue, max: value });
  };

  return (
    <div className="relative max-w-64">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={handleMinChange}
        step={step}
        className="absolute w-full -top-1 h-1 bg-transparent appearance-none z-[1]"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={handleMaxChange}
        step={step}
        className="absolute w-full -top-1 h-1 bg-transparent appearance-none z-[1]"
      />
      <div className="relative w-full">
        <div className="absolute rounded-md h-1 z-0 bg-neutral-300 w-full"></div>
        <div
          ref={range}
          className="absolute rounded-md h-1 z-0 bg-sky-600"
        ></div>
        {/* <div className="absolute text-neutral-600 text-sm mt-6 left-0">{minValue}</div>
          <div className="absolute text-neutral-600 text-sm mt-6 right-0">{maxValue}</div> */}
      </div>
    </div>
  );
}
