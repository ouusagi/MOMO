import MoodIcon from '../assets/consumptionIcons/Mood.svg'
import ImpulseIcon from '../assets/consumptionIcons/Impulse.svg'
import NecessaryIcon from '../assets/consumptionIcons/Necessary.svg'
import RewardIcon from '../assets/consumptionIcons/Reward.svg'

import HappyIcon from "../assets/consumptionIcons/Happy.svg"
import SatisfiedIcon from "../assets/consumptionIcons/Satisfied.svg"
import RelaxedIcon from "../assets/consumptionIcons/Relaxed.svg"
import ExcitedIcon from "../assets/consumptionIcons/Excited.svg"
import SadIcon from "../assets/consumptionIcons/Sad.svg"
import StressedIcon from "../assets/consumptionIcons/Stressed.svg"

// 소비 유형
export const consumptionTypeIcons: Record<string, string> = {
  mood: MoodIcon,
  impulse: ImpulseIcon,
  necessary: NecessaryIcon,
  reward: RewardIcon,
}

// 소비 감정
export const consumptionEmotionIcons: Record<string, string> = {
  happy: HappyIcon,
  satisfied: SatisfiedIcon,
  relaxed: RelaxedIcon,
  excited: ExcitedIcon,
  sad: SadIcon,
  stressed: StressedIcon,
}