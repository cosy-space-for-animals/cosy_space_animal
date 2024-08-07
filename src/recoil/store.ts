import { atom, AtomEffect, RecoilState, selector } from 'recoil';
import { Nullable } from '@/types/global';
import { TFrameShape } from '@/components/organisms/profile/ProfileSettingStep4';

export type TProfileData = {
  email: string;
  petName: string;
  petDesc: string;
  petSpecM: string;
  petSpecS: string;
  petProfileFrame: TFrameShape;
  petGender: 'M' | 'F' | 'O' | '';
  birthDate: string;
  deathDate: string;
  petFavs: string[];
}

const localStorageEffect = <T>(key: string): AtomEffect<T> => ({ setSelf, onSet }) => {
  if (typeof window === 'undefined') return;

  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet(newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const defaultProfileData: TProfileData = {
  email: '',
  petName: '',
  petDesc: '',
  petSpecM: '',
  petSpecS: '',
  petProfileFrame: 'oval_vertical',
  petGender: '',
  birthDate: '',
  deathDate: '',
  petFavs: [],
};

export const profileDataAtom: RecoilState<TProfileData> = atom({
  key: 'postProfileStep',
  default: defaultProfileData,
  effects_UNSTABLE: [
    localStorageEffect('profileDataAtom'),
  ],
});

export const profileImageAtom: RecoilState<Nullable<File>> = atom({
  key: 'profileImage',
  default: null,
})

type FirstStepData = {
  petName: string;
  petSpecM: string
  petSpecS: string;
};

export const firstStep = selector<FirstStepData>({
  key: 'firstStep',
  get: ({ get }) => {
    const data = get(profileDataAtom);
    return {
      petName: data.petName,
      petSpecM: data.petSpecM,
      petSpecS: data.petSpecS,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(profileDataAtom);
    set(profileDataAtom, {
      ...currentState,
      ...newValue,
    });
  },
});

type SecondStepData = {
  petGender: TProfileData['petGender'];
  birthDate: TProfileData['birthDate'];
  deathDate: TProfileData['deathDate'];
};

export const secondStep = selector<SecondStepData>({
  key: 'secondStep',
  get: ({ get }) => {
    const data = get(profileDataAtom);
    return {
      petGender: data.petGender,
      birthDate: data.birthDate,
      deathDate: data.deathDate,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(profileDataAtom);
    set(profileDataAtom, {
      ...currentState,
      ...newValue,
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
    const data = get(profileDataAtom);
    return {
      petDesc: data.petDesc,
      petFavs: data.petFavs,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(profileDataAtom);
    set(profileDataAtom, {
      ...currentState,
      ...newValue,
    });
  },
});

type FourthStepData = {
  petProfileFrame: TFrameShape;
};

export const fourthStep = selector<FourthStepData>({
  key: 'fourthStep',
  get: ({ get }) => {
    const data = get(profileDataAtom);
    return {
      petProfileFrame: data.petProfileFrame,
    };
  },
  set: ({ set, get }, newValue) => {
    const currentState = get(profileDataAtom);
    // petProfileImage가 File이므로, set할 때는 제외하고 set
    set(profileDataAtom, {
      ...currentState,
      ...newValue,
    });
  },
});
