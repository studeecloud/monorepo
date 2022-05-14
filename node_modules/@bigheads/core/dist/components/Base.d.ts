import React from 'react';
import { colors } from '../theme';
import { FacialHairProps } from './facialHair/types';
import { HairProps } from './hair/types';
import { ClothingProps } from './clothing/types';
import { MouthProps } from './mouths/types';
import { BodyProps } from './bodies/types';
import { HatProps } from './hats/types';
import { EyeProps } from './eyes/types';
interface BaseProps {
    eyes: React.ComponentType<EyeProps>;
    eyebrows: React.ComponentType;
    mouth: React.ComponentType<MouthProps>;
    hair?: {
        Front: React.ComponentType<HairProps>;
        Back: React.ComponentType<HairProps>;
        hatScale?: number;
    };
    facialHair: React.ComponentType<FacialHairProps>;
    accessory: React.ComponentType;
    graphic: React.ComponentType;
    hat: {
        Front: React.ComponentType<ClothingProps & HatProps>;
        Back: React.ComponentType<ClothingProps & HatProps>;
    };
    body: {
        Front: React.ComponentType<BodyProps>;
        Back: React.ComponentType<BodyProps>;
    };
    clothing: {
        Front: React.ComponentType<ClothingProps>;
        Back: React.ComponentType<ClothingProps>;
        braStraps?: boolean;
    };
    clothingColor: keyof typeof colors.clothing;
    hairColor: keyof typeof colors.hair;
    circleColor: keyof typeof colors.bgColors;
    lipColor: keyof typeof colors.lipColors;
    hatColor: keyof typeof colors.clothing;
    faceMaskColor: keyof typeof colors.clothing;
    mask: boolean;
    faceMask: boolean;
    lashes: boolean;
}
export declare const Base: React.ForwardRefExoticComponent<BaseProps & React.RefAttributes<SVGSVGElement>>;
export {};
