'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import { useDevice } from '@/context/DeviceContext';
import { useRecoilState } from 'recoil';
import { thirdStep } from '@/recoil/store';
import InputCharacterCounterItem from '@/components/atoms/input/InputCharacterCouterItem';
import ColoredTag from '@/components/organisms/ColoredTag';
import { SortableList } from '@/lib/dnd/SortableList';
import { TColor } from '@/types/theme';
import ColorPallet from '@/components/molecules/ColorPallet';
import { Nullable } from '@/types/global';

export type TItem = {
  id: string;
  code: TColor;
  label: string;
}

const ProfileSettingStep3 = () => {
  const theme = useTheme();
  const secondaryColors: TItem[] =
    Object.entries(theme.colors.secondary).map(([key, value]) => {
      return { id: key, code: value, label: '' };
    });

  const { isMobile } = useDevice();
  const [param, setParam] = useRecoilState(thirdStep);
  const [items, setItems] = useState<TItem[]>([]);
  const [availableColors, setAvailableColors] = useState<TItem[]>(secondaryColors);
  const [currentItem, setCurrentItem] = useState<TItem>({
    id: availableColors[0].id,
    code: availableColors[0].code,
    label: '',
  });
  const [isOpenColorPallet, setIsOpenColorPallet] = useState(false);
  const [palletPosition, setPalletPosition] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState<Nullable<TItem>>(null);


  const newAvailableColors =
    useMemo(() =>
      secondaryColors.filter((color: TItem) => !items.some((item) => item.id === color.id)), [items]);

  useEffect(() => {
    setAvailableColors(newAvailableColors);
    setParam({ ...param, petFavs: items.map((item) => item.label) });
  }, [items, newAvailableColors, currentItem.code]);

  useEffect(() => {
    setCurrentItem({ id: availableColors[0].id, code: availableColors[0].code, label: '' });
  }, [availableColors]);

  const getCurrentItem = (currentColor: TColor) => {
    // items에 있는 아이템 중 현재 선택된 아이템을 찾아서 반환
    const current = items.find((item) => item.code === currentColor);
    if (current) {
      return current;
    } else {
      // 전체에서 검색
      const res = secondaryColors.find((item) => item.code === currentColor);
      if (res) {
        return res;
      } else {
        return null;
      }
    }

  };

  const openPalletHandler = (target: HTMLButtonElement, currentColor: TColor) => {
    const rect = target.getBoundingClientRect();
    const position = isMobile ? { x: rect.left - 14, y: rect.bottom } : {
      x: rect.left + rect.width / 2,
      y: rect.bottom,
    };
    if (!isOpenColorPallet) {
      setPalletPosition(position);
      setActiveItem(getCurrentItem(currentColor));
      setIsOpenColorPallet(!isOpenColorPallet);
    } else {
      console.log(position, palletPosition);
      if(position.x !== palletPosition.x || position.y !== palletPosition.y) {
        setPalletPosition(position);
      } else {
        setActiveItem(null);
        setIsOpenColorPallet(!isOpenColorPallet);
      }
    }
  };

  const selectColorHandler = (color: TColor) => {
    if (items.includes(activeItem as TItem)) {
      const target = items.find((item) => item === activeItem);
      const newItem = secondaryColors.find((item) => item.code === color);
      if (newItem) {
        target!.code = newItem.code;
        target!.id = newItem.id;
      }
      setItems(prev => {
        if (target) {
          prev[prev.indexOf(target)] = target;
        }
        return [...prev];
      });
    } else {
      const newItem = getCurrentItem(color);
      if (newItem) {
        setCurrentItem(newItem);
      }
    }
  };


  return (
    <>
      <div css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 60px;
        gap: 2rem;
        @media ${theme.device.mobile} {
          padding: 0;
        }
      `}>
        <div css={css`
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        `}>
          <ThemedText type={isMobile ? 'labelMedium' : 'labelLarge'}>소개</ThemedText>
          <div css={css`
            display: flex;
            gap: 0.5rem;
          `}>
            <InputCharacterCounterItem
              value={param.petDesc}
              validate={true}
              setValue={(e: string) => setParam({ ...param, petDesc: e })}
              maxLength={90}
              placeholder="소개글을 입력해주세요"
            />
          </div>
        </div>
        <div css={css`
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        `}>
          <div>
            <ThemedText type={isMobile ? 'labelLarge' : 'labelLarge'}>좋아하는 것 </ThemedText>
            <ThemedText type={isMobile ? 'labelLarge' : 'labelLarge'} css={css`color: ${theme.colors.grey[500]}`}>(최대
              3개)</ThemedText>
          </div>

          {items.length > 0 && (
            <SortableList
              id="sortable-list"
              items={items}
              onChange={setItems}
              renderItem={(item) => (
                <SortableList.Item id={item.id}>
                  <SortableList.DragHandle />
                  <>
                    <ColoredTag
                      id={item.id}
                      color={theme.colors.secondary[item.id]}
                      label={item.label}
                      mode={'view'}
                      removeHandler={(id) => {
                        setItems((items) => items.filter((item) => item.id !== id));
                      }}
                      setOpen={openPalletHandler}
                    />
                  </>
                </SortableList.Item>
              )}
            />
          )}

          {items.length < 3 && (
            <ColoredTag
              id={currentItem.id}
              mode={'edit'}
              color={theme.colors.secondary[currentItem.id]}
              setOpen={openPalletHandler}
              label={items.find((item) => item.id === currentItem.id)?.label || ''}
              onBlur={(item) => {
                if (item.label === '') return;
                setItems((items) => [...items, item]);
                if (isOpenColorPallet) setIsOpenColorPallet(!isOpenColorPallet);
              }}
            />
          )}

          <div css={css`
            display: flex;
            flex-direction: column;
            word-break: keep-all;
            padding: 0.5rem 0.75rem;
            background: ${theme.colors.grey[100]};
          `}>
            <ThemedText type={'captionLarge'} cssStyle={css`color: ${theme.colors.grey[600]}`}>이런 걸 좋아하나요?</ThemedText>
            <ThemedText type={'captionLarge'} cssStyle={css`color: ${theme.colors.grey[400]}`}>
              운동화끈_씹어먹기, 고구마말랭이, 낮잠자기, 꽃냄새_맡기, 성대모사장인,
              목욕하기, 무한산책, 손바닥_위에서_꿀잠, 가만히_햇살_맞기
            </ThemedText>
          </div>
        </div>
      </div>

      {
        isOpenColorPallet && (
          <ColorPallet
            position={palletPosition}
            colors={secondaryColors.map((color) => color.code)}
            currentColor={activeItem?.code}
            onSelect={selectColorHandler}
            availableColors={availableColors.map((color) => color.code)}
          />
        )
      }
    </>
  );
};

export default ProfileSettingStep3;
