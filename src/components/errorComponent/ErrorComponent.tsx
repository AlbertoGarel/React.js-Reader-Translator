import './ErrorComponent.scss';

interface ErrorComponentProps {
  errorText: string
}

export default function ErrorComponent({errorText}: ErrorComponentProps) {
  return (
    <div id="error-container" >
      <span>{errorText}</span>
    </div>
  );
}
