const ArrowSVG = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={55}
    height={10}
    fill="none"
    viewBox="0 0 66 8"
  >
    <path
      fill={fill || "#fff"}
      d="M65.354 4.354a.5.5 0 0 0 0-.708L62.172.464a.5.5 0 1 0-.707.708L64.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM0 4.5h65v-1H0v1Z"
    />
  </svg>
);

export default ArrowSVG;
