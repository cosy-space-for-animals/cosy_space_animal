import Popup from '@/components/molecules/Popup';
import { IPopupProps } from '@/types/common';

const CommentPopup = ({ open, onClose }: IPopupProps) => {
  return (
    <Popup open={open} onClose={onClose}>
      CommentPopup
    </Popup>
  );
};

export default CommentPopup;
