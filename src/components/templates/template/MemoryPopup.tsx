import Popup from '@/components/molecules/Popup';
import { IPopupProps } from '@/types/common';

const MemoryPopup = ({ open, onClose }: IPopupProps) => {
  return (
    <Popup open={open} onClose={onClose}>
      MemoryPopup
    </Popup>
  );
};

export default MemoryPopup;
