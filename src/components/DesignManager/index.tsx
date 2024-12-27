import { SaveDesignButton } from './SaveDesignButton';
import { LoadDesignButton } from './LoadDesignButton';

export const DesignManager = () => {
  return (
    <div className="flex items-center space-x-4">
      <SaveDesignButton />
      <LoadDesignButton />
    </div>
  );
};