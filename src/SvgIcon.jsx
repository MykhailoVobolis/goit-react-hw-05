export default function SvgIcon({ name, ...props }) {
  return (
    <svg {...props} aria-hidden="true">
      <use xlinkHref={`/sprite.svg#${name}`} />
    </svg>
  );
}
