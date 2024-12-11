type RadiusSvgType = {
  xScale: d3.ScaleBand<string>;
  xValue: string;
  yScale: d3.ScaleLinear<number, number>;
  yValue: number;
  height: number;
  width: number;
  radius: number;
  margin: number;
};

const RadiusSvg = ({
  xScale,
  xValue,
  yScale,
  yValue,
  height,
  width,
  radius,
  margin,
}: RadiusSvgType) => {
  const x = xScale(xValue);
  const y = yScale(yValue);
  const rectHeight = height - margin - yScale(yValue);

  if (x === undefined || y === undefined) return;

  const path = `
          M ${x + radius}, ${y}
          H ${x + width - radius}
          Q ${x + width}, ${y} ${x + width}, ${y + radius}
          V ${y + rectHeight}
          H ${x}
          V ${y + radius}
          Q ${x}, ${y} ${x + radius}, ${y}
          Z
        `;

  return path;
};

export default RadiusSvg;
