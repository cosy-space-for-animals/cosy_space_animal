const FlowerIcon = ({ color = 'var(--grey-900)', size = 24 }: IIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M7.98808 3.30932C8.96231 2.43975 10.4367 2.59998 11.2174 3.6839L11.2174 3.68391L11.3917 3.92588C11.5326 4.12157 11.7591 4.23754 12.0002 4.23754C12.2414 4.23754 12.4678 4.12157 12.6088 3.92588L12.7831 3.68391L12.7831 3.6839C13.5638 2.59998 15.0381 2.43974 16.0124 3.30933C17.0159 4.20499 17.0779 5.81785 16.1392 6.7953L16.1392 6.79531L16.0177 6.92185L13.4595 9.37844C13.9467 9.65018 14.3502 10.0537 14.6219 10.5409L17.0785 7.98273L17.205 7.86125L17.2051 7.86124C18.1825 6.92256 19.7954 6.98459 20.691 7.98807C21.5606 8.96231 21.4004 10.4367 20.3165 11.2174L20.3164 11.2174L20.0745 11.3917C19.8788 11.5326 19.7628 11.7591 19.7628 12.0002C19.7628 12.2414 19.8788 12.4678 20.0745 12.6088L20.3164 12.7831L20.3165 12.7831C21.4004 13.5638 21.5606 15.0381 20.691 16.0124C19.7954 17.0159 18.1825 17.0779 17.2051 16.1392L17.205 16.1392L17.0785 16.0177L14.6219 13.4596C14.3502 13.9467 13.9466 14.3502 13.4595 14.622L16.0176 17.0785L16.1391 17.205L16.1391 17.2051C17.0778 18.1825 17.0158 19.7954 16.0123 20.691C15.038 21.5606 13.5637 21.4004 12.783 20.3165L12.783 20.3164L12.6087 20.0745C12.4678 19.8788 12.2413 19.7628 12.0001 19.7628C11.759 19.7628 11.5325 19.8788 11.3916 20.0745L11.2173 20.3164L11.2173 20.3165C10.4366 21.4004 8.96224 21.5606 7.98797 20.691C6.98449 19.7954 6.92245 18.1825 7.86116 17.2051L7.86118 17.205L7.9827 17.0785L10.5408 14.6219C10.0537 14.3502 9.65013 13.9466 9.3784 13.4595L6.92182 16.0176L6.79531 16.1391L6.79531 16.1391C5.81785 17.0778 4.20499 17.0158 3.30932 16.0123L2.74979 16.5117L3.30932 16.0123C2.43975 15.038 2.59998 13.5637 3.6839 12.783L3.68391 12.783L3.92588 12.6087C4.12157 12.4678 4.23754 12.2413 4.23754 12.0001C4.23754 11.759 4.12157 11.5325 3.92588 11.3916L3.68392 11.2173L3.6839 11.2173C2.59998 10.4366 2.43975 8.96225 3.30932 7.98797L9.13275 11.1155L3.30933 7.98797C4.205 6.98449 5.81785 6.92246 6.7953 7.86116L6.79531 7.86118L6.92186 7.9827L9.37845 10.5408C9.65018 10.0537 10.0537 9.65014 10.5409 9.37841L7.98273 6.92182L7.86125 6.79531L7.86124 6.79531C6.92256 5.81785 6.98459 4.20499 7.98807 3.30932L7.48865 2.74979L7.98808 3.30932ZM6.98923 2.19025C5.96172 3.10737 5.54111 4.46659 5.74441 5.74432C4.46665 5.54098 3.10739 5.9616 2.19025 6.98913L2.19025 6.98914C0.869359 8.46905 0.970809 10.6367 2.3021 12.0001C0.970808 13.3636 0.869358 15.5312 2.19025 17.0111C3.10738 18.0386 4.4666 18.4593 5.74432 18.256C5.54099 19.5337 5.9616 20.893 6.98913 21.8101L7.48855 21.2506L6.98914 21.8101C8.46906 23.131 10.6367 23.0295 12.0001 21.6983C13.3636 23.0296 15.5312 23.131 17.0111 21.8101C18.0386 20.893 18.4592 19.5338 18.2559 18.256C19.5337 18.4594 20.893 18.0388 21.8101 17.0112L21.2506 16.5118L21.8101 17.0112C23.131 15.5313 23.0295 13.3637 21.6983 12.0002C23.0296 10.6368 23.131 8.46911 21.8101 6.98923C20.893 5.96172 19.5338 5.54111 18.256 5.74441C18.4594 4.46666 18.0388 3.10739 17.0112 2.19025L17.0112 2.19025C15.5313 0.86936 13.3637 0.970809 12.0002 2.3021C10.6368 0.970808 8.46911 0.869359 6.98923 2.19025Z'
        fill={color}
      />
      <path
        d='M12 15.7502C14.0711 15.7502 15.75 14.0712 15.75 12.0001C15.75 9.92906 14.0711 8.25012 12 8.25012C9.92893 8.25012 8.25 9.92906 8.25 12.0001C8.25 14.0712 9.92893 15.7502 12 15.7502Z'
        stroke={color}
        stroke-width='1.5'
      />
    </svg>
  );
};

export default FlowerIcon;
