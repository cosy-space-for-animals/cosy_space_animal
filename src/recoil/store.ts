import { atom, AtomEffect, RecoilState, selector, useSetRecoilState } from 'recoil';
import { Animals } from '@/components/atoms/AnimalIcon';
import { Nullable } from '@/types/global';
import { TShape } from '@/components/organisms/profile/ProfileSettingStep4';

export type TPostProfileStep = {
  maxStep: number;
  step: number;
  data: {
    email: string;
    petName: string;
    petDesc: string;
    petSpecM: string;
    petSpecS: string;
    petProfileFrame: TShape;
    petGender: "M" | "F" | "O" | "";
    birthDate: string;
    deathDate: string;
    petFavs: string[];
    petProfileImage: Nullable<File>
  };
}

export const postProfileStepState: RecoilState<TPostProfileStep> = atom({
  key: 'postProfileStep',
  default: {
    maxStep: 4,
    step: 1,
    data: {
      email: '',
      petName: '',
      petDesc: '',
      petSpecM: '',
      petSpecS: '',
      petGender: '',
      birthDate: '',
      deathDate: '',
      petFavs: [],
      petProfileFrame: 'oval_vertical',
      petProfileImage: null,
    },
  },
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newVal) => {
        if (newVal.step > newVal.maxStep) {
          throw new Error('Invalid step');
        }
      });
    },
  ],
});

type FirstStepData = {
  petName: string;
  petSpecM: string
  petSpecS: string;
};

export const firstStep = selector<FirstStepData>({
  key: 'firstStep',
  get: ({ get }) => {
    const { data } = get(postProfileStepState);
    return {
      petName: data.petName,
      petSpecM: data.petSpecM,
      petSpecS: data.petSpecS,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(postProfileStepState);
    set(postProfileStepState, {
      ...currentState,
      data: {
        ...currentState.data,
        ...newValue,
      },
    });
  },
});

type SecondStepData = {
  petGender: TPostProfileStep['data']['petGender'];
  birthDate: TPostProfileStep['data']['birthDate'];
  deathDate: TPostProfileStep['data']['deathDate'];
};

export const secondStep = selector<SecondStepData>({
  key: 'secondStep',
  get: ({ get }) => {
    const { data } = get(postProfileStepState);
    return {
      petGender: data.petGender,
      birthDate: data.birthDate,
      deathDate: data.deathDate,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(postProfileStepState);
    set(postProfileStepState, {
      ...currentState,
      data: {
        ...currentState.data,
        ...newValue,
      },
    });
  },
});

type ThirdStepData = {
  petDesc: string;
  petFavs: string[];
};

export const thirdStep = selector<ThirdStepData>({
  key: 'thirdStep',
  get: ({ get }) => {
    const { data } = get(postProfileStepState);
    return {
      petDesc: data.petDesc,
      petFavs: data.petFavs,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(postProfileStepState);
    set(postProfileStepState, {
      ...currentState,
      data: {
        ...currentState.data,
        ...newValue,
      },
    });
  },
});

type FourthStepData = {
  petProfileFrame: TShape;
  petProfileImage: Nullable<File>;
};

export const fourthStep = selector<FourthStepData>({
  key: 'fourthStep',
  get: ({ get }) => {
    const { data } = get(postProfileStepState);
    return {
      petProfileFrame: data.petProfileFrame,
      petProfileImage: data.petProfileImage,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(postProfileStepState);
    set(postProfileStepState, {
      ...currentState,
      data: {
        ...currentState.data,
        ...newValue,
      },
    });
  },
});

