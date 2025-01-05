interface FormErrorProps {
  message: string;
  showError: boolean;
}

export default function FormError({ message, showError }: FormErrorProps) {
  return (
    <>
      {showError && (
        <span className="text-sm text-red-500 font-normal">{message}</span>
      )}
    </>
  );
}
