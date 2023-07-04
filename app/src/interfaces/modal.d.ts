export interface WarningModalStateProps {
  isActive: boolean;
  id: null | number;
}
export interface WarningModalProps {
  message: string;
  setIsActive: (params: WarningModalStateProps) => void;
  isActive: WarningModalStateProps;
}
