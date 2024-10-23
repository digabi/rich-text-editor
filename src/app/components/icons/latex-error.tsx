type Props = {
  title: string
  latex: string
  onClick: () => void
}

export default function LatexErrorIcon({ title, latex, onClick }: Props) {
  return (
    <span onClick={onClick} className="latex-error" data-latex={latex}>
      <svg
        width="305px"
        height="20px"
        viewBox="0 0 305 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>{title}</title>
        <defs></defs>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-241.000000, -219.000000)">
            <g transform="translate(209.000000, 207.000000)">
              <rect x="-1.58632797e-14" y="0" width="80" height="40"></rect>
              <g transform="translate(32.000000, 12.000000)">
                <polygon
                  id="Combined-Shape"
                  fill="#9B0000"
                  fillRule="nonzero"
                  points="0 18 8.04006 2 16.08012 18"
                ></polygon>
                <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 14 9 14 9 16 7 16"></polygon>
                <polygon id="Combined-Shape-path" fill="#FFFFFF" points="7 7 9 7 9 12 7 12"></polygon>
              </g>
            </g>
          </g>
        </g>
        <text x="25" y="16" fill="red">
          {title}
        </text>
      </svg>
    </span>
  )
}
