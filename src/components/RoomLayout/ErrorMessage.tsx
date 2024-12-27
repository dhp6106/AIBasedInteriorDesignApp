import { Html } from '@react-three/drei';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Html center>
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{message}</p>
      </div>
    </Html>
  );
};