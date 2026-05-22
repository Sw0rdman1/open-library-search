import type { AvatarGender } from "../types";

const MAX_MALE_AVATARS = 99;
const MAX_FEMALE_AVATARS = 99;
const AVATAR_URL = 'https://randomuser.me/api/portraits';


const generateAvatar = (seed: number) => {
    const gender: AvatarGender = seed % 2 === 0 ? 'women' : 'men';

    const max =
        gender === 'men'
            ? MAX_MALE_AVATARS
            : MAX_FEMALE_AVATARS;

    const id = (seed % max) + 1;

    return `${AVATAR_URL}/${gender}/${id}.jpg`;
};

export const getRandomAvatars = (
    count: number,
    seed = Date.now()
): string[] => {
    return Array.from({ length: count }, (_, index) =>
        generateAvatar(seed + index * 13)
    );
};